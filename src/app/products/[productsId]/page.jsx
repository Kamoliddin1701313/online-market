"use client";
import Image from "next/image";
import { get } from "@/lib/api";
import Loading from "@/components/loading/Loading";
import BackButton from "@/components/backButton/BackButton";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { GrLocation } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Skelton from "@/components/loading/Skelton";

// export const dynamic = "force-dynamic"; // ixtiyoriy: har safar yangilansin desang

function ProductsId() {
  const router = useRouter();
  const [idImg, setIdImg] = useState(0);
  const [findImg, setFindImg] = useState(false);
  const { productsId } = useParams();
  const [product, setProduct] = useState({});

  const getProducts = async () => {
    try {
      const respons = await get(`products/${productsId}`);
      setProduct(respons);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const changeImg = (id) => {
    setIdImg(id);
    setFindImg(true);
  };

  const prevBtn = () => {
    router.back();
  };

  console.log(typeof idImg, "XXXXXX");

  return (
    <>
      {!product ? (
        <Loading />
      ) : (
        <div className="bg-white rounded-[16px] border-[#56565638] border-[2px] shadow-[0_2px_15px_rgba(101,101,101,0.25)] w-full p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-1 text-[20px]">
              <MdOutlineNavigateNext className="mt-1" /> Bosh sahifa
            </Link>

            <button
              onClick={prevBtn}
              className="flex items-center gap-1 text-[20px]"
            >
              <MdOutlineNavigateNext className="mt-1" />
              {product?.subcategory?.title}
            </button>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="w-[650px] h-[300px]">
              {product?.images && product.images.length > 0 ? (
                <Image
                  src={product.images[idImg].image}
                  alt="images"
                  width={650}
                  height={300}
                  className="w-full h-[300px] rounded-[16px] object-cover"
                />
              ) : (
                <div className="h-[300px] overflow-hidden rounded-[16px]">
                  <Skelton />
                </div>
              )}
            </div>

            <div className="flex flex-col w-full gap-[10px]">
              <div className="flex items-center gap-2">
                <button className="py-[6px] px-5 bg-[#10B481] rounded-[12px] text-white">
                  All
                </button>

                <button className="py-[6px] px-5 bg-[#10B481] rounded-[12px] text-white">
                  Verifay
                </button>
              </div>

              <h2 className="text-[20px] font-semibold text-gray-800">
                {product.title}
              </h2>

              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-2 font-semibold text-gray-600 text-[16px]">
                  <span>Narx :</span>
                  <span>{product?.price && parseFloat(product?.price)}</span>
                </div>

                <span className="text-gray-600 font-semibold">
                  {product.created_at &&
                    product.created_at
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join(".")}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[16px] font-semibold text-gray-600">
                <span className="">👤 Foydalanuvchi:</span>
                <span className="">{product.user}</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <button className="w-full py-3 rounded-[12px] bg-sidebar-btn-color px-3 leading-4 text-black font-semibold">
                  Condition: New
                </button>

                <button className="w-full py-3 rounded-[12px] bg-sidebar-btn-color px-3 leading-4 text-black font-semibold">
                  Posted: 2 hours ago
                </button>

                <button className="w-full py-3 rounded-[12px] bg-sidebar-btn-color px-3 leading-4 text-black font-semibold">
                  Status: Active
                </button>
              </div>

              <p className="text-[18px] font-semibold text-gray-800">
                {product.description}
              </p>

              <div className="flex items-center gap-2 text-[18px] font-semibold text-gray-800">
                <span className="flex items-center gap-1">
                  <GrLocation />
                  Manzil :
                </span>
                <span>{product.location}</span>
              </div>
            </div>
          </div>

          <div className="h-[2px] w-full bg-gray-200 mt-4"></div>

          <div>
            <h2 className="text-[20px] font-semibold text-gray-800 mb-4">
              Qo'shimcha mahsulotlar
            </h2>

            <div className="w-full grid grid-cols-3 gap-3 h-[180px]">
              {product && product.images
                ? product.images.map((value, index) =>
                    value?.image ? (
                      <div key={index} className="w-full h-[180px]">
                        <Image
                          src={value.image}
                          onClick={() => changeImg(index)}
                          alt="images"
                          width={200}
                          height={180}
                          className="w-full h-full object-cover rounded-[16px] cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="w-full h-[180px] bg-gray-200 rounded-[16px] animate-pulse flex items-center justify-center"
                      >
                        <span className="text-gray-400">No image</span>
                      </div>
                    )
                  )
                : !product.images && (
                    <div className="w-full h-[180px] bg-gray-200 rounded-[16px] animate-pulse"></div>
                  )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsId;
