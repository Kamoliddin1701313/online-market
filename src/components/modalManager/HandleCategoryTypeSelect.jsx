"use client";

import { addProductsModal } from "@/store/slice/slice";
import Link from "next/link";
import { useDispatch } from "react-redux";

function HandleCategoryTypeSelect() {
  const dispatch = useDispatch();

  const backButton = () => {
    dispatch(addProductsModal());
  };

  return (
    <div className="fixed flex bg-sidebar-color inset-0 justify-center items-center z-50">
      <div className="animate-fadeInDown relative w-4/5 max-w-md mx-auto rounded-xl p-8 bg-white shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          Siz kim sifatida kirmoqchisiz?
        </h2>

        <div className="grid grid-cols-1 gap-5">
          {/* Sotib oluvchi */}
          <Link
            onClick={backButton}
            href="/buy"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">🛒</span>
              <div className="text-left">
                <div className="font-semibold text-lg">Sotib oluvchi</div>
                <div className="text-blue-100 text-sm">
                  Mahsulotlar sotib olish
                </div>
              </div>
            </div>
          </Link>

          {/* Sotuvchi */}
          <Link
            onClick={backButton}
            href="/sell"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">💰</span>
              <div className="text-left">
                <div className="font-semibold text-lg">Sotuvchi</div>
                <div className="text-green-100 text-sm">
                  Mahsulotlar joylashtirish
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Bekor qilish */}
        <button
          onClick={backButton}
          className="w-full mt-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg font-medium transition-colors duration-300 border border-gray-300"
        >
          Orqaga qaytish
        </button>
      </div>
    </div>
  );
}

export default HandleCategoryTypeSelect;
