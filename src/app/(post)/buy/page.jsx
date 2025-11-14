"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { get, post } from "@/lib/api";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Xaridor so'rovini yaratish komponenti
function BuyPost() {
  // DROPDOWN HOLATLARI: Kategoriya va valyuta dropdownlarini boshqarish
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [subCategoryOpen, setSubCategoryOpen] = useState(false);
  const [selectPriceOpen, setSelectPriceOpen] = useState(false);

  // MA'LUMOTLAR STATE LARI: Kategoriya va subkategoriyalar ro'yxati
  const [categoryName, setCategoryName] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); // Yuklangan fayllar
  const router = useRouter(); // Navigatsiya uchun router

  // DROPDOWN TOGGLE FUNCTIONS: Har bir dropdownni ochish/yopish
  const categoryOpenBtn = () => {
    setCategoryOpen((p) => !p);
  };

  const subCategoryOpenBtn = () => {
    setSubCategoryOpen((p) => !p);
  };

  const selectPriceOpenBtn = () => {
    setSelectPriceOpen((p) => !p);
  };

  // FORM MA'LUMOTLARI: So'rov uchun barcha maydonlar
  const [posts, setPosts] = useState({
    title: "",
    description: "",
    desired_price: "",
    currency_id: "",
    category_id: "",
    subcategory_id: "",
    location: "",
    phone: "",
  });

  // KATEGORIYALARNI OLISH: Serverdan kategoriyalar ro'yxatini olish
  const getCategoryName = async () => {
    const data = await get("categories/");
    setCategoryName(data);
    setSubCategoryName(data);
  };

  // KATEGORIYA TANLASH: Asosiy kategoriyani tanlash va dropdownni yopish
  const selectCategoriyaIdBtn = (id) => {
    setPosts({ ...posts, category_id: id });
    setCategoryOpen(false);
  };

  // SUBKATEGORIYA TANLASH: Subkategoriyani tanlash va dropdownni yopish
  const selectSubCategoriyaIdBtn = (id) => {
    setPosts({ ...posts, subcategory_id: id });
    setSubCategoryOpen(false);
  };

  // VALYUTA TANLASH: Pul birligini tanlash (Sum, $, €)
  const selectMoneyIdBtn = (id) => {
    setPosts({ ...posts, currency_id: id });
    setSelectPriceOpen(false);
  };

  // COMPONENT YUKLANGANDA: Kategoriyalarni yuklash
  useEffect(() => {
    getCategoryName();
  }, []);

  // INPUT O'ZGARISHLARI: Form maydonlaridagi o'zgarishlarni kuzatish
  const changeRequest = (e) => {
    setPosts({ ...posts, [e.target.name]: e.target.value });
  };

  // FAYL YUKLASH: Rasm va boshqa fayllarni yuklash
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(Array.from(files));
    }
  };

  // SO'ROVNI YUBORISH: Formani serverga yuborish
  const postRequestBtn = async (e) => {
    e.preventDefault(); // Formaning default submitini to'xtatish

    try {
      const formData = new FormData(); // FormData yaratish

      // Barcha maydonlarni FormData ga qo'shish
      formData.append("title", posts.title);
      formData.append("description", posts.description);
      formData.append("desired_price", posts.desired_price);
      formData.append("currency_id", posts.currency_id);
      formData.append("category_id", posts.category_id.id);
      formData.append("subcategory_id", posts.subcategory_id.id || "");
      formData.append("location", posts.location);
      formData.append("phone", posts.phone);

      // API so'rovini yuborish
      const postRequests = await post("buy-requests/", formData);

      // AGAR SO'ROV MUVAFFAQIYATLI BO'LSA: Xabar ko'rsatish va sahifani o'zgartirish
      if (postRequests) {
        toast.success(
          "Ma'lumotlaringiz qo'shildi. Admin tasdiqlagach ko'rinadi!!!",
          {
            onClose: () => {
              router.push("/"); // Xabar yopilganda asosiy sahifaga o'tish
            },
          }
        );
      }
    } catch (error) {
      console.log(error, "XATO MINADA QARA?"); // Xatoliklarni konsolga chiqarish
    }
  };

  return (
    <>
      {/* ASOSIY FORM KONTEYNERI */}
      <div className="animate-fadeInDown border-[2px] border-border-color w-full rounded-[18px] p-5 bg-white">
        <h1 className="text-[20px]">Post Ad-Buy Request</h1>

        <p className="text-border-color">
          Create a buyer request.Blue actions indecate publishing.
        </p>

        {/* SO'ROV FORMASI */}
        <form onSubmit={postRequestBtn} className="flex flex-col gap-5 my-3">
          {/* SARLAVHA MAYDONI */}
          <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
            <span className="text-border-color">Title</span>
            <input
              onChange={changeRequest}
              name="title"
              value={posts.title}
              className="h-[42px] border-border-color border-[2px] rounded-[12px] w-full outline-none px-3 mt-2"
              placeholder="Looking for 5 computers, office use"
            />
          </div>

          {/* ASOSIY KATEGORIYA DROPDOWN */}
          <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
            <span className="text-border-color">Category *</span>
            <div className="relative">
              <button
                onClick={categoryOpenBtn}
                type="button"
                className="w-full h-[42px] border-[2px] rounded-[12px] mt-2 border-border-color flex justify-between items-center px-4"
              >
                <span>
                  {posts.category_id
                    ? `${posts.category_id.name}`
                    : "Select Category"}
                </span>
                <IoIosArrowDown
                  className={`text-[18px] ${
                    categoryOpen ? "-rotate-180" : ""
                  } duration-300 ease-in-out`}
                />
              </button>

              {/* KATEGORIYALAR RO'YXATI */}
              <ul
                className={`${
                  categoryOpen ? "block" : "hidden"
                } animate-fadeInUpSmoll absolute w-full mt-2 bg-white border border-gray-300 rounded-[12px] overflow-hidden z-10 max-h-60 overflow-y-auto`}
              >
                {categoryName &&
                  categoryName.map((item) => (
                    <li
                      onClick={() => selectCategoriyaIdBtn(item)}
                      key={item.id}
                      className="h-[42px] hover:bg-blue-50 p-3 cursor-pointer flex items-center gap-3 border-b border-gray-100"
                    >
                      <span>{item.name}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* SUBKATEGORIYA DROPDOWN */}
          <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
            <span className="text-border-color">Sub Category</span>
            <div className="relative">
              <button
                onClick={subCategoryOpenBtn}
                type="button"
                className="w-full h-[42px] border-[2px] rounded-[12px] mt-2 border-border-color flex justify-between items-center px-4"
              >
                <span>
                  {posts.subcategory_id
                    ? `${posts.subcategory_id.name}`
                    : "Select Subcategory"}
                </span>
                <IoIosArrowDown
                  className={`text-[18px] ${
                    subCategoryOpen ? "-rotate-180" : ""
                  } duration-300 ease-in-out`}
                />
              </button>

              {/* SUBKATEGORIYALAR RO'YXATI */}
              <ul
                className={`${
                  subCategoryOpen ? "block" : "hidden"
                } animate-fadeInUpSmoll mt-2 absolute w-full bg-white border border-gray-300 rounded-[12px] overflow-hidden z-10 max-h-60 overflow-y-auto`}
              >
                {subCategoryName &&
                  subCategoryName.map((item) => (
                    <li
                      onClick={() => selectSubCategoriyaIdBtn(item)}
                      key={item.id}
                      className="h-[42px] hover:bg-blue-50 p-3 cursor-pointer flex items-center gap-3 border-b border-gray-100"
                    >
                      <span>{item.name}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* BYUDJET VA VALYUTA MAYDONI */}
          <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
            <span className="text-border-color">Budget *</span>
            <div className="flex justify-between items-center gap-4 mt-2 sm:flex-col">
              {/* BYUDJET SUMMASI */}
              <input
                onChange={changeRequest}
                name="desired_price"
                value={posts.desired_price}
                className="h-[42px] border-border-color border-[2px] rounded-[12px] w-full outline-none px-3"
                placeholder="Narxini kiriting!!!"
              />

              {/* VALYUTA DROPDOWN */}
              <div className="relative w-[180px] sm:w-full">
                <button
                  onClick={selectPriceOpenBtn}
                  type="button"
                  className="w-full gap-[6px] flex justify-between items-center px-4 h-[42px] border-border-color border-[2px] rounded-[12px]"
                >
                  <span>
                    {posts?.currency_id == 1
                      ? "Sum"
                      : posts?.currency_id == 2
                      ? "$"
                      : posts?.currency_id == 3
                      ? "€"
                      : " Pull turi"}
                  </span>
                  <IoIosArrowDown
                    className={`text-[18px] ${
                      selectPriceOpen ? "-rotate-180" : ""
                    } duration-300 ease-in-out`}
                  />
                </button>

                {/* VALYUTALAR RO'YXATI */}
                <ul
                  className={`${
                    selectPriceOpen ? "block" : "hidden"
                  } animate-fadeInUpSmoll absolute w-full mt-2 bg-white border border-gray-300 rounded-[12px] overflow-hidden z-10`}
                >
                  <li
                    onClick={() => selectMoneyIdBtn(1)}
                    className={`${
                      posts?.currency_id == 1 ||
                      (posts?.currency_id == "" && "bg-blue-50")
                    } h-[42px] hover:bg-blue-50 p-3 cursor-pointer flex items-center gap-3`}
                  >
                    <span>🇺🇿</span>
                    <span>(Sum)</span>
                  </li>

                  <li
                    onClick={() => selectMoneyIdBtn(2)}
                    className={`${
                      posts?.currency_id == 2 && "bg-blue-50"
                    } h-[42px] hover:bg-blue-50 p-3 cursor-pointer flex items-center gap-3`}
                  >
                    <span>🇺🇸</span>
                    <span>($)</span>
                  </li>

                  <li
                    onClick={() => selectMoneyIdBtn(3)}
                    className={`${
                      posts?.currency_id == 3 && "bg-blue-50"
                    } h-[42px] hover:bg-blue-50 p-3 cursor-pointer flex items-center gap-3`}
                  >
                    <span>🇪🇺</span>
                    <span>(€)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* TAVSIF MAYDONI */}
          <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
            <span className="text-border-color">Description</span>
            <textarea
              onChange={changeRequest}
              name="description"
              value={posts.description}
              placeholder="Description ..."
              className="w-full resize-none min-h-[160px] border-border-color border-[2px] rounded-[12px] mt-2 px-3 py-2 flex items-center outline-none"
            ></textarea>
          </div>

          {/* FAYL YUKLASH MAYDONI */}
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
                onChange={handleFileChange}
                name="images_upload"
                id="images"
                type="file"
                multiple
                className="hidden"
              />
            </div>

            {/* TANLANGAN FAYLLARNI KO'RSATISH */}
            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Tanlangan rasimlar: {selectedFiles.length} ta
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded text-sm"
                    >
                      <a
                        href={URL.createObjectURL(file)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* JOYLASHUV VA KONTAKT MAYDONLARI */}
          <div className="flex items-center justify-between gap-4 lg:flex-col">
            {/* JOYLASHUV MAYDONI */}
            <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
              <span className="text-border-color">Location</span>
              <input
                onChange={changeRequest}
                name="location"
                value={posts.location}
                type="text"
                placeholder="Samarqand, Uzbekistan"
                className="h-[42px] border-border-color border-[2px] rounded-[12px] w-full outline-none px-3 mt-2"
              />
            </div>

            {/* TELEFON RAQAM MAYDONI */}
            <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
              <span className="text-border-color">Contact info</span>
              <input
                onChange={changeRequest}
                name="phone"
                value={posts.phone}
                type="text"
                placeholder="+998 90-123-45-67"
                className="h-[42px] border-border-color border-[2px] rounded-[12px] w-full outline-none px-3 mt-2"
              />
            </div>
          </div>

          {/* YUBORISH TUGMASI */}
          <div className="flex justify-end w-full">
            <button
              type="submit"
              className="bg-[#2563EA] text-white h-[42px] rounded-[12px] w-[200px] hover:bg-blue-700"
            >
              Post Request
            </button>
          </div>
        </form>
      </div>

      {/* TOAST NOTIFICATION KONTEYNERI */}
      <ToastContainer autoClose={1200} />
    </>
  );
}

export default BuyPost;
