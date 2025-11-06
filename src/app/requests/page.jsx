"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { GrLocation } from "react-icons/gr";
import { get, post } from "@/lib/api";

function Requests() {
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [subCategoryOpen, setSubCategoryOpen] = useState(false);
  const [selectPriceOpen, setSelectPriceOpen] = useState(false);
  const [categoryName, setCategoryName] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState([]);

  const categoryOpenBtn = () => {
    setCategoryOpen((p) => !p);
  };

  const subCategoryOpenBtn = () => {
    setSubCategoryOpen((p) => !p);
  };

  const selectPriceOpenBtn = () => {
    setSelectPriceOpen((p) => !p);
  };

  const [posts, setPosts] = useState({
    title: "",
    description: "",
    desired_price: "",
    currency_id: Number(""),
    category_id: Number(""),
    subcategory_id: Number(""),
    location: "",
    phone: "",
    // images_upload: null,
  });

  // categoriyaga tegishli qismining codlar

  const [selectCategoriyaId, setSelectCategoriyaId] = useState("");
  const [selectSubCategoriyaId, setSelectSubCategoriyaId] = useState("");
  const [selectMoneyId, setSelectMoneyId] = useState("");

  const getCategoryName = async () => {
    const data = await get("categories/");
    setCategoryName(data);
    setSubCategoryName(data);
  };

  const selectCategoriyaIdBtn = (id) => {
    setSelectCategoriyaId(id);
    setCategoryOpen((p) => !p);
  };

  const selectSubCategoriyaIdBtn = (id) => {
    setSelectSubCategoriyaId(id);
    setSubCategoryOpen((p) => !p);
  };

  const selectMoneyIdBtn = (id) => {
    setSelectMoneyId(id);
    setSelectPriceOpen((p) => !p);
  };

  useEffect(() => {
    getCategoryName();
  }, []);
  // categoriyaga tegishli qismining codlar

  const changeRequest = (e) => {
    setPosts({ ...posts, [e.target.name]: e.target.value });
  };

  const postRequestBtn = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", posts.title);
      formData.append("description", posts.description);
      formData.append("desired_price", posts.desired_price);
      formData.append("currency_id", selectMoneyId);
      formData.append("category_id", selectCategoriyaId);
      formData.append("subcategory_id", selectSubCategoriyaId);
      formData.append("location", posts.location);
      formData.append("phone", posts.phone);

      if (posts.images_upload && posts.images_upload.length > 0) {
        for (let i = 0; i < posts.images_upload.length; i++) {
          formData.append("images_upload", posts.images_upload[i]);
        }
      }

      const postRequests = await post("buy-requests/", formData);
      console.log(
        postRequests,
        "Malumotlar qo'shildimi Kamoliddin qarachi ??????"
      );
    } catch (error) {
      console.log(error, "XATO MINADA QARA?");
    }
  };

  return (
    <div className="border-[2px] border-border-color w-full rounded-[18px] p-5 bg-white">
      <h1 className="text-[20px]">Post Ad-Buy Request</h1>

      <p className="text-border-color">
        Create a buyer request.Blue actions indecate publishing.
      </p>

      <form onSubmit={postRequestBtn} className="flex flex-col gap-5 my-3">
        <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
          <span className="text-border-color">Title</span>

          <input
            onChange={changeRequest}
            name="title"
            className="h-[42px] border-border-color border-[2px] rounded-[12px] w-full outline-none px-3 mt-2"
            placeholder="Looking for 5 computers, office use"
          />
        </div>

        <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
          <span className="text-border-color">Category</span>

          <div className="relative">
            <button
              onClick={categoryOpenBtn}
              type="button"
              className="w-full h-[42px] border-[2px] rounded-[12px] mt-2 border-border-color flex justify-start items-center px-2 gap-1"
            >
              <span>Electronics</span>
              <IoIosArrowForward className="mt-1 text-[15px]" />
              <span>Computers</span>
              <IoIosArrowDown
                className={`mt-1 text-[18px] ${
                  categoryOpen ? "-rotate-180" : ""
                } duration-300 ease-in-out`}
              />
            </button>

            <ul
              className={`${
                categoryOpen ? "block" : "hidden"
              } animate-fadeInUpSmoll absolute w-[250px] flex-col bg-body-color rounded-[12px] overflow-hidden`}
            >
              {categoryName &&
                categoryName?.map((item) => {
                  return (
                    <li
                      onClick={() => selectCategoriyaIdBtn(item.id)}
                      key={item?.id}
                      className="h-[42px] hover:bg-white p-3 cursor-pointer flex items-center gap-3"
                    >
                      <span>{item?.name}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
          <span className="text-border-color">Sub Category</span>

          <div className="relative">
            <button
              onClick={subCategoryOpenBtn}
              type="button"
              className="w-full h-[42px] border-[2px] rounded-[12px] mt-2 border-border-color flex justify-start items-center px-2 gap-1"
            >
              <span>Sub electronics</span>
              <IoIosArrowForward className="mt-1 text-[15px]" />
              <span>Sub Computers</span>
              <IoIosArrowDown
                className={`mt-1 text-[18px] ${
                  subCategoryOpen ? "-rotate-180" : ""
                } duration-300 ease-in-out`}
              />
            </button>

            <ul
              className={`${
                subCategoryOpen ? "block" : "hidden"
              } animate-fadeInUpSmoll absolute w-[250px] flex-col bg-body-color rounded-[12px] overflow-hidden`}
            >
              {subCategoryName &&
                subCategoryName?.map((item) => {
                  return (
                    <li
                      onClick={() => selectSubCategoriyaIdBtn(item.id)}
                      key={item?.id}
                      className="h-[42px] hover:bg-white p-3 cursor-pointer flex items-center gap-3"
                    >
                      <span>{item?.name}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
          <span className="text-border-color">Budget</span>

          <div className="flex justify-between items-center gap-4 mt-2">
            <input
              onChange={changeRequest}
              name="desired_price"
              className="h-[42px] border-border-color border-[2px] rounded-[12px] w-full outline-none px-3"
              placeholder="Narxini kiriting!!!"
            />

            <div className="relative w-[180px]">
              <button
                onClick={selectPriceOpenBtn}
                type="button"
                className="w-full gap-[6px] flex justify-start items-center px-2 h-[42px] border-border-color border-[2px] rounded-[12px]"
              >
                <span>So'm</span>
                <IoIosArrowDown
                  className={`mt-1 text-[18px] ${
                    selectPriceOpen ? "-rotate-180" : ""
                  } duration-300 ease-in-out`}
                />
              </button>

              <ul
                className={`${
                  selectPriceOpen ? "block" : "hidden"
                } animate-fadeInUpSmoll absolute w-full flex-col bg-body-color rounded-[12px]`}
              >
                <li
                  onClick={() => selectMoneyIdBtn(1)}
                  className="h-[42px] hover:bg-white p-3 cursor-pointer flex items-center gap-3"
                >
                  <span>🇺🇿</span>
                  <span>(So'm)</span>
                </li>

                <li
                  onClick={() => selectMoneyIdBtn(2)}
                  className="h-[42px] hover:bg-white p-3 cursor-pointer flex items-center gap-3"
                >
                  <span>🇺🇸</span>
                  <span>($)</span>
                </li>

                <li
                  onClick={() => selectMoneyIdBtn(3)}
                  className="h-[42px] hover:bg-white p-3 cursor-pointer flex items-center gap-3"
                >
                  <span>🇪🇺</span>
                  <span>(€)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
          <span className="text-border-color">Description</span>
          <textarea
            onChange={changeRequest}
            name="description"
            id=""
            placeholder="Description ..."
            className="w-full resize-none min-h-[160px] border-border-color border-[2px] rounded-[12px] mt-2 px-3 py-2 flex items-center outline-none"
          ></textarea>
        </div>

        <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
          <span className="text-border-color">Attachments (optional)</span>
          <div className="bg-body-color w-full h-[160px] border-border-color border-[2px] rounded-[12px] mt-2">
            <label
              htmlFor="images"
              className="w-full h-full flex items-center justify-center gap-2 cursor-pointer"
            >
              <MdOutlineFileUpload className="text-[22px]" />
              <span>Drag & drop files hero or click to upload</span>
            </label>
            <input
              onChange={changeRequest}
              name="images_upload"
              id="images"
              type="file"
              multiple
              className="hidden"
            />
          </div>

          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="h-[120px] bg-[#F3F4F6] rounded-[12px] border-border-color border-[2px] w-full"></div>
            <div className="h-[120px] bg-[#F3F4F6] rounded-[12px] border-border-color border-[2px] w-full"></div>
            <div className="h-[120px] bg-[#F3F4F6] rounded-[12px] border-border-color border-[2px] w-full"></div>
            <div className="h-[120px] bg-[#F3F4F6] rounded-[12px] border-border-color border-[2px] w-full"></div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
            <span className="text-border-color">Loacation</span>
            <div className="w-full h-[42px] border-border-color border-[2px] rounded-[12px] mt-2 overflow-hidden flex justify-between items-center">
              <label
                htmlFor="location"
                className="h-full w-[45px] flex items-center justify-center"
              >
                <GrLocation />
              </label>

              <input
                onChange={changeRequest}
                name="location"
                id="location"
                type="text"
                autoComplete="off"
                placeholder="Samarqand,Uzbekiston"
                className="h-full w-full outline-none"
              />
            </div>
          </div>

          <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
            <span className="text-border-color">Contact info</span>
            <div className="w-full h-[42px] border-border-color border-[2px] rounded-[12px] mt-2 overflow-hidden flex justify-between items-center">
              <label
                htmlFor="phone"
                className="h-full w-[45px] flex items-center justify-center"
              >
                <LuPhoneCall />
              </label>

              <input
                onChange={changeRequest}
                name="phone"
                id="phone"
                type="text"
                autoComplete="off"
                placeholder="+998 90-123-45-67"
                className="h-full w-full outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end w-full">
          <button
            type="submit"
            className="bg-[#2563EA] text-white h-[42px] rounded-[12px] w-[200px]"
          >
            Post Request
          </button>
        </div>
      </form>
    </div>
  );
}

export default Requests;
