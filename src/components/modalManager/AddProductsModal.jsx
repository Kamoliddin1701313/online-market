"use client";
import { useDispatch } from "react-redux";
import { addProductsModal } from "@/store/slice/slice";
import { useState } from "react";
import { get, post } from "@/lib/api";

function AddProductsModal() {
  const dispatch = useDispatch();
  const [categoriyModal, setCategoriyModal] = useState(false);
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

  const categoryModalFunction = () => {
    setCategoriyModal((p) => !p);
  };

  const productValue = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleAddCategoriya = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category_id", category.category_id);
      formData.append("title", category.title);
      formData.append("description", category.description);
      formData.append("price", category.price);
      formData.append("location", category.location);

      if (category.image) {
        formData.append("image", category.image);
      }

      const productPost = await post("/products", category);
      if (productPost) {
        alert("Ma'lumotlaringiz qo'shildi");
      } else {
        console.log(productPost, "error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(category, "ZO'R Kamoliddin");

  return (
    <div className="fixed flex bg-border-color inset-0 justify-center items-center z-50">
      <div className="animate-fadeInDown relative w-3/5 mx-auto rounded-xl p-6 shadow-lg bg-[#313b52]">
        <h2 className="font-normal text-[28px] mb-4 text-white">
          Maxsulotlar qo'shish
        </h2>

        <button
          onClick={() => setCategoriyModal((p) => !p)}
          className="h-[48px] text-white outline-none rounded-[12px] border-[2px] border-bg-color bg-transparent px-3 mb-[14px] duration-300 ease-in hover:bg-bg-color"
        >
          Categoriya tanlash
        </button>

        {/* Categoriya modal */}

        {categoriyModal ? (
          <div className="absolute grid place-items-center bg-[#404040cd] rounded-xl w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="animate-fadeScale w-1/2 min-h-[200px] bg-white border-none p-5 rounded-[12px] flex gap-3 items-start">
              <button
                onClick={categoryModalFunction}
                className="rounded-[12px] px-5 py-1 border-[2px] border-bg-color bg-transparent hover:bg-bg-color duration-300 ease-in"
              >
                Uy
              </button>

              <button
                onClick={categoryModalFunction}
                className="rounded-[12px] px-5 py-1 border-[2px] border-bg-color bg-transparent hover:bg-bg-color duration-300 ease-in"
              >
                Moshina
              </button>
            </div>
          </div>
        ) : (
          ""
        )}

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
