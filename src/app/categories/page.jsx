import { get } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaChild,
  FaHome,
  FaCar,
  FaBriefcase,
  FaPaw,
  FaSeedling,
  FaPlug,
  FaConciergeBell,
  FaTshirt,
  FaFootballBall,
  FaGift,
  FaExchangeAlt,
  FaHardHat,
} from "react-icons/fa";

async function Categories() {
  const categoriyaList = [
    {
      id: 1,
      name: "Bolalar dunyosi",
      path: "/kids-zone",
      icon: <FaChild />,
      smaylik: "👶",
    },
    {
      id: 2,
      name: "Ko'chmas mulk",
      path: "/real-estate",
      icon: <FaHome />,
      smaylik: "🏠",
    },
    {
      id: 3,
      name: "Transport",
      path: "/transport",
      icon: <FaCar />,
      smaylik: "🚗",
    },
    {
      id: 4,
      name: "Ish",
      path: "/jobs",
      icon: <FaBriefcase />,
      smaylik: "💼",
    },
    {
      id: 5,
      name: "Hayvonlar",
      path: "/animals",
      icon: <FaPaw />,
      smaylik: "🐾",
    },
    {
      id: 6,
      name: "Uy va bog'",
      path: "/home-garden",
      icon: <FaSeedling />,
      smaylik: "🌳",
    },
    {
      id: 7,
      name: "Elektor jihozlari",
      path: "/electronics",
      icon: <FaPlug />,
      smaylik: "🔌",
    },
    {
      id: 8,
      name: "Xizmatlar",
      path: "/services",
      icon: <FaConciergeBell />,
      smaylik: "🛎️",
    },
    {
      id: 9,
      name: "Moda va stil",
      path: "/fashion",
      icon: <FaTshirt />,
      smaylik: "👕",
    },
    {
      id: 10,
      name: "Xobbi, dam olish, sport",
      path: "/hobbies",
      icon: <FaFootballBall />,
      smaylik: "⚽",
    },
    {
      id: 11,
      name: "Tekinga beraman",
      path: "/free",
      icon: <FaGift />,
      smaylik: "🎁",
    },
    {
      id: 12,
      name: "Ayirboshlash",
      path: "/exchange",
      icon: <FaExchangeAlt />,
      smaylik: "🔄",
    },
    {
      id: 13,
      name: "Quruvchidan",
      path: "/construction",
      icon: <FaHardHat />,
      smaylik: "👷",
    },
  ];

  const res = await get("categories/", {
    cache: "no-store",
  });

  // const category = await res.json();

  // http://olx.digitallaboratory.uz/categories/
  // icon image

  console.log(res, "QQQQQQQQQQQQQQ");

  return (
    <div>
      <h1 className="text-[20px] font-semibold">Kategoriyalar</h1>

      <div className="grid grid-cols-4 gap-[10px] my-5 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1">
        {res &&
          res
            ?.slice()
            .reverse()
            .map((value) => {
              return (
                <Link
                  key={value?.id}
                  href={`/categories/${value?.id}`}
                  className="group border-sidebar-btn-color bg-white border-[2px] rounded-[40px] px-3 py-2 flex items-center gap-[10px] hover:bg-border-color duration-300 ease-in"
                >
                  <div className="w-[50px] h-[50px] rounded-full grid place-items-center bg-sidebar-btn-color text-[#272727] group-hover:bg-white duration-300 ease-in">
                    {value?.image == null ? (
                      <FaCar />
                    ) : (
                      <Image
                        width={25}
                        height={25}
                        src={value?.image}
                        alt="icon"
                        className="w-[25px] h-[25px] object-cover"
                      />
                    )}
                  </div>

                  <div className="text-[16px] leading-5 flex flex-col gap-[6px] sm:gap-1">
                    <span className="font-semibold">{value?.name}</span>
                    {value?.icon == null ? (
                      "👶"
                    ) : (
                      <div>
                        <Image
                          width={22}
                          height={22}
                          src={value?.icon}
                          alt="icon"
                          className="w-[22px] h-[22px] object-cover"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
}

export default Categories;
