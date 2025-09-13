"use client";

import React from "react";
import { FaHome } from "react-icons/fa";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
import { MdPostAdd } from "react-icons/md";
import { VscRequestChanges } from "react-icons/vsc";
import { FaRegClock } from "react-icons/fa";

function Sidebar({ sidebarMenu }) {
  const route = useRouter();
  const pathname = usePathname();

  const categoriyaData = [
    {
      id: 1,
      name: "Bosh sahifa",
      link: "/",
      icon: <FaHome style={{ fontSize: "20px" }} />,
    },

    {
      id: 2,
      name: "Kategoriyalar",
      link: "/categories",
      icon: <TbAdjustmentsHorizontal style={{ fontSize: "20px" }} />,
    },

    {
      id: 3,
      name: "Sevimlilar",
      link: "/favorites",
      icon: <FaRegHeart style={{ fontSize: "20px" }} />,
    },

    {
      id: 4,
      name: "Savatcha",
      link: "/cart",
      icon: <PiShoppingCartBold style={{ fontSize: "20px" }} />,
    },
  ];

  const sellingData = [
    {
      id: 1,
      name: "E’lon joylash",
      link: "/post-ad",
      icon: <MdPostAdd style={{ fontSize: "20px" }} />,
    },

    {
      id: 2,
      name: "Mening e’lonlarim",
      link: "/my-listings",
      icon: <TbAdjustmentsHorizontal style={{ fontSize: "20px" }} />,
    },
  ];

  const buyingData = [
    {
      id: 1,
      name: "So‘rovlar",
      link: "/requests",
      icon: <VscRequestChanges style={{ fontSize: "20px" }} />,
    },

    {
      id: 2,
      name: "Yaqinda ko‘rilganlar",
      link: "/recently-viewed",
      icon: <FaRegClock style={{ fontSize: "20px" }} />,
    },
  ];

  const categoriesDetail = (services) => {
    route.push(`${services}`);
  };

  return (
    <div className={`flex w-full flex-col bg-white`}>
      <span
        className={`${
          !sidebarMenu ? "px-4" : "px-[6px] text-center text-[14px]"
        } my-3 text-bg-color font-semibold duration-300 ease-in`}
      >
        Tanlash
      </span>

      {categoriyaData &&
        categoriyaData?.map((value, index) => {
          const isActiveLink = pathname === `/${value?.link}`;

          return (
            <button
              onClick={() => categoriesDetail(value.link)}
              key={index}
              className={`${
                !sidebarMenu ? "px-4" : "px-2 justify-center"
              } flex items-center w-full h-[50px] gap-2.5 cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#789597ff]
                  ${isActiveLink ? "bg-[#789597ff]" : ""}`}
            >
              <span>{value?.icon}</span>

              {!sidebarMenu ? (
                <span
                  className={`text-[16px] transition-all duration-300 ease-in-out 
    ${!sidebarMenu ? "opacity-100 delay-700" : "opacity-0 hidden"}
  `}
                >
                  {value.name}
                </span>
              ) : (
                ""
              )}
            </button>
          );
        })}

      <span
        className={`${
          !sidebarMenu ? "px-4" : "px-[6px] text-center text-[14px]"
        } my-3 text-bg-color font-semibold duration-300 ease-in`}
      >
        Sotish
      </span>

      {sellingData &&
        sellingData?.map((value, index) => {
          const isActiveLink = pathname === `/${value?.link}`;

          return (
            <button
              onClick={() => categoriesDetail(value.link)}
              key={index}
              className={`${
                !sidebarMenu ? "px-4" : "px-2 justify-center"
              } flex items-center w-full h-[50px] gap-2.5 cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#789597ff] 
                  ${isActiveLink ? "bg-[#789597ff]" : ""}`}
            >
              <span>{value?.icon}</span>
              {!sidebarMenu ? (
                <span className="text-[16px] transition-all duration-300 ease-in-out">
                  {value.name}
                </span>
              ) : (
                ""
              )}
            </button>
          );
        })}

      <span
        className={`${
          !sidebarMenu ? "px-4" : "px-[6px] text-center text-[14px]"
        } my-3 text-bg-color font-semibold`}
      >
        Sotib olish
      </span>

      {buyingData &&
        buyingData?.map((value, index) => {
          const isActiveLink = pathname === `/${value?.link}`;

          return (
            <button
              onClick={() => categoriesDetail(value.link)}
              key={index}
              className={`${
                !sidebarMenu ? "px-4" : "px-2 justify-center"
              } flex items-center w-full h-[50px] gap-2.5 cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#789597ff] 
                  ${isActiveLink ? "bg-[#789597ff]" : ""}`}
            >
              <span>{value?.icon}</span>

              {!sidebarMenu ? (
                <span className="text-[16px] transition-all duration-300 ease-in-out">
                  {value.name}
                </span>
              ) : (
                ""
              )}
            </button>
          );
        })}
    </div>
  );
}

export default React.memo(Sidebar);
