"use client";

import { FiUploadCloud } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addProductsModal } from "@/store/slice/slice";
import { useEffect, useState } from "react";
import { get, post } from "@/lib/api";
import { IoIosArrowDown } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProductsModal() {
  const [categoryName, setCategoryName] = useState([]);
  const [categoriyaSelect, setCategoriyaSelect] = useState(false);
  const [categoriyaSubSelect, setCategoriyaSubSelect] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categorySubId, setCategorySubId] = useState(null);
  const [categoriyModal, setCategoriyModal] = useState(false);
  const [subCategoriyModal, setSubCategoriyModal] = useState(false);
  const dispatch = useDispatch();

  const [category, setCategory] = useState({
    category_id: "",
    subcategory_id: "",
    title: "",
    description: "",
    price: "",
    images_upload: [],
    location: "",
  });
  const [condition, setCondition] = useState("new");

  const [imagePreviews, setImagePreviews] = useState([]);

  const [requiredInputValue, setRequiredInputValue] = useState({
    selectCategoriya: false,
    selectSubCategoriya: false,
    selectName: false,
    selectCondition: false,
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

  const categorySubModalFunction = (select) => {
    setCategorySubId(select);
    setCategoriyaSubSelect(true);
    setSubCategoriyModal((p) => !p);
  };

  const removeImage = (index) => {
    // Preview ni tozalash
    URL.revokeObjectURL(imagePreviews[index]);

    // Yangi array yaratish
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);

    // Fayllarni yangilash
    const newFiles = Array.from(category.images_upload).filter(
      (_, i) => i !== index
    );
    setCategory({ ...category, images_upload: newFiles });
  };

  const productValue = (e) => {
    // if (e.target.name === "images_upload") {
    //   setCategory({ ...category, images_upload: e.target.files });
    // } else {
    //   setCategory({ ...category, [e.target.name]: e.target.value });
    // }

    if (e.target.name === "images_upload") {
      const files = Array.from(e.target.files);

      // Eski previewlarni tozalash
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));

      // Yangi fayllarni qo'shish
      const newFiles = [...category.images_upload, ...files];
      setCategory({ ...category, images_upload: newFiles });

      // Yangi previewlar yaratish
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
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

    if (categorySubId == null) {
      setRequiredInputValue((prev) => ({ ...prev, selectSubCategoriya: true }));
      return;
    } else {
      setRequiredInputValue((prev) => ({
        ...prev,
        selectSubCategoriya: false,
      }));
    }

    if (category.title.trim() === "") {
      setRequiredInputValue((prev) => ({ ...prev, selectName: true }));
      return;
    } else {
      setRequiredInputValue((prev) => ({ ...prev, selectName: false }));
    }

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
      formData.append("subcategory_id", categorySubId.id);
      formData.append("title", category.title);
      formData.append("description", category.description);
      formData.append("price", Number(category.price));
      formData.append("location", category.location);
      formData.append("condition", condition);

      if (category.images_upload && category.images_upload.length > 0) {
        for (let i = 0; i < category.images_upload.length; i++) {
          formData.append("images_upload", category.images_upload[i]);
        }
      }

      const productPost = await post("products/", formData);

      if (productPost) {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("products-updated"));
        }

        toast.success(
          "Ma'lumotlaringiz qo'shildi. Admin tasdiqlagach ko'rinadi!!!",
          {
            onClose: () => {
              dispatch(addProductsModal());
            },
          }
        );
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // Memory tozalash
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, []);

  useEffect(() => {
    getCategoryName();
  }, []);

  console.log(category, "NIMA gap");

  return (
    <>
      <div className="fixed flex bg-sidebar-color inset-0 justify-center items-center z-50">
        <div className="animate-fadeInDown relative w-3/5 mx-auto rounded-xl p-6 bg-white">
          <h2 className="font-normal text-[28px] mb-4 text-border-color">
            Maxsulotlar qo'shish
          </h2>

          <div className="flex items-center gap-4">
            <div className="mb-[14px]">
              <button
                onClick={() => setCategoriyModal((p) => !p)}
                className="h-[42px] min-w-[200px] text-border-color outline-none rounded-[12px] border-[1px] border-bg-color bg-transparent duration-300 ease-in hover:bg-bg-color"
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

            <div className="mb-[14px]">
              <button
                onClick={() => setSubCategoriyModal((p) => !p)}
                className="h-[42px] min-w-[200px] text-border-color outline-none rounded-[12px] border-[1px] border-bg-color bg-transparent duration-300 ease-in hover:bg-bg-color"
              >
                {categoriyaSubSelect
                  ? categorySubId?.name.charAt(0).toUpperCase() +
                    categorySubId?.name.slice(1)
                  : "Sub Categoriya tanlash"}
              </button>

              <small className="text-red-500 block">
                {requiredInputValue.selectSubCategoriya &&
                  "Sub Categoriya tanlashingiz majburiy!"}
              </small>
            </div>
          </div>

          {/* Categoriya modal */}
          {categoriyModal ? (
            <div className="absolute z-20 grid place-items-center bg-[#404040cd] rounded-xl w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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

          {subCategoriyModal ? (
            <div className="absolute z-20 grid place-items-center bg-[#404040cd] rounded-xl w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="animate-fadeScale w-1/2 min-h-[200px]  bg-white border-none p-5 rounded-[12px] flex gap-3 items-start flex-wrap">
                {categoryName
                  ?.slice()
                  .reverse()
                  .map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => categorySubModalFunction(item)}
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

          <form
            onSubmit={handleAddCategoriya}
            className="flex flex-col gap-3.5"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="w-full">
                <input
                  onChange={productValue}
                  name="title"
                  autoComplete="off"
                  type="text"
                  placeholder="Nomi ..."
                  className="w-full h-[42px] outline-none rounded-[12px] border-[1px] border-bg-color bg-transparent px-3"
                  // required
                />

                <small className="text-red-500">
                  {requiredInputValue.selectName &&
                    "Maxsulot nomini kiritishingiz majburiy!"}
                </small>
              </div>

              <div className="w-[220px]">
                <div className="group relative w-full h-[42px] outline-none rounded-[12px] border-[1px] border-bg-color bg-transparent">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 w-full h-full"
                  >
                    <span>Maxsulot sifati</span>
                    <IoIosArrowDown className="mt-1 text-[18px] group-hover:-rotate-180 duration-300 ease-in-out" />
                  </button>

                  <ul className="hidden animate-fadeInUpSmoll absolute w-full group-hover:flex flex-col bg-body-color rounded-[12px] overflow-hidden">
                    <li
                      onClick={() => setCondition("new")}
                      className="h-[42px] hover:bg-white p-3 duration-300 ease-in-out cursor-pointer flex items-center"
                    >
                      Yangi
                    </li>
                    <li
                      onClick={() => setCondition("used")}
                      className="h-[42px] hover:bg-white p-3 duration-300 ease-in-out cursor-pointer flex items-center"
                    >
                      Eski
                    </li>
                  </ul>
                </div>

                <small className="text-red-500">
                  {requiredInputValue.selectCondition &&
                    "Mahsulot sifatini tanlashingiz shart!"}
                </small>
              </div>
            </div>

            <div className="h-[150px]">
              <textarea
                onChange={productValue}
                name="description"
                placeholder="Description ..."
                className="w-full outline-none resize-none rounded-[12px] h-full border-[1px] border-bg-color bg-transparent p-3"
              ></textarea>
              <small className="text-red-500">
                {requiredInputValue.selectDescription &&
                  "Description nomini kiritishingiz majburiy!"}
              </small>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="w-full">
                <input
                  onChange={productValue}
                  name="price"
                  className="w-full h-[42px] outline-none rounded-[12px] border-[1px] border-bg-color bg-transparent px-3"
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
                  className="w-full h-[42px] outline-none rounded-[12px] border-[1px] border-bg-color bg-transparent px-3"
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

            <div>
              <input
                onChange={productValue}
                name="images_upload"
                type="file"
                id="file"
                className="hidden"
                multiple
              />
              <label
                htmlFor="file"
                className="flex items-center gap-3 w-[160px] h-[70px] text-[14px] justify-center
               rounded-[16px] border-[1px] border-dotted border-bg-color duration-300 ease-in
               cursor-pointer text-gray-500"
              >
                <FiUploadCloud className="text-[24px] text-border-color" />
                {category && category?.length > 0
                  ? category?.images_upload[0]?.name
                  : "Rasim yuklash"}
              </label>

              {imagePreviews.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">
                    Yuklangan rasimlar ({imagePreviews.length})
                  </p>
                  <div className="flex gap-2">
                    {imagePreviews?.slice(0, 10).map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="w-20 h-20 rounded-[16px] p-1 overflow-hidden border-[1px] border-gray-300">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover rounded-[12px]"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full 
                                   flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 
                                   transition-opacity duration-200 hover:bg-red-600"
                        >
                          ×
                        </button>
                        <p className="text-xs text-gray-500 mt-1 truncate w-20">
                          {category.images_upload[index]?.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="ml-auto flex items-center gap-4">
              <button
                className="h-[42px] cursor-pointer text-white duration-300 ease-in rounded-[12px] border-[1px] border-bg-color px-5 bg-btn-color"
                type="submit"
              >
                Qo'shish
              </button>
              <button
                className="h-[42px] cursor-pointer text-white duration-300 ease-in rounded-[12px] border-[1px] border-bg-color px-5 bg-btn-color"
                type="button"
                onClick={backButton}
              >
                Qaytish
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer autoClose={1200} />
    </>
  );
}

export default AddProductsModal;
