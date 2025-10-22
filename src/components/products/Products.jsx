// import { get } from "@/lib/api";

// // React icon kutubxonasi
// import { MdOutlineMonetizationOn } from "react-icons/md";
// import { FaHandshakeSimple } from "react-icons/fa6";
// import { SlLocationPin } from "react-icons/sl";
// import { BiSliderAlt, BiCategory, BiSortAlt2 } from "react-icons/bi";
// import Loading from "../loading/Loading";
// import ProductsList from "./productsList/ProductsList";

// export const dynamic = "force-dynamic";

// async function Products() {
//   const productList = await get("products/");

//   console.log(productList, "productList");

//   return (
//     <div className="flex flex-col">
//       <div className="animate-fadeInDown w-full flex justify-between items-center px-5 py-3 border-[2px] shadow-[0_0_8px_rgba(0,0,0,0.25)] border-[#50505070] rounded-[20px]">
//         <div className="flex items-center gap-5">
//           <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-[#50505070] duration-300 ease-in">
//             <MdOutlineMonetizationOn />
//             <span>Sotish</span>
//           </button>

//           <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-[#50505070] duration-300 ease-in">
//             <FaHandshakeSimple />
//             <span>Sotib olish</span>
//           </button>

//           <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-[#50505070] duration-300 ease-in">
//             <SlLocationPin />
//             <span>Manzil</span>
//           </button>

//           <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-[#50505070] duration-300 ease-in">
//             <BiSliderAlt />
//             <span>Narx oralig‘i</span>
//           </button>

//           <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-[#50505070] duration-300 ease-in">
//             <BiCategory />
//             <span>Ko‘proq</span>
//           </button>
//         </div>

//         <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-[#50505070] duration-300 ease-in">
//           <BiSortAlt2 />
//           <span>Tanlash</span>
//         </button>
//       </div>

//       {!productList.length ? (
//         <div className="mt-[20%]">
//           <Loading />
//         </div>
//       ) : (
//         <ProductsList productList={productList} />
//       )}
//     </div>
//   );
// }

// export default Products;

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

function Products() {
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

  return (
    <div className="flex flex-col">
      <div className="animate-fadeInDown w-full flex justify-between items-center px-5 py-3 border-[2px] shadow-[0_0_8px_rgba(0,0,0,0.25)] border-[#50505070] rounded-[20px]">
        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-btn-color hover:text-white duration-300 ease-in">
            <MdOutlineMonetizationOn />
            <span>Sotish</span>
          </button>

          <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-btn-color hover:text-white duration-300 ease-in">
            <FaHandshakeSimple />
            <span>Sotib olish</span>
          </button>

          <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-btn-color hover:text-white duration-300 ease-in">
            <SlLocationPin />
            <span>Manzil</span>
          </button>

          <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-btn-color hover:text-white duration-300 ease-in">
            <BiSliderAlt />
            <span>Narx oralig‘i</span>
          </button>

          <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-btn-color hover:text-white duration-300 ease-in">
            <BiCategory />
            <span>Ko‘proq</span>
          </button>
        </div>

        <button className="flex items-center gap-2.5 rounded-[20px] px-3.5 py-2 cursor-pointer border-[2px] border-[#50505070] hover:bg-btn-color hover:text-white duration-300 ease-in">
          <BiSortAlt2 />
          <span>Tanlash</span>
        </button>
      </div>

      {!productList.length ? (
        <div className="mt-[20%]">
          <Loading />
        </div>
      ) : (
        <ProductsList productList={productList} />
      )}
    </div>
  );
}

export default Products;
