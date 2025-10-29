"use client";
import BackButton from "@/components/backButton/BackButton";
import Loading from "@/components/loading/Loading";
import { get } from "@/lib/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { MdEdit } from "react-icons/md";
import { useParams, useSearchParams } from "next/navigation";

// modal

import Modal from "@mui/material/Modal";

function MyListingsId() {
  const { id } = useParams();
  const [editModal, setEditModal] = useState(false);

  const searchParams = useSearchParams();
  const status = searchParams?.get("status") || "";

  const [productId, setProductId] = useState(null);
  const [loading, setLoading] = useState(true);

  const showEditButton = status === "pending";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await get(`products/${id}`);
        setProductId(product);
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  const editProduct = (id) => {
    console.log(id, "Object bosildi");
    setEditModal(true);
  };

  const handleClose = () => setEditModal(false);

  return (
    <>
      {!productId ? (
        <Loading />
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
                onClick={() => editProduct(productId)}
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

          <div className="w-full mt-3 flex flex-col gap-5">
            {productId?.images?.map((img) => {
              const { image, id } = img;
              return (
                <Image
                  key={id}
                  src={image}
                  alt={productId?.title || "Mahsulot rasmi"}
                  width={500}
                  height={500}
                  className="rounded-[16px] w-full h-[450px] shadow-md"
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
          <form className="flex flex-col gap-2">
            <div className="flex justify-between gap-4 items-start">
              <div className="w-full">
                <button>Categoriya tanlash</button>
                <div>
                  <button>Categoriya 1</button>
                  <button>Categoriya 1</button>
                </div>
              </div>

              <div className="w-full">
                <button>Sub categoriya tanlash</button>
                <div>
                  <button>Sub categoriya 1</button>
                  <button>Sub categoriya 1</button>
                </div>
              </div>

              <div className="w-full">
                <button>O'zgartirish</button>
                <div>
                  <button>Yangi</button>
                  <button>Eski</button>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="title">Nomini o'zgartirish</label>
              <input
                id="title"
                type="text"
                className="w-full h-[42px] rounded-[10px] px-3 border-[2px] outline-none group relative border-bg-color bg-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="description">Descriptionni o'zgartirish</label>
              <textarea
                name=""
                id="description"
                rows="4"
                className="w-full resize-none rounded-[10px] px-3 py-1 border-[2px] outline-none group relative border-bg-color bg-transparent"
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label htmlFor="price">Narxini o'zgartirish</label>
              <input
                id="price"
                type="text"
                className="w-full h-[42px] rounded-[10px] px-3 border-[2px] outline-none group relative border-bg-color bg-transparent"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="location">Manzilingizni o'zgartirish</label>
              <input
                type="text"
                className="w-full h-[42px] rounded-[10px] px-3 border-[2px] outline-none group relative border-bg-color bg-transparent"
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default MyListingsId;
