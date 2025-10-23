"use client";

import { FiUploadCloud } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addProductsModal } from "@/store/slice/slice";
import { useEffect, useState } from "react";
import { get, post } from "@/lib/api";

function AddProductsModal() {
  const [categoryName, setCategoryName] = useState([]);
  const [categoriyaSelect, setCategoriyaSelect] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [categoriyModal, setCategoriyModal] = useState(false);
  const dispatch = useDispatch();

  const [category, setCategory] = useState({
    category_id: "",
    title: "",
    description: "",
    price: "",
    image: "",
    location: "",
    is_active: "",
    image: "",
    icon: "",
    emoji: "",
  });

  const [requiredInputValue, setRequiredInputValue] = useState({
    selectCategoriya: false,
    selectName: false,
    selectDescription: false,
    selectPrice: false,
    selectLocation: false,
  });

  const getCategoryName = async () => {
    const data = await get("categories/");
    setCategoryName(data);
  };

  const backButton = () => {
    dispatch(addProductsModal());
  };

  const categoryModalFunction = (select) => {
    setCategoryId(select);
    setCategoriyaSelect(true);
    setCategoriyModal((p) => !p);
  };

  // const productValue = (e) => {
  //   if (e.target.name === "image") {
  //     setCategory({ ...category, image: e.target.files[0] });
  //   } else {
  //     setCategory({ ...category, [e.target.name]: e.target.value });
  //   }
  // };

  const productValue = (e) => {
    if (e.target.type === "checkbox") {
      setIsActive(e.target.checked);
      setCategory({ ...category, [e.target.name]: e.target.checked });
    } else if (e.target.name === "image") {
      setCategory({ ...category, image: e.target.files[0] });
    } else {
      setCategory({ ...category, [e.target.name]: e.target.value });
    }
  };

  const handleAddCategoriya = async (e) => {
    e.preventDefault();

    if (categoryId == null) {
      setRequiredInputValue((prev) => ({ ...prev, selectCategoriya: true }));
      return;
    } else {
      setRequiredInputValue((prev) => ({ ...prev, selectCategoriya: false }));
    }

    if (category.title.trim() === "") {
      setRequiredInputValue((prev) => ({ ...prev, selectName: true }));
      return;
    } else {
      setRequiredInputValue((prev) => ({ ...prev, selectName: false }));
    }
    // gggggggggg
    if (category.description.trim() === "") {
      setRequiredInputValue((prev) => ({ ...prev, selectDescription: true }));
      return;
    } else {
      setRequiredInputValue((prev) => ({ ...prev, selectDescription: false }));
    }

    if (category.price.trim() === "") {
      setRequiredInputValue((prev) => ({ ...prev, selectPrice: true }));
      return;
    } else {
      setRequiredInputValue((prev) => ({ ...prev, selectPrice: false }));
    }

    if (category.location.trim() === "") {
      setRequiredInputValue((prev) => ({ ...prev, selectLocation: true }));
      return;
    } else {
      setRequiredInputValue((prev) => ({ ...prev, selectLocation: false }));
    }

    try {
      const formData = new FormData();
      formData.append("category_id", categoryId.id);
      formData.append("title", category.title);
      formData.append("description", category.description);
      formData.append("price", category.price);
      formData.append("location", category.location);
      formData.append("is_active", category.is_active);

      if (category.image) {
        formData.append("image", category.image);
      }

      const productPost = await post("products/", formData);

      if (productPost) {
        alert("Ma'lumotlaringiz qo'shildi");

        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("products-updated"));
        }

        dispatch(addProductsModal());
        // router.refresh();
      }
    } catch (error) {
      console.log(error);
    }

    console.log(categoryId);
  };

  useEffect(() => {
    getCategoryName();
  }, []);

  return (
    <div className="fixed flex bg-sidebar-color inset-0 justify-center items-center z-50">
      <div className="animate-fadeInDown relative w-3/5 mx-auto rounded-xl p-6 bg-white">
        <h2 className="font-normal text-[28px] mb-4 text-border-color">
          Maxsulotlar qo'shish
        </h2>

        <div className="mb-[14px]">
          <button
            onClick={() => setCategoriyModal((p) => !p)}
            className="h-[48px] text-border-color outline-none rounded-[12px] border-[1px] border-bg-color bg-transparent px-3 duration-300 ease-in hover:bg-bg-color"
          >
            {categoriyaSelect
              ? categoryId?.name.charAt(0).toUpperCase() +
                categoryId?.name.slice(1)
              : "Categoriya tanlash"}
          </button>

          <small className="text-red-500 block">
            {requiredInputValue.selectCategoriya &&
              "Categoriya tanlashingiz majburiy!"}
          </small>
        </div>

        {/* Categoriya modal */}
        {categoriyModal ? (
          <div className="absolute grid place-items-center bg-[#404040cd] rounded-xl w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="animate-fadeScale w-1/2 min-h-[200px]  bg-white border-none p-5 rounded-[12px] flex gap-3 items-start flex-wrap">
              {categoryName
                ?.slice()
                .reverse()
                .map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => categoryModalFunction(item)}
                    className="rounded-[12px] capitalize px-5 py-1 border-[2px] bg-transparent hover:bg-bg-color duration-300 ease-in"
                  >
                    {item?.name}
                  </button>
                ))}
            </div>
          </div>
        ) : (
          ""
        )}
        <form onSubmit={handleAddCategoriya} className="flex flex-col gap-3.5">
          <div>
            <input
              onChange={productValue}
              name="title"
              autoComplete="off"
              type="text"
              placeholder="Nomi ..."
              className="w-full h-[48px] outline-none rounded-[12px] border-[1px] border-bg-color bg-transparent px-3"
              // required
            />

            <small className="text-red-500">
              {requiredInputValue.selectName &&
                "Maxsulot nomini kiritishingiz majburiy!"}
            </small>
          </div>

          <div>
            <textarea
              onChange={productValue}
              name="description"
              rows={5}
              placeholder="Description ..."
              className="w-full outline-none resize-none rounded-[12px] border-[1px] border-bg-color bg-transparent p-3"
              // required
            ></textarea>
            <small className="text-red-500">
              {requiredInputValue.selectDescription &&
                "Description nomini kiritishingiz majburiy!"}
            </small>
          </div>

          <div className="flex items-center justify-between gap-5">
            <div className="w-full">
              <input
                onChange={productValue}
                name="price"
                className="w-full h-[48px] outline-none rounded-[12px] border-[1px] border-bg-color bg-transparent px-3"
                autoComplete="off"
                type="text"
                placeholder="Narxi ..."
              />
              <small className="text-red-500">
                {requiredInputValue.selectPrice &&
                  "Narxini kiritishingiz majburiy!"}
              </small>
            </div>

            <div className="w-full">
              <input
                onChange={productValue}
                name="location"
                className="w-full h-[48px] outline-none rounded-[12px] border-[1px] border-bg-color bg-transparent px-3"
                autoComplete="off"
                type="text"
                placeholder="Manzili ..."
                multiple
              />

              <small className="text-red-500">
                {requiredInputValue.selectLocation &&
                  "Manzilingizni kiritishingiz majburiy!"}
              </small>
            </div>
          </div>

          {/* <div className="">
            <label
              htmlFor="active"
              className="border-[1.5px] w-[26px] h-[26px] cursor-pointer flex justify-center items-center rounded-[8px] bg-transparent border-bg-color"
            >
              {isActive ? (
                <FaCheck className="text-blue-700 text-[12px]" />
              ) : (
                ""
              )}
            </label>

            <input
              type="checkbox"
              name="is_active"
              id="active"
              onChange={productValue}
              className="hidden"
            />
          </div> */}

          <div>
            <input
              onChange={productValue}
              name="image"
              type="file"
              id="file"
              className="hidden"
            />
            <label
              htmlFor="file"
              className="flex items-center gap-3 w-[160px] h-[80px] text-[14px] justify-center
               rounded-[16px] border-[1px] border-dotted border-bg-color duration-300 ease-in
               cursor-pointer text-gray-500"
            >
              <FiUploadCloud className="text-[24px] text-border-color" />
              Rasim yuklash
            </label>
          </div>

          <div className="ml-auto flex items-center gap-5">
            <button
              className="h-[48px] cursor-pointer text-white duration-300 ease-in rounded-[12px] border-[1px] border-bg-color px-5 bg-btn-color"
              type="submit"
            >
              Qo'shish
            </button>
            <button
              className="h-[48px] cursor-pointer text-white duration-300 ease-in rounded-[12px] border-[1px] border-bg-color px-5 bg-btn-color"
              type="button"
              onClick={backButton}
            >
              Qaytish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductsModal;
