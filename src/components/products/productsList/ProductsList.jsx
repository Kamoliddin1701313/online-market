import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import { PiShoppingCartBold } from "react-icons/pi";

function ProductsList({ productList }) {
  return (
    <div className="grid grid-cols-4 gap-3.5 mt-5 animate-fadeInUp xl:grid-cols-3 lg:grid-cols-2 lg:gap-2.5 sm:grid-cols-1">
      {productList?.map((item, index) => (
        <Link
          href={`/products/${item.id}`}
          key={index}
          className="bg-white rounded-[12px] overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="w-full h-[200px] relative">
            <Image
              src={item?.images[0]?.image || "/no-image.png"}
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
                className="bg-body-color rounded-[12px] p-2.5 grid place-items-center cursor-pointer"
              >
                <FaRegHeart className="text-[18px]" />
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  // e.stopPropagation();
                }}
                className="bg-body-color rounded-[12px] p-[8px] cursor-pointer"
              >
                <PiShoppingCartBold className="text-[20px]" />
              </button>
            </div>
          </div>

          <div className="px-4 py-[6px]">
            <button className="bg-sidebar-btn-color cursor-pointer border-[2px] border-[#7a7a7a25] my-2.5 py-1 px-5 text-center rounded-[10px] md:my-1">
              Buy
            </button>

            <h4 className="line-clamp-2 leading-5">{item?.title}</h4>

            <div className="flex items-center justify-between my-2.5 gap-[15px] md:my-2">
              <span className="min-w-[50px]">{parseFloat(item?.price)}</span>
              <span className="line-clamp-1">{item?.location}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default React.memo(ProductsList);
