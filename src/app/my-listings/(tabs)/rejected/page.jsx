"use client";
import LoadingCircul from "@/components/loading/LoadingCircul";
import Skelton from "@/components/loading/Skelton";
import { get } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";

function Rejected({ activeTab }) {
  const [active, setActive] = useState([]);
  const [productsList, setProductsList] = useState(true);

  const getActiveData = async () => {
    try {
      var product = await get(`products/?status=${activeTab}`);
      if (product) {
        setActive(product);
        setProductsList(false);
      }
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  useEffect(() => {
    getActiveData();
  }, [activeTab]);

  return (
    <>
      {productsList ? (
        <div className="grid place-items-center w-full h-[60vh]">
          <LoadingCircul />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3.5 mt-5 animate-fadeInUp">
          {active?.length === 0 ? (
            <h1>Malumot yo'q</h1>
          ) : (
            active?.map((item, index) => (
              <Link
                href={`/products/${item.id}`}
                key={index}
                className="bg-white rounded-[12px] overflow-hidden"
              >
                <div className="w-full h-[200px] relative">
                  <Image
                    src={item.image || "/no-image.png"}
                    alt={item?.title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute top-2.5 z-10 right-2.5 flex items-center gap-2.5">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // e.stopPropagation();
                      }}
                      className="bg-bg-color rounded-[12px] p-2.5 grid place-items-center cursor-pointer"
                    >
                      <FaRegHeart className="text-[18px]" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // e.stopPropagation();
                      }}
                      className="bg-bg-color rounded-[12px] p-[8px] cursor-pointer"
                    >
                      <PiShoppingCartBold className="text-[20px]" />
                    </button>
                  </div>
                </div>

                <div className="px-4 py-2">
                  <button className="bg-bg-color cursor-pointer text-white my-2.5 rounded-2xl py-1.5 px-5 text-center">
                    Buy
                  </button>

                  <h4 className="line-clamp-2 leading-5">{item?.title}</h4>

                  <div className="flex items-center justify-between my-2.5 gap-[15px]">
                    <span className="min-w-[50px]">{item?.price}</span>
                    <span className="line-clamp-1">{item?.location}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </>
  );
}

export default Rejected;
