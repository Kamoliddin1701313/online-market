// components/CategoryDropdown.jsx
"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (category) => {
    console.log("Tanlangan kategoriya:", category);
    setIsOpen(false);
  };

  const categories = [
    { id: 1, name: "Elektronika" },
    { id: 2, name: "Kiyim-kechak" },
    { id: 3, name: "Uy-ro'zg'or buyumlari" },
    { id: 4, name: "Sport anjomlari" },
    { id: 5, name: "Kitoblar" },
  ];

  return (
    <div className="font-medium">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 border-[2px] border-sidebar-btn-color rounded-xl h-[42px] px-5 bg-white hover:bg-sidebar-btn-color transition-colors"
      >
        <span>Kategoriya</span>
        <IoIosArrowDown
          className={`${
            isOpen ? "-rotate-180" : "rotate-0"
          } mt-1 duration-300 ease-in-out`}
        />
      </button>

      {isOpen && (
        <div className="animate-fadeInDown absolute top-[68px] left-1/3 sm:left-1/4 lg:w-2/5 sm:w-3/5 w-1/4 z-10 border-sidebar-btn-color">
          <ul className="flex flex-col bg-white border-[2px] rounded-xl overflow-hidden shadow-lg">
            {categories.map((category) => (
              <li
                key={category.id}
                className="border-b border-gray-100 last:border-b-0"
              >
                <button
                  onClick={() => handleSelect(category.name)}
                  className="h-[42px] text-[14px] leading-[18px] w-full px-3 text-left hover:bg-body-color transition-colors"
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CategoryDropdown;
