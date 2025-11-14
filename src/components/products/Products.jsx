"use client";

import { get } from "@/lib/api";

// React icon kutubxonasi
import { MdOutlineMonetizationOn } from "react-icons/md";
import { FaHandshakeSimple } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { BiSliderAlt, BiCategory, BiSortAlt2 } from "react-icons/bi";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import ProductsList from "./productsList/ProductsList";
import Sell from "./Sell";
import Buy from "./Buy";

function Products() {
  const [tabs, setTabs] = useState(null);
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

  const tabPageBtn = (link) => {
    setTabs(link);
  };

  return (
    <div className="flex flex-col xl:pr-4">
      <div className="animate-fadeInDown w-full border-[2px] py-3 px-5 shadow-[0_0_8px_rgba(0,0,0,0.25)] border-[#50505070] rounded-[20px] lg:px-3 lg:rounded-[24px]">
        <div className="flex justify-between items-center xl:overflow-auto xl:no-scrollbar gap-5 xl:gap-3 rounded-[20px]">
          <div className="flex items-center gap-5 xl:gap-3">
            <button
              onClick={() => tabPageBtn("sell")}
              className={`${
                tabs == "sell" ? "bg-btn-color text-white" : ""
              } w-[110px] flex items-center justify-center gap-2.5 rounded-[20px] py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-btn-color hover:text-white duration-300 ease-in lg:py-[6px]`}
            >
              <MdOutlineMonetizationOn />
              <span>Sotish</span>
            </button>

            <button
              onClick={() => tabPageBtn("buy")}
              className={`${
                tabs == "buy" ? "bg-btn-color text-white" : ""
              }  w-[140px] flex items-center justify-center gap-2.5 rounded-[20px] py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-btn-color hover:text-white duration-300 ease-in lg:py-[6px]`}
            >
              <FaHandshakeSimple />
              <span>Sotib olish</span>
            </button>

            <button
              className={`${
                tabs == "dd" ? "bg-btn-color text-white" : ""
              }  w-[110px] flex items-center justify-center gap-2.5 rounded-[20px] py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-btn-color hover:text-white duration-300 ease-in lg:py-[6px]`}
            >
              <SlLocationPin />
              <span>Manzil</span>
            </button>

            <button
              className={`${
                tabs == "cc" ? "bg-btn-color text-white" : ""
              }  w-[160px] flex items-center justify-center gap-2.5 rounded-[20px] py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-btn-color hover:text-white duration-300 ease-in lg:py-[6px]`}
            >
              <BiSliderAlt />
              <span>Narx oralig‘i</span>
            </button>

            <button
              className={`${
                tabs == "bb" ? "bg-btn-color text-white" : ""
              }  w-[110px] flex items-center justify-center gap-2.5 rounded-[20px] py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-btn-color hover:text-white duration-300 ease-in lg:py-[6px]`}
            >
              <BiCategory />
              <span>Ko‘proq</span>
            </button>
          </div>

          <button
            className={`${
              tabs == "aa" ? "bg-btn-color text-white" : ""
            } px-3 flex items-center justify-center gap-2.5 rounded-[20px] py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-btn-color hover:text-white duration-300 ease-in lg:py-[6px]`}
          >
            <BiSortAlt2 />
            <span>Tanlash</span>
          </button>
        </div>
      </div>

      {tabs === null && (
        <div>
          {!productList.length ? (
            <div className="mt-[20%]">
              <Loading />
            </div>
          ) : (
            <ProductsList productList={productList} />
          )}
        </div>
      )}

      {tabs === "sell" && <Sell />}
      {tabs === "buy" && <Buy />}
    </div>
  );
}

export default Products;
