"use client";

import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

// Savatcha uchun kategoriya dropdown komponenti
function CartCategoryDropdown() {
  // DROPDOWN HOLATI: Ochilgan/yopilgan holatini boshqarish
  const [isOpen, setIsOpen] = useState(false);

  // DROPDOWN TOGGLE: Ochish/yopish funksiyasi
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // KATEGORIYA TANLASH: Foydalanuvchi kategoriya tanlaganda ishlaydi
  const handleSelect = (category) => {
    console.log("Tanlangan kategoriya:", category); // Tanlangan kategoriyani konsolga chiqarish
    setIsOpen(false); // Kategoriya tanlangandan so'ng dropdownni yopish
  };

  // KATEGORIYALAR RO'YXATI: Dropdown da ko'rsatiladigan kategoriyalar
  const categories = [
    { id: 1, name: "Elektronika" },
    { id: 2, name: "Kiyim-kechak" },
    { id: 3, name: "Uy-ro'zg'or buyumlari" },
    { id: 4, name: "Sport anjomlari" },
    { id: 5, name: "Kitoblar" },
  ];

  return (
    <div className="font-medium">
      {/* ASOSIY TOGLE BUTTON: Dropdown ni ochish/yopish tugmasi */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 border-[2px] rounded-[14px] h-[42px] px-5 bg-white hover:bg-gray-50 transition-colors"
      >
        <span>Kategoriya</span>
        {/* STRELKA IKONKASI: Dropdown holatiga qarab aylanishi */}
        <IoIosArrowDown
          className={`${
            isOpen ? "-rotate-180" : "rotate-0"
          } mt-1 duration-300 ease-in-out`}
        />
      </button>

      {/* DROPDOWN MENYU: Faqat ochiq holatda ko'rinadi */}
      {isOpen && (
        <div className="absolute top-[64px] left-1/3 sm:left-1/4 lg:w-2/5 sm:w-3/5 w-1/4 z-10">
          {/* KATEGORIYALAR RO'YXATI: Vergul shaklida ko'rsatiladi */}
          <ul className="flex flex-col bg-white border-[2px] rounded-[12px] overflow-hidden shadow-lg">
            {categories.map((category) => (
              <li
                key={category.id}
                className="border-b border-gray-100 last:border-b-0"
              >
                {/* KATEGORIYA TUGMASI: Har bir kategoriyani tanlash uchun */}
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

export default CartCategoryDropdown;
