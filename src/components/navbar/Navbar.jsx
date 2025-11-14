"use client";
// React icon kutubxonasidagi iconkalar
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { MdYoutubeSearchedFor } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { TbShoppingBagHeart } from "react-icons/tb";

import logo from "../../../public/images/online_bozor_logo.webp";
import uzb from "../../../public/images/uzb.webp";
import rus from "../../../public/images/rus.webp";
import Image from "next/image";
import Link from "next/link";
import Motion from "../framer-motion/Motion";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutModalFunction,
  addProductsModal,
  getLocalStorageToken,
} from "@/store/slice/slice";
import { useEffect, useState } from "react";

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.cart.access);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [selectLanguages, setSelectLanguages] = useState("uzb");

  useEffect(() => {
    dispatch(getLocalStorageToken());
  }, [dispatch]);

  const handleAddButtonClick = () => {
    // Modalni ochish
    dispatch(addProductsModal());
    // Route ni o'zgartirish
    router.push("/");
  };

  const showLanguagesBtn = () => {
    setShowLanguages((p) => !p);
  };

  const showSearchInputBtn = () => {
    setShowSearchInput((p) => !p);
  };

  const selectLanguagesBtn = (languages) => {
    setSelectLanguages(languages);
    setShowLanguages(false);
  };

  return (
    <div className="h-[70px] bg-white w-full top-0 left-0 fixed z-30 py-3 xl:px-3 lg:py-4 md:py-[18px] sm:py-5">
      <div className="max-w-[1280px] mx-auto flex items-center h-full gap-8 justify-between xl:gap-4 md:gap-2">
        <Link
          href="/"
          className="h-full rounded-[8px] px-2.5 w-1/8 text-center flex items-center border-[2px] border-border-color md:w-[160px] md:px-1"
        >
          <Image src={logo} alt="logo" className="w-[120px] md:w-full" />
        </Link>

        {/* categoriya va search va actegoriya qo'shiladigan divlar jamlanmasi */}
        <div className="flex items-center gap-5 h-full w-full xl:gap-3 md:justify-center md:gap-2">
          <div className="h-full">
            <button className="border-[2px] border-border-color cursor-pointer h-full rounded-[8px] flex items-center justify-center px-2.5 lg:px-2 sm:px-1">
              <TbAdjustmentsHorizontal className="text-[24px] lg:text-[19px]" />
            </button>
          </div>

          <div className="h-full w-full">
            {/* md dan katta xolatidagi code */}
            <form
              className={`flex items-center border-[2px] border-border-color h-full w-full rounded-[25px] overflow-hidden md:hidden`}
            >
              <input
                type="search"
                autoComplete="off"
                placeholder="Mahsulot qidirish..."
                className="pl-5 pr-2 placeholder-[#000] outline-none w-full h-full text-black border-none bg-transparent font-medium lg:pl-3 lg:text-[14px] lg:pr-0"
              />
              <button
                type="button"
                aria-label="Qidirish"
                className="px-5 h-full bg-light cursor- duration-300 ease-in border-none hover:bg-border-color lg:px-3"
              >
                <LuSearch className="text-[22px] text-primary text-[#000] lg:text-[18px]" />
              </button>
            </form>

            <button
              onClick={showSearchInputBtn}
              className="hidden w-[34px] md:block items-center justify-center h-full ml-auto rounded-full bg-body-color"
            >
              <LuSearch className="text-[22px] text-primary text-[#000] lg:text-[18px] w-full  md:text-[14px]" />
            </button>

            {/* md dagi responsive codim */}
            <div
              className={`${
                showSearchInput
                  ? "block z-30 duration-100 ease-out animate-fadeInDown"
                  : "hidden"
              } w-full left-0 top-[70px] absolute px-3 bg-white py-2`}
            >
              <div className="flex items-center justify-between border-[1px] rounded-[12px] overflow-hidden">
                <input
                  type="text"
                  className="w-full outline-none h-[36px] px-3"
                  placeholder="Search ..."
                />

                <button
                  type="button"
                  aria-label="Qidirish"
                  className="px-3 h-[36px] cursor- duration-300 ease-in border-none hover:bg-border-color"
                >
                  <LuSearch className="text-[22px] text-primary text-[#000] lg:text-[18px] h-full" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleAddButtonClick}
            className="flex items-center gap-2.5 border-[2px] border-[#0D5950] h-full rounded-[8px] px-3.5 cursor-pointer bg-[#0D5950] duration-300 ease-in text-white lg:px-2.5 lg:gap-2 lg:text-[14px] md:gap-1 md:text-[12px] sm:px-2"
          >
            <IoMdAdd />
            <span>Qo'shish</span>
          </button>
        </div>

        <div className="flex items-center gap-5 xl:gap-3 sm:gap-2.5">
          <div className="flex items-center gap-4 md:hidden">
            <button className="text-[18px] border-b-[2px] border-black cursor-pointer leading-5 lg:text-[16px]">
              uzb
            </button>

            <button className="text-[18px] border-b-[2px] border-black cursor-pointer leading-5 lg:text-[16px]">
              rus
            </button>
          </div>

          <div className="hidden md:block relative">
            <button
              onClick={showLanguagesBtn}
              className="items-center mt-2 w-[18px]"
            >
              <Image
                width={20}
                height={20}
                src={selectLanguages == "uzb" ? uzb : rus}
                alt="uzb"
                className="w-[18px] h-[18px] mx-auto"
              />
            </button>

            {showLanguages && (
              <div className="flex flex-col absolute z-30 top-10 w-[140px] -left-[80px] bg-white rounded-[12px]">
                <span className="font-medium p-3">Tilni tanlang</span>
                <button
                  onClick={() => selectLanguagesBtn("uzb")}
                  className={`${
                    selectLanguages == "uzb" ? "bg-body-color" : ""
                  } w-full flex items-center gap-2 text-btn-color cursor-pointer hover:bg-body-color h-[42px] px-3`}
                >
                  <Image
                    width={18}
                    height={18}
                    src={uzb}
                    alt="uzb"
                    className="w-[18px] h-[18px]"
                  />
                  <span className="font-semibold text-[13px]">Uzb</span>
                </button>

                <button
                  onClick={() => selectLanguagesBtn("rus")}
                  className={`${
                    selectLanguages == "rus" ? "bg-body-color" : ""
                  } w-full flex items-center gap-2 text-btn-color cursor-pointer hover:bg-body-color h-[42px] px-3`}
                >
                  <Image
                    width={18}
                    height={18}
                    src={rus}
                    alt="rus"
                    className="w-[18px] h-[18px]"
                  />
                  <span className="font-semibold text-[13px]">Rus</span>
                </button>
              </div>
            )}
          </div>

          {token ? (
            <button
              onClick={() => dispatch(logoutModalFunction())}
              className="cursor-pointer"
            >
              <HiOutlineLogout className="text-[24px] mt-[3px] lg:text-[19px]" />
            </button>
          ) : (
            <button
              onClick={() => router.push("/auth/login")}
              className="cursor-pointer"
            >
              <FaRegUser className="text-[18px] mt-[3px] lg:text-[15px]" />
            </button>
          )}

          <button type="button" aria-label="Sevimlilar" className="relative">
            <TbShoppingBagHeart className="text-[22px] cursor-pointer lg:text-[19px]" />
            <span className="absolute -top-[15px] -right-[15px] bg-[#636A79] text-white rounded-full text-[14px] px-[6px] font-medium xl:text-[12px] xl:-right-[5px] sm:text-[10px] sm:px-1">
              0
            </span>
          </button>
        </div>
      </div>

      <Motion />
    </div>
  );
}

export default Navbar;
