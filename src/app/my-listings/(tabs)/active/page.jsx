"use client";
import LoadingCircul from "@/components/loading/LoadingCircul";
import { get } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { parse } from "postcss";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";

// Faol mahsulotlarni ko'rsatish komponenti
function Active({ activeTab }) {
  // STATE LARNI ANiQLASH:
  const [active, setActive] = useState([]); // Faol mahsulotlar ro'yxati
  const [productsList, setProductsList] = useState(true); // Yuklanish holati

  // MA'LUMOTLARNI OLISH FUNKSIYASI: API orqali mahsulotlarni olish
  const getActiveData = async () => {
    try {
      // API so'rov: status parametri bo'yicha mahsulotlarni olish
      var product = await get(`products/?status=${activeTab}`);
      if (product) {
        setActive(product); // Mahsulotlarni state ga saqlash
        setProductsList(false); // Yuklanish holatini o'chirish
      }
    } catch (error) {
      console.error("Xatolik:", error); // Xatoliklarni qayd etish
    }
  };

  // USE EFFECT: activeTab o'zgarganda ma'lumotlarni qayta yuklash
  useEffect(() => {
    getActiveData();
  }, [activeTab]);

  return (
    <>
      {/* YUKLANISH HOLATI: Ma'lumotlar yuklanayotganda ko'rsatiladi */}
      {productsList ? (
        <div className="grid place-items-center w-full h-[60vh]">
          <LoadingCircul />
        </div>
      ) : (
        /* MAHSULOTLAR RO'YXATI: Yuklanish tugagach ko'rsatiladi */
        <div className="grid grid-cols-4 gap-3.5 mt-5 animate-fadeInUp">
          {/* AGAR MAHSULOTLAR BO'SH BO'LSA: Xabar ko'rsatish */}
          {active?.length === 0 ? (
            <h1>Malumot yo'q</h1>
          ) : (
            /* MAHSULOT KARTALARI: Har bir mahsulotni alohida kartada ko'rsatish */
            active?.map((item, index) => (
              <Link
                href={`my-listings/${item.id}?status=${activeTab}`}
                key={index}
                className="bg-white rounded-[12px] overflow-hidden"
              >
                {/* MAHSULOT RASMI: Mahsulotning asosiy rasmi */}
                <div className="w-full h-[200px] relative">
                  <Image
                    src={item.images[0]?.image || "/no-image.png"}
                    alt={item?.title}
                    fill
                    className="object-cover"
                  />

                  {/* ACTION TUGMALARI: Like va savatcha tugmalari */}
                  <div className="absolute top-2.5 z-10 right-2.5 flex items-center gap-2.5">
                    {/* LIKE TUGMASI: Mahsulotni sevimlilarga qo'shish */}
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Linkning default harakatini to'xtatish
                        // e.stopPropagation(); // Event bubbling ni to'xtatish
                      }}
                      className="bg-body-color rounded-[12px] p-2.5 grid place-items-center cursor-pointer"
                    >
                      <FaRegHeart className="text-[18px]" />
                    </button>

                    {/* SAVATCHA TUGMASI: Mahsulotni savatchaga qo'shish */}
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Linkning default harakatini to'xtatish
                        // e.stopPropagation(); // Event bubbling ni to'xtatish
                      }}
                      className="bg-body-color rounded-[12px] p-[8px] cursor-pointer"
                    >
                      <PiShoppingCartBold className="text-[20px]" />
                    </button>
                  </div>
                </div>

                {/* MAHSULOT MA'LUMOTLARI: Sarlavha, narx va joylashuv */}
                <div className="px-4 py-2">
                  {/* SOTIB OLISH TUGMASI: Mahsulotni xarid qilish */}
                  <button className="bg-btn-color cursor-pointer text-white my-2.5 rounded-2xl py-1.5 px-5 text-center">
                    Buy
                  </button>

                  {/* MAHSULOT NOMI: Mahsulotning to'liq nomi */}
                  <h4 className="line-clamp-2 leading-5">{item?.title}</h4>

                  {/* NARX VA JOYLASHUV: Mahsulot narxi va manzili */}
                  <div className="flex items-center justify-between my-2.5 gap-[15px]">
                    <span className="min-w-[50px]">
                      {parseFloat(item?.price)}
                    </span>
                    <span className="line-clamp-1">{item?.location}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </>
  );
}

// REACT.MEMO: Komponentni optimallashtirish uchun
export default React.memo(Active);
