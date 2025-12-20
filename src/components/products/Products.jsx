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
    <div className="flex flex-col">
      <div className="animate-fadeInDown w-full border-[2px] p-3 shadow-[0_0_8px_rgba(0,0,0,0.15)] border-sidebar-btn-color rounded-[20px] md:border-none md:shadow-none md:px-0">
        <div className="flex justify-between items-center xl:overflow-auto xl:no-scrollbar gap-5 xl:gap-3 rounded-[10px]">
          <div className="flex items-center gap-5 xl:gap-3">
            <button
              onClick={() => tabPageBtn("sell")}
              className={`${
                tabs == "sell" ? "bg-btn-color" : ""
              } w-[110px] flex items-center justify-center gap-2.5 rounded-[10px] py-2 cursor-pointer border-[2px] border-[#7a7a7a25] hover:bg-sidebar-btn-color duration-300 ease-in lg:py-[6px]`}
            >
              <MdOutlineMonetizationOn />
              <span>Sotish</span>
            </button>

            <button
              onClick={() => tabPageBtn("buy")}
              className={`${
                tabs == "buy" ? "bg-btn-color" : ""
              }  w-[140px] flex items-center justify-center gap-2.5 rounded-[10px] py-2 cursor-pointer border-[2px] border-[#7a7a7a25] hover:bg-sidebar-btn-color duration-300 ease-in lg:py-[6px]`}
            >
              <FaHandshakeSimple />
              <span>Sotib olish</span>
            </button>

            <button
              className={`${
                tabs == "dd" ? "bg-btn-color" : ""
              }  w-[110px] flex items-center justify-center gap-2.5 rounded-[10px] py-2 cursor-pointer border-[2px] border-[#7a7a7a25] hover:bg-sidebar-btn-color duration-300 ease-in lg:py-[6px]`}
            >
              <SlLocationPin />
              <span>Manzil</span>
            </button>

            <button
              className={`${
                tabs == "cc" ? "bg-btn-color" : ""
              }  w-[160px] flex items-center justify-center gap-2.5 rounded-[10px] py-2 cursor-pointer border-[2px] border-[#7a7a7a25] hover:bg-sidebar-btn-color duration-300 ease-in lg:py-[6px]`}
            >
              <BiSliderAlt />
              <span>Narx oralig‘i</span>
            </button>

            <button
              className={`${
                tabs == "bb" ? "bg-btn-color" : ""
              }  w-[110px] flex items-center justify-center gap-2.5 rounded-[10px] py-2 cursor-pointer border-[2px] border-[#7a7a7a25] hover:bg-sidebar-btn-color duration-300 ease-in lg:py-[6px]`}
            >
              <BiCategory />
              <span>Ko‘proq</span>
            </button>
          </div>

          <button
            className={`${
              tabs == "aa" ? "bg-btn-color" : ""
            } px-3 flex items-center justify-center gap-2.5 rounded-[10px] py-2 cursor-pointer border-[2px] border-[#7a7a7a25] hover:bg-sidebar-btn-color duration-300 ease-in lg:py-[6px]`}
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
