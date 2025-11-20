import { MdShoppingCartCheckout } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { LuChartNoAxesColumnIncreasing } from "react-icons/lu";
import { MdRefresh } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { get } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import CategoryDropdown from "@/components/fovoritesComponents/CategoryDropdown";

// Sevimlilar sahifasi komponenti
async function Favorites() {
  // Server tomondan mahsulotlar ma'lumotlarini olish
  const respons = await get("products/");

  return (
    <div>
      {/* FILTR PANELI: Mahsulotlarni filtrlash va tartiblash uchun tugmalar */}

      <div className="relative">
        <div className="border-[2px] border-sidebar-btn-color rounded-[16px] w-full p-3 overflow-auto no-scrollbar lg:border-none lg:px-0">
          <div className="flex w-[700px] items-center justify-between rounded-xl">
            {/* ASOSIY FILTR TUGMASI: Barcha filtr parametrlarini ochish */}
            <button className="flex items-center justify-center gap-2 h-[42px] w-[100px] border-sidebar-btn-color bg-white border-[2px] rounded-xl font-medium hover:bg-sidebar-btn-color duration-300 ease-in-out">
              <span>Filter</span> <PiSlidersHorizontalBold className="mt-1" />
            </button>

            {/* NARX FILTRI: Mahsulot narxlari oralig'ini belgilash */}
            <button className="flex items-center justify-center gap-2 h-[42px] w-[130px] border-sidebar-btn-color bg-white border-[2px] rounded-xl font-medium hover:bg-sidebar-btn-color duration-300 ease-in-out">
              Narx oralig'i
            </button>

            {/* KATEGORIYA DROPDOWN: Mahsulot kategoriyalari bo'yicha filtrlash */}
            <CategoryDropdown />

            {/* TANLASH TUGMASI: Mahsulotlarni tanlash va solishtirish */}
            <button className="flex items-center justify-center gap-2 h-[42px] w-[110px] border-sidebar-btn-color bg-white border-[2px] rounded-xl font-medium hover:bg-sidebar-btn-color duration-300 ease-in-out">
              <span>Tanlash</span> <LuChartNoAxesColumnIncreasing />
            </button>

            {/* FILTRLARNI TOZALASH: Barcha qo'yilgan filtrlarni olib tashlash */}
            <button className="flex items-center justify-center gap-2 h-[42px] w-[180px] border-sidebar-btn-color bg-white border-[2px] rounded-xl font-medium hover:bg-sidebar-btn-color duration-300 ease-in-out">
              <MdRefresh />
              <span>Filterlarni tozalash</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAHSULOTLAR RO'YXATI: Filtrlangan mahsulotlarni ko'rsatish */}
      <div className="grid grid-cols-3 gap-3.5 mt-5 animate-fadeInUp xl:grid-cols-2 md:gap-2.5 sm:grid-cols-1">
        {/* AGAR MAHSULOTLAR BO'L MASA: Bo'sh sahifa ko'rsatish */}
        {respons?.length === 0 ? (
          <h1>Malumot yo'q</h1>
        ) : (
          /* MAHSULOT KARTALARI: Har bir mahsulotni alohida kartada ko'rsatish */
          respons?.map((item) => (
            <Link
              href={`/`}
              key={item?.id}
              className="bg-white rounded-[12px] overflow-hidden"
            >
              {/* MAHSULOT RASMI: Mahsulotning asosiy rasmi */}
              <div className="w-full h-[180px] relative xl:h-[200px]">
                <Image
                  src={item.images[0]?.image || "/no-image.png"}
                  alt={item?.title}
                  fill
                  className="object-cover"
                />

                {/* LIKE TUGMASI: Mahsulotni sevimlilarga qo'shish/olish */}
                <div className="absolute top-2.5 z-10 right-2.5 flex items-center gap-2.5">
                  <button className="bg-body-color rounded-[12px] p-2.5 grid place-items-center cursor-pointer">
                    <FaRegHeart className="text-[18px]" />
                  </button>
                </div>
              </div>

              {/* MAHSULOT MA'LUMOTLARI: Sarlavha, narx va joylashuv */}
              <div className="px-4 py-2 flex flex-col gap-[6px] lg:px-3">
                {/* MAHSULOT NOMI: Mahsulotning to'liq nomi */}
                <h4 className="line-clamp-2 leading-5 font-semibold">
                  {item?.title}
                </h4>

                {/* MAHSULOT NARXI: Mahsulotning joriy narxi */}
                <span className="min-w-[50px] text-[18px] font-semibold">
                  {parseFloat(item?.price)}
                </span>

                {/* JOYLASHUV: Mahsulot joylashgan manzil */}
                <span className="line-clamp-1 text-[14px] text-[#242323d4] font-semibold">
                  {item?.location}
                </span>

                {/* ACTION TUGMALARI: Savatchaga qo'shish va o'chirish */}
                <div className="flex items-center gap-2">
                  {/* SAVATCHAGA QO'SHISH: Mahsulotni xarid qilish */}
                  <button className="bg-btn-color cursor-pointer text-white my-2.5 rounded-[10px] py-2 px-3 flex items-start justify-center gap-2 lg:text-[14px] lg:gap-[6px] md:gap-1 md:px-2">
                    <MdShoppingCartCheckout className="mt-1 text-[20px] lg:text-[15px]" />
                    <span>Qo'shish</span>
                  </button>

                  {/* O'CHIRISH: Mahsulotni sevimlilardan olib tashlash */}
                  <button className="bg-btn-color cursor-pointer text-white my-2.5 rounded-[10px] py-2 px-3 flex items-start justify-center gap-2 lg:text-[14px] lg:gap-[6px] md:gap-1 md:px-2">
                    <IoCloseSharp className="mt-[2px] text-[22px] text-yellow-600 lg:text-[18px]" />
                    <span>O'chirish</span>
                  </button>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
