"use client";
// React icon kutubxonasidagi iconkalar
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { MdYoutubeSearchedFor } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";
import { TbShoppingBagHeart } from "react-icons/tb";

import logo from "../../../public/images/online_bozor_logo.webp";
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
import { useEffect } from "react";

function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.cart.access);

  useEffect(() => {
    dispatch(getLocalStorageToken());
  }, [dispatch]);

  const handleAddButtonClick = () => {
    // Modalni ochish
    dispatch(addProductsModal());
    // Route ni o'zgartirish
    router.push("/");
  };

  return (
    <div className="h-[70px] bg-white w-full top-0 left-0 fixed z-30 py-3">
      <div className="max-w-[1280px] mx-auto flex items-center h-full gap-8 justify-between">
        <Link
          href="/"
          className="h-full rounded-[8px] px-2.5 w-1/8 text-center flex items-center border-[2px] border-border-color"
        >
          <Image src={logo} alt="logo" className="w-[120px]" />
        </Link>

        {/* categoriya va search va actegoriya qo'shiladigan divlar jamlanmasi */}
        <div className="flex items-center gap-5 h-full w-full">
          <div className="h-full">
            <button className="border-[2px] border-border-color cursor-pointer h-full rounded-[8px] flex items-center justify-center px-2.5">
              <TbAdjustmentsHorizontal className="text-[24px]" />
            </button>
          </div>

          <div className="h-full w-full">
            <form className="flex items-center border-[2px] border-border-color h-full w-full rounded-[25px] overflow-hidden">
              <input
                type="search"
                autoComplete="off"
                placeholder="Mahsulot qidirish..."
                className="pl-5 pr-2 placeholder-[#000] outline-none w-full h-full text-black border-none bg-transparent"
              />
              <button
                type="button"
                aria-label="Qidirish"
                className="px-5 h-full bg-light cursor- duration-300 ease-in border-none hover:bg-white"
              >
                <MdYoutubeSearchedFor className="text-[22px] text-primary text-[#000]" />
              </button>
            </form>
          </div>

          <button
            onClick={handleAddButtonClick}
            className="flex items-center gap-2.5 border-[2px] border-[#0D5950] h-full rounded-[8px] px-3.5 cursor-pointer bg-[#0D5950] duration-300 ease-in text-white"
          >
            <IoMdAdd />
            <span>Qo'shish</span>
          </button>
        </div>

        <div className="flex items-center gap-5">
          <button className="text-[18px] border-b-[2px] border-black cursor-pointer leading-5">
            uzb
          </button>

          <button className="text-[18px] border-b-[2px] border-black cursor-pointer leading-5">
            rus
          </button>

          {token ? (
            <button
              onClick={() => dispatch(logoutModalFunction())}
              className="cursor-pointer"
            >
              <HiOutlineLogout className="text-[24px] mt-[3px]" />
            </button>
          ) : (
            <button
              onClick={() => router.push("/auth/login")}
              className="cursor-pointer"
            >
              <FaRegUser className="text-[18px] mt-[3px]" />
            </button>
          )}

          <button type="button" aria-label="Sevimlilar" className="relative">
            <TbShoppingBagHeart className="text-[22px] cursor-pointer" />
            <span className="absolute -top-[15px] -right-[15px] bg-[#636A79] text-white rounded-full text-[14px] px-[6px] font-medium">
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
