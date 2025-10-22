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

function Categories() {
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

  return (
    <div>
      <h1 className="text-[20px] font-semibold">Kategoriyalar</h1>
      <div className="grid grid-cols-4 gap-3 my-5">
        {categoriyaList &&
          categoriyaList?.map((value) => {
            return (
              <Link
                key={value?.id}
                href={`/categories${value?.path}`}
                className="group border-sidebar-btn-color bg-white border-[2px] rounded-[32px] px-3 py-4 flex items-center gap-2 hover:bg-border-color duration-300 ease-in"
              >
                <span className="p-[10px] rounded-full grid place-items-center bg-border-color text-[#272727] group-hover:bg-white duration-300 ease-in">
                  {value?.icon}
                </span>
                <span className="text-[16px] leading-5">
                  {value?.name} {value?.smaylik}
                </span>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Categories;
