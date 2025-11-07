"use client";

import { get } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";

function Buy() {
  const [respons, setRespons] = useState([]);
  const getData = async () => {
    const res = await get("buy-requests/");
    setRespons(res);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-3.5 mt-5 animate-fadeInUp">
      {respons &&
        respons?.map((item) => (
          <Link
            href="/"
            key={item?.id}
            className="bg-white rounded-[12px] overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="w-full h-[200px] relative">
              <Image
                src={item?.images[0]?.image || "/no-image.png"}
                alt={item?.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="px-4 py-[6px]">
              <button className="bg-btn-color cursor-pointer text-white my-2.5 rounded-2xl py-1.5 px-5 text-center">
                Buy
              </button>

              <h4 className="line-clamp-2 leading-5">{item?.title}</h4>

              <div className="flex items-center justify-between my-2.5 gap-[15px]">
                <span className="min-w-[50px]">
                  {parseFloat(item?.desired_price)}
                </span>
                <span className="line-clamp-1">{item?.location}</span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Buy;
