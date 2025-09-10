"use client";
import { useDispatch } from "react-redux";
import { addProductsModal } from "@/store/slice/slice";
import { useState } from "react";

function AddProductsModal() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState({
    category_id: "",
    title: "",
    description: "",
    price: "",
    image: "",
    location: "",
  });

  const backButton = () => {
    dispatch(addProductsModal());
  };

  const productValue = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleAddCategoriya = (e) => {
    e.preventDefault();
    console.log(category);
  };

  return (
    <div className="fixed flex bg-border-color inset-0 justify-center items-center z-50">
      <div className="animate-fadeInDown w-3/5 mx-auto rounded-xl p-6 shadow-lg bg-[#313b52]">
        <h2 className="font-normal text-[28px] mb-4 text-white">
          Maxsulotlar qo'shish
        </h2>

        <form onSubmit={handleAddCategoriya} className="flex flex-col gap-3.5">
          <input
            onChange={productValue}
            name="category_id"
            autoComplete="off"
            type="text"
            placeholder="ID"
            className="w-[50px] h-[20px] p-4 text-white outline-none rounded-full border-[2px] border-bg-color bg-transparent"
          />

          <input
            onChange={productValue}
            name="title"
            autoComplete="off"
            type="text"
            placeholder="Nomi ..."
            className="w-full h-[48px] text-white outline-none rounded-[12px] border-[2px] border-bg-color bg-transparent px-3"
          />
          <textarea
            onChange={productValue}
            name="description"
            rows={6}
            placeholder="Description ..."
            className="w-full outline-none text-white resize-none rounded-[12px] border-[2px] border-bg-color bg-transparent p-3"
          ></textarea>

          <div className="flex items-center justify-between gap-5">
            <input
              onChange={productValue}
              name="price"
              className="w-full h-[48px] text-white outline-none rounded-[12px] border-[2px] border-bg-color bg-transparent px-3"
              autoComplete="off"
              type="text"
              placeholder="Narxi ..."
            />
            <input
              onChange={productValue}
              name="location"
              className="w-full h-[48px] text-white outline-none rounded-[12px] border-[2px] border-bg-color bg-transparent px-3"
              autoComplete="off"
              type="text"
              placeholder="Manzili ..."
              multiple
            />
          </div>

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
              className="w-[80px] h-[80px] text-[14px] flex items-center justify-center 
               rounded-[16px] border-2 border-dashed border-gray-400 hover:shadow-[0_0_6px_rgba(249,248,248,0.4)] hover:bg-transparent duration-300 ease-in
               cursor-pointer text-gray-500"
            >
              Fayl
            </label>
          </div>

          <div className="ml-auto flex items-center gap-5">
            <button
              className="h-[48px] cursor-pointer text-white duration-300 ease-in rounded-[12px] border-[2px] border-bg-color px-5 hover:bg-bg-color hover:text-black"
              type="submit"
            >
              Qo'shish
            </button>
            <button
              className="h-[48px] cursor-pointer text-white duration-300 ease-in rounded-[12px] border-[2px] border-bg-color px-5 hover:bg-bg-color hover:text-black"
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
