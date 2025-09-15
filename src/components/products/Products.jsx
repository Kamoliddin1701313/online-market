"use client";

import { get } from "@/lib/api";
import Image from "next/image";

// React icon kutubxonasi
import { MdOutlineMonetizationOn } from "react-icons/md";
import { FaHandshakeSimple, FaRegHeart } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { BiSliderAlt, BiCategory, BiSortAlt2 } from "react-icons/bi";
import { PiShoppingCartBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
// import Loading from "../loading/Loading";

function Products() {
  // const productList = await get("products/", { cache: "no-store" });
  const [productList, setProductList] = useState([]);

  const fetchProducts = async () => {
    const data = await get("products/");
    setProductList(data);
  };

  useEffect(() => {
    fetchProducts();
    const handleUpdate = () => fetchProducts();
    window.addEventListener("products-updated", handleUpdate);

    return () => window.removeEventListener("products-updated", handleUpdate);
  }, []);

  // if (!productList.length) {
  //   return (
  //     <div className="flex items-center justify-center">
  //       <Loading />
  //     </div>
  //   );
  // }

  return (
    <div className=" flex flex-col">
      <div className="animate-fadeInDown w-full flex justify-between items-center px-5 py-3 border-[2px] shadow-[0_0_8px_rgba(0,0,0,0.25)] border-[#50505070] rounded-[20px]">
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-[#50505070] duration-300 ease-in">
            <MdOutlineMonetizationOn />
            <span>Sotish</span>
          </button>

          <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-[#50505070] duration-300 ease-in">
            <FaHandshakeSimple />
            <span>Sotib olish</span>
          </button>

          <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-[#50505070] duration-300 ease-in">
            <SlLocationPin />
            <span>Manzil</span>
          </button>

          <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-[#50505070] duration-300 ease-in">
            <BiSliderAlt />
            <span>Narx oralig‘i</span>
          </button>

          <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-[#50505070] duration-300 ease-in">
            <BiCategory />
            <span>Ko‘proq</span>
          </button>
        </div>

        <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-[#50505070] duration-300 ease-in">
          <BiSortAlt2 />
          <span>Tanlash</span>
        </button>
      </div>

      {!productList.length ? (
        <div className="mt-[20%]">
          <Loading />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3.5 mt-5 animate-fadeInUp">
          {productList?.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[12px] overflow-hidden"
            >
              <div className="relative w-full h-[200px]">
                <Image
                  src={item.image || "/no-image.png"}
                  alt={item?.title}
                  fill
                  className="object-cover"
                />

                <div className="absolute top-2.5 right-2.5 flex items-center gap-2.5">
                  <button className="bg-bg-color rounded-[12px] p-2.5 grid place-items-center cursor-pointer">
                    <FaRegHeart className="text-[18px]" />
                  </button>

                  <button className="bg-bg-color rounded-[12px] p-[8px] cursor-pointer">
                    <PiShoppingCartBold className="text-[20px]" />
                  </button>
                </div>
              </div>

              <div className="px-4 py-2">
                <button className="bg-bg-color cursor-pointer my-2.5 rounded-2xl py-1.5 px-3.5">
                  Buy
                </button>

                <h4 className="line-clamp-2 leading-5">{item?.title}</h4>

                <div className="flex items-center justify-between my-2.5 gap-[15px]">
                  <span className="min-w-[50px]">{item?.price}</span>
                  <span className="line-clamp-1">{item?.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
