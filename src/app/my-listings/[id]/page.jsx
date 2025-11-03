"use client";
import BackButton from "@/components/backButton/BackButton";
import { get, put } from "@/lib/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { useParams, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import LoadingCircul from "@/components/loading/LoadingCircul";

// modal
import Modal from "@mui/material/Modal";
import Skelton from "@/components/loading/Skelton";

function MyListingsId() {
  const { id } = useParams();
  const [idImg, setIdImg] = useState(0);
  const searchParams = useSearchParams();
  const [productEdit, setProductEdit] = useState({
    title: "",
    description: "",
    price: "",
    condition: "",
    location: "",
    category: "",
    subcategory: "",
  });

  const productChange = (e) => {
    setProductEdit({
      ...productEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditCategoriya = async (e) => {
    e.preventDefault();
    try {
      // Ma'lumotlarni to'g'ri formatda yuborish
      const editData = {
        title: productEdit.title,
        description: productEdit.description,
        price: parseFloat(productEdit.price),
        condition: productEdit.condition,
        location: productEdit.location,
        category: productEdit.category,
        subcategory: productEdit.subcategory,
      };

      const responsEdit = await put(`products/${id}/edit/`, editData);
      console.log(responsEdit, "Mana edite bo'ldi qaranglar");

      // Muvaffaqiyatli bo'lsa modalni yopish
      setEditModal(false);

      // Yangilangan ma'lumotlarni qayta yuklash
      const updatedProduct = await get(`products/${id}`);
      setProductId(updatedProduct);
    } catch (error) {
      console.error("Tahrirlashda xatolik:", error);
    }
  };

  const [editModal, setEditModal] = useState(false);
  const [categoriyaOpen, setCategoriyaOpen] = useState(false);
  const [subCategoriyaOpen, setSubCategoriyaOpen] = useState(false);
  const [isNewOpen, setIsNewOpen] = useState(false);
  const [categoriya, setCategoriya] = useState([]);
  const [subCategoriya, setSubCategoriya] = useState([]);
  const [editNew, setEditNew] = useState("");
  const [categoriyaSelected, setCategoriyaSelected] = useState(null);
  const [subCategoriyaSelected, setSubCategoriyaSelected] = useState(null);

  const [productId, setProductId] = useState(null);
  const status = searchParams?.get("status") || "";

  const showEditButton = status === "pending";

  const getCategoriyaFunction = async () => {
    const respons = await get("categories/");
    setCategoriya(respons);
    setSubCategoriya(respons);
  };

  useEffect(() => {
    getCategoriyaFunction();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await get(`products/${id}`);
        setProductId(product);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (productId) {
      setProductEdit({
        title: productId.title || "",
        description: productId.description || "",
        price: productId.price || "",
        condition: productId.condition || "",
        location: productId.location || "",
        category: productId.category?.id || "",
        subcategory: productId.subcategory?.id || "",
      });
      setEditNew(productId.condition || "");
      setCategoriyaSelected(productId.category?.id || null);
      setSubCategoriyaSelected(productId.subcategory?.id || null);
    }
  }, [productId]);

  const editOpenProductModal = () => {
    setEditModal(true);
  };

  const editCloseProductModal = () => {
    setEditModal(false);
  };

  const categoriyaOpenBtn = () => {
    setCategoriyaOpen((p) => !p);
  };

  const subCategoriyaOpenBtn = () => {
    setSubCategoriyaOpen((p) => !p);
  };

  const isNewOpenBtn = () => {
    setIsNewOpen((p) => !p);
  };

  const categoriyaSelectedBtn = (id) => {
    setCategoriyaSelected(id);
    setProductEdit({
      ...productEdit,
      category: id,
    });
    setCategoriyaOpen((p) => !p);
  };

  const subCategoriyaSelectedBtn = (id) => {
    setSubCategoriyaSelected(id);
    setProductEdit({
      ...productEdit,
      subcategory: id,
    });
    setSubCategoriyaOpen((p) => !p);
  };

  const editNewBtn = (condition) => {
    setEditNew(condition);
    setProductEdit({
      ...productEdit,
      condition: condition,
    });
    setIsNewOpen((p) => !p);
  };

  const changeImg = (id) => {
    setIdImg(id);
  };

  const handleClose = () => setEditModal(false);

  console.log(productId, "productId");

  return (
    <>
      {!productId ? (
        <div className="grid place-items-center h-screen w-full">
          <LoadingCircul />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-start gap-5 justify-between bg-white shadow-lg rounded-2xl p-6">
          <div className="flex items-center justify-between w-full">
            <BackButton>
              <HiOutlineArrowNarrowLeft className="mt-1 text-[18px]" />
              Orqaga
            </BackButton>

            {/* Faqat pending holatida Tahrirlash tugmasini ko'rsatish */}
            {showEditButton && (
              <button
                onClick={() => editOpenProductModal()}
                className="px-4 h-[42px] bg-[#0D5950] text-white flex items-center gap-2"
              >
                <MdEdit className="text-[15px] mt-[2px]" />
                Tahrirlash
              </button>
            )}
          </div>

          <div className="w-full md:w-1/2 space-y-5">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              {productId.title}
            </h1>

            <div className="space-y-5">
              <p className="text-gray-700 text-lg leading-relaxed">
                {productId.description}
              </p>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="flex justify-between text-gray-800">
                <span className="font-semibold text-gray-600">💰 Narxi:</span>
                <span className="text-green-600 font-bold">
                  {parseFloat(productId.price)}
                </span>
              </div>

              <div className="flex justify-between text-gray-800">
                <span className="font-semibold text-gray-600">
                  📍 Joylashuv:
                </span>
                <span className="text-blue-600">{productId.location}</span>
              </div>

              <div className="flex justify-between text-gray-800">
                <span className="font-semibold text-gray-600">
                  👤 Foydalanuvchi:
                </span>
                <span className="text-gray-800">{productId.user}</span>
              </div>

              <div className="flex justify-between text-gray-800">
                <span className="font-semibold text-gray-600">🗓 Sana:</span>
                <span className="text-gray-700">
                  {productId.created_at
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join(".")}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="w-full h-[450px]">
              {productId?.images && productId.images.length > 0 ? (
                <Image
                  src={productId.images[idImg].image}
                  alt="images"
                  width={800}
                  height={450}
                  className="w-full h-full rounded-[16px]"
                />
              ) : (
                <div className="h-[400px] w-full overflow-hidden">
                  <Skelton />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 w-full gap-3">
            {productId?.images?.map((img, index) => {
              const { image, id } = img;
              return (
                <Image
                  onClick={() => changeImg(index)}
                  key={id}
                  src={image}
                  alt={productId?.title || "Mahsulot rasmi"}
                  width={500}
                  height={180}
                  className="rounded-[16px] w-full h-[180px] shadow-md cursor-pointer"
                />
              );
            })}
          </div>
        </div>
      )}

      <Modal
        open={editModal}
        onClose={handleClose}
        className="bg-sidebar-color"
      >
        <div className="absolute top-1/2 left-1/2 p-5 w-3/5 rounded-[24px] bg-white shadow-xl -translate-x-1/2 -translate-y-1/2">
          <form onSubmit={handleEditCategoriya} className="flex flex-col gap-2">
            <div className="flex justify-between gap-4 items-start">
              <div className="w-full relative">
                <button
                  type="button"
                  onClick={categoriyaOpenBtn}
                  className="h-[42px] min-w-[200px] w-full text-border-color rounded-[12px] border-[2px] border-bg-color bg-transparent duration-300 ease-in hover:bg-bg-color"
                >
                  Categoriya tanlash
                </button>

                {categoriyaOpen && (
                  <div className="absolute left-0 top-[52px] overflow-hidden z-20 w-full bg-[#7C7D7E] p-2 border-[2px] border-[#7C7D7E] rounded-[12px]">
                    <div className="w-full max-h-[320px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                      {categoriya &&
                        categoriya
                          ?.slice()
                          ?.reverse()
                          ?.map((item) => {
                            return (
                              <motion.button
                                onClick={() => categoriyaSelectedBtn(item?.id)}
                                key={item?.id}
                                type="button"
                                className={`w-full h-[42px] border-[2px] rounded-[12px] my-[6px] hover:bg-[#5d5d5d] hover:text-white ${
                                  productId?.category?.name == item?.name
                                    ? "bg-[#5d5d5d] text-white"
                                    : "bg-white"
                                }`}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                  duration: 0.6,
                                  ease: "easeOut",
                                }}
                              >
                                {item?.name}
                              </motion.button>
                            );
                          })}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full relative">
                <button
                  type="button"
                  onClick={subCategoriyaOpenBtn}
                  className="h-[42px] min-w-[200px] w-full text-border-color rounded-[12px] border-[2px] border-bg-color bg-transparent duration-300 ease-in hover:bg-bg-color"
                >
                  Sub categoriya tanlash
                </button>
                {subCategoriyaOpen && (
                  <div className="absolute left-0 top-[52px] overflow-hidden z-20 w-full bg-[#7C7D7E] p-2 border-[2px] border-[#7C7D7E] rounded-[12px]">
                    <div className="w-full max-h-[320px] overflow-y-auto [&::-webkit-scrollbar]:hidden">
                      {subCategoriya &&
                        subCategoriya
                          ?.slice()
                          ?.reverse()
                          ?.map((item) => {
                            return (
                              <motion.button
                                onClick={() =>
                                  subCategoriyaSelectedBtn(item?.id)
                                }
                                key={item?.id}
                                type="button"
                                className={`w-full h-[42px] bg-white border-[2px] rounded-[12px] my-[6px] hover:bg-[#5d5d5d] hover:text-white ${
                                  productId?.category?.name == item?.name
                                    ? "bg-[#5d5d5d] text-white"
                                    : "bg-white"
                                }`}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{
                                  duration: 0.6,
                                  ease: "easeOut",
                                }}
                              >
                                {item?.name}
                              </motion.button>
                            );
                          })}
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full relative">
                <button
                  type="button"
                  onClick={isNewOpenBtn}
                  className="h-[42px] min-w-[200px] w-full text-border-color rounded-[12px] border-[2px] border-bg-color bg-transparent duration-300 ease-in hover:bg-bg-color"
                >
                  O'zgartirish
                </button>
                {isNewOpen && (
                  <div className="absolute left-0 top-[52px] z-20 w-full flex flex-col gap-2 bg-[#7C7D7E] p-2 border-[2px] border-[#7C7D7E] rounded-[12px]">
                    <motion.button
                      onClick={() => editNewBtn("new")}
                      type="button"
                      className={`w-full h-[42px] border-[2px] rounded-[12px] hover:bg-[#5d5d5d] hover:text-white ${
                        productId?.condition == "new"
                          ? "bg-[#5d5d5d] text-white"
                          : "bg-white"
                      }`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      Yangi
                    </motion.button>

                    <motion.button
                      onClick={() => editNewBtn("used")}
                      type="button"
                      className={`w-full h-[42px] border-[2px] rounded-[12px] ${
                        productId?.condition == "used"
                          ? "bg-[#5d5d5d] text-white"
                          : "bg-white"
                      }`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      Eski
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="title" className="text-[14px]">
                Nomini o'zgartirish
              </label>
              <input
                value={productEdit?.title}
                onChange={productChange}
                name="title"
                id="title"
                type="text"
                className="w-full h-[42px] rounded-[10px] px-3 border-[2px] outline-none group relative border-bg-color bg-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description" className="text-[14px]">
                Descriptionni o'zgartirish
              </label>
              <textarea
                value={productEdit?.description}
                onChange={productChange}
                name="description"
                id="description"
                rows="4"
                className="w-full resize-none rounded-[10px] px-3 py-1 border-[2px] outline-none group relative border-bg-color bg-transparent"
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label htmlFor="price" className="text-[14px]">
                Narxini o'zgartirish
              </label>
              <input
                value={parseFloat(productEdit?.price)}
                onChange={productChange}
                name="price"
                id="price"
                type="text"
                className="w-full h-[42px] rounded-[10px] px-3 border-[2px] outline-none group relative border-bg-color bg-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="location" className="text-[14px]">
                Manzilingizni o'zgartirish
              </label>
              <input
                value={productEdit?.location}
                onChange={productChange}
                name="location"
                type="text"
                className="w-full h-[42px] rounded-[10px] px-3 border-[2px] outline-none group relative border-bg-color bg-transparent"
              />
            </div>

            <div className="flex justify-end mt-2 gap-5">
              <button
                type="button"
                onClick={() => editCloseProductModal()}
                className="h-[42px] w-[160px] text-border-color rounded-[12px] border-[2px] border-bg-color bg-transparent duration-300 ease-in hover:bg-[#0D5950] hover:border-[#0D5950] hover:text-white"
              >
                Yopish
              </button>

              <button
                type="submit"
                className="h-[42px] w-[160px] text-border-color rounded-[12px] border-[2px] border-bg-color bg-transparent duration-300 ease-in hover:bg-[#0D5950] hover:border-[#0D5950] hover:text-white"
              >
                Qo'shish
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default MyListingsId;
