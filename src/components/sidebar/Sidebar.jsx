"use client";

import React from "react";
import { FaHome } from "react-icons/fa";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { MdPostAdd } from "react-icons/md";
import { LuFilePlus2 } from "react-icons/lu";
import { FaRegClock } from "react-icons/fa";
import Link from "next/link";

function Sidebar({ sidebarMenu }) {
  const pathname = usePathname();

  const categoriyaData = [
    {
      id: 1,
      name: "Bosh sahifa",
      path: "/",
      icon: <FaHome />,
    },

    {
      id: 2,
      name: "Kategoriyalar",
      path: "/categories",
      icon: <TbAdjustmentsHorizontal />,
    },

    {
      id: 3,
      name: "Sevimlilar",
      path: "/favorites",
      icon: <FaRegHeart />,
    },

    {
      id: 4,
      name: "Savatcha",
      path: "/cart",
      icon: <PiShoppingCartBold />,
    },
  ];

  const sellingData = [
    {
      id: 1,
      name: "E’lon joylash",
      path: "/sell",
      icon: <MdPostAdd />,
    },

    {
      id: 2,
      name: "Mening e’lonlarim",
      path: "/my-listings",
      icon: <TbAdjustmentsHorizontal />,
    },
  ];

  const buyingData = [
    {
      id: 1,
      name: "So‘rovlar",
      path: "/buy",
      icon: <LuFilePlus2 />,
    },

    {
      id: 2,
      name: "Yaqinda ko‘rilganlar",
      path: "/recently-viewed",
      icon: <FaRegClock />,
    },
  ];

  return (
    <div
      className={`flex w-full flex-col h-full ${
        sidebarMenu ? "px-[6px]" : "px-4 xl:px-2"
      }`}
    >
      <span
        className={`${
          !sidebarMenu ? "px-4" : "px-[6px] text-center text-[14px]"
        } my-3 text-bg-color font-semibold duration-300 ease-in`}
      >
        Tanlash
      </span>

      {categoriyaData &&
        categoriyaData?.map((value) => {
          return (
            <Link
              href={value.path}
              prefetch={false}
              key={value?.id}
              className={`${
                !sidebarMenu ? "px-4" : "px-2 justify-center"
              } flex items-center w-full font-semibold h-[45px] mb-2 gap-2.5 cursor-pointer transition-all duration-300 ease-in-out hover:bg-sidebar-btn-color rounded-[8px] hover:text-blue-700
                  ${
                    pathname === `${value.path}`
                      ? "bg-sidebar-btn-color text-blue-700"
                      : ""
                  }`}
            >
              <span className="text-[20px] xl:text-[18px]">{value?.icon}</span>

              {!sidebarMenu ? (
                <span className="text-[16px] transition-all duration-300 ease-in-out xl:text-[15px]">
                  {value.name}
                </span>
              ) : (
                ""
              )}
            </Link>
          );
        })}

      <span
        className={`${
          !sidebarMenu ? "px-4" : "px-[6px] text-center text-[14px]"
        } mb-2 text-bg-color font-semibold duration-300 ease-in`}
      >
        Sotish
      </span>

      {sellingData &&
        sellingData?.map((value) => {
          return (
            <Link
              href={value.path}
              prefetch={false}
              key={value?.id}
              className={`${
                !sidebarMenu ? "px-4" : "px-2 justify-center"
              } flex items-center w-full font-semibold h-[45px] mb-2 gap-2.5 cursor-pointer transition-all duration-300 ease-in-out hover:bg-sidebar-btn-color rounded-[8px] hover:text-blue-700
                  ${
                    pathname === `${value.path}`
                      ? "bg-sidebar-btn-color text-blue-700"
                      : ""
                  }`}
            >
              <span className="text-[20px] xl:text-[18px]">{value?.icon}</span>

              {!sidebarMenu ? (
                <span className="text-[16px] transition-all duration-300 ease-in-out xl:text-[15px]">
                  {value.name}
                </span>
              ) : (
                ""
              )}
            </Link>
          );
        })}

      <span
        className={`${
          !sidebarMenu ? "px-4" : "px-[6px] text-center text-[14px]"
        } mb-2 text-bg-color font-semibold`}
      >
        Sotib olish
      </span>

      {buyingData &&
        buyingData?.map((value) => {
          return (
            <Link
              href={value.path}
              prefetch={false}
              key={value?.id}
              className={`${
                !sidebarMenu ? "px-4" : "px-2 justify-center"
              } flex items-center w-full font-semibold h-[45px] mb-2 gap-2.5 cursor-pointer transition-all duration-300 ease-in-out hover:bg-sidebar-btn-color rounded-[8px] hover:text-blue-700
                  ${
                    pathname === `${value.path}`
                      ? "bg-sidebar-btn-color text-blue-700"
                      : ""
                  }`}
            >
              <span className="text-[20px] xl:text-[18px]">{value?.icon}</span>

              {!sidebarMenu ? (
                <span className="text-[16px] transition-all duration-300 ease-in-out xl:text-[15px]">
                  {value.name}
                </span>
              ) : (
                ""
              )}
            </Link>
          );
        })}
    </div>
  );
}

export default React.memo(Sidebar);
