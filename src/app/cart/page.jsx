import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { IoMdCheckboxOutline } from "react-icons/io";
import { BsFilterLeft } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { LuShoppingCart } from "react-icons/lu";
import { FaTrash } from "react-icons/fa6";
import { IoMdRefresh } from "react-icons/io";
import { get } from "@/lib/api";
import Image from "next/image";
import CartCategoryDropdown from "@/components/cartComponents/CartCategoryDropdown";

import noimg from "../../../public/images/no-img.webp";

async function Card() {
  // Server-side data fetching - mahsulotlar ro'yxatini API dan olish
  const respons = await get("products/");

  return (
    <div>
      {/* HEADER SECTION: Search, filters va navigation buttonlari */}
      <div className="flex items-center justify-between gap-3">
        {/* SEARCH INPUT: Mahsulotlarni qidirish uchun input maydoni */}
        <div className="flex w-full items-center gap-2 border-[2px] rounded-[14px] h-[48px] px-5 bg-white font-medium">
          <FaSearch className="text-[14px]" />
          <input
            type="text"
            placeholder="Mahsulot qidirish ..."
            className="h-full outline-none border-none w-full"
          />
        </div>

        {/* HOME BUTTON: Asosiy sahifaga qaytish tugmasi */}
        <button className="border-[2px] rounded-[14px] h-[48px] px-5 flex items-center gap-2 bg-white font-medium">
          <span>Home</span> <PiSlidersHorizontalBold className="mt-1" />
        </button>

        {/* CATEGORY DROPDOWN: Mahsulot kategoriyalarini filtrlash komponenti */}
        <CartCategoryDropdown />

        {/* FAVORITES BUTTON: Sevimli mahsulotlar sahifasiga o'tish */}
        <button className="border-[2px] rounded-[14px] h-[48px] px-5 flex items-center gap-2 bg-white font-medium">
          <FaRegHeart /> <span>Sevimli</span>
        </button>

        {/* CART BUTTON: Savatcha sahifasiga o'tish (aktiv holatda) */}
        <button className="border-[2px] border-[#FC7A00] rounded-[14px] h-[48px] px-5 flex items-center gap-2 bg-[#FC7A00] text-white font-medium">
          <LuShoppingCart />
          <span>Savatcha</span>
        </button>
      </div>

      {/* MAIN CART CONTAINER: Savatchaning asosiy kontenti */}
      <div className="animate-fadeInUp border-[2px] rounded-[14px] bg-white w-full min-h-10 mt-5">
        {/* CART HEADER: Savatcha sarlavhasi va action buttonlari */}
        <div className="p-3 flex items-center justify-between">
          <h2 className="font-semibold text-[20px]">
            Savatcha ({respons?.length} ta mahsulot){" "}
            {/* Savatchadagi mahsulotlar soni */}
          </h2>
          <div className="flex items-center gap-2">
            <IoMdRefresh className="text-[20px]" />
            <h2 className="font-semibold text-[18px] text-[#111111dc]">
              Tanlanganlarni olib tashlash{" "}
              {/* Tanlangan mahsulotlarni o'chirish */}
            </h2>
          </div>
        </div>

        {/* SEPARATOR: Bo'limlarni ajratish uchun chiziq */}
        <div className="w-full h-[1px] my-2 bg-[#52525219]"></div>

        {/* FILTER BUTTONS: Mahsulotlarni filtrlash tugmalari */}
        <div className="flex items-center gap-3 p-3">
          {/* LOCATION FILTER: Mahsulot joylashuvi bo'yicha filtrlash */}
          <button className="h-[42px] px-5 border-[2px] rounded-[12px] font-semibold flex items-center gap-2">
            <GrLocation />
            Joylashuv
          </button>

          {/* SELLER FILTER: Sotuvchi bo'yicha filtrlash */}
          <button className="h-[42px] px-5 border-[2px] rounded-[12px] font-semibold flex items-center gap-2">
            <FiUsers />
            Sotuvchi
          </button>

          {/* PRICE FILTER: Narx bo'yicha saralash */}
          <button className="h-[42px] px-5 border-[2px] rounded-[12px] font-semibold flex items-center gap-2">
            <BsFilterLeft />
            Narx bo'yicha
          </button>

          {/* CLEAR ALL: Barcha filtrlarni tozalash */}
          <button className="h-[42px] px-5 border-[2px] rounded-[12px] font-semibold flex items-center gap-2">
            <IoMdCheckboxOutline />
            Hammasini olib tashlash
          </button>
        </div>

        {/* PRODUCTS LIST: Savatchadagi mahsulotlar ro'yxati */}
        {respons &&
          respons?.map((item) => {
            return (
              <div key={item.id}>
                {/* PRODUCT SEPARATOR: Har bir mahsulot oralig'idagi chiziq */}
                <div className="w-full h-[1px] my-2 bg-[#52525219]"></div>

                {/* PRODUCT ITEM: Yakka mahsulot kartasi */}
                <div className="flex justify-between py-2 px-4 items-center">
                  {/* PRODUCT INFO: Mahsulot rasmi va ma'lumotlari */}
                  <div className="flex items-center gap-3">
                    <div>
                      {/* PRODUCT IMAGE: Mahsulot rasmi (standart rasm fallback bilan) */}
                      <Image
                        src={noimg}
                        alt="cart_img"
                        width="100px"
                        height="70px"
                        className="w-[100px] h-[70px] rounded-[14px]"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <h2 className="text-[16px] text-black">name</h2>
                      <p className="font-semibold text-[14px] text-[#2a2a2abb]">
                        nimadir keladi bu yerga{" "}
                        {/* Mahsulot tavsifi yoki qo'shimcha ma'lumot */}
                      </p>
                      <h2 className="text-[18px] text-black">Narxi</h2>
                    </div>
                  </div>

                  {/* QUANTITY CONTROLS: Mahsulot miqdorini boshqarish */}
                  <div className="flex justify-between items-end w-1/2">
                    {/* QUANTITY SELECTOR: Mahsulot sonini oshirish/kamaytirish */}
                    <div className="flex items-center border-[2px] rounded-[12px] overflow-hidden h-[42px]">
                      <button className="flex items-center cursor-pointer px-5 text-[20px] h-full">
                        - {/* Miqdorni kamaytirish */}
                      </button>
                      <span className="flex items-center text-[16px] px-5 text-[20px border-l-[2px] border-r-[2px] h-full">
                        1 {/* Joriy miqdor */}
                      </span>
                      <button className="flex items-center cursor-pointer px-5 text-[20px] h-full">
                        + {/* Miqdorni oshirish */}
                      </button>
                    </div>

                    {/* REMOVE BUTTON: Mahsulotni savatchadan o'chirish */}
                    <button className="flex items-center gap-2 border-[2px] h-[42px] px-5 rounded-[12px]">
                      <FaTrash /> Olib tashlash
                    </button>
                  </div>

                  {/* PRODUCT PRICE: Mahsulotning jami narxi */}
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-[16px] text-[#2a2a2abb]">
                      Narxi :
                    </h2>
                    <h2 className="font-semibold text-[16px] text-black">
                      $ Narxi {/* Mahsulotning umumiy narxi */}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Card;
