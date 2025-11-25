import { GrFormPreviousLink } from "react-icons/gr";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiEyeLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import noImg from "../../../../../public/images/no-img.webp";
import { get } from "@/lib/api";

async function Page({ params }) {
  const { slugdetail, slug } = params;

  const respons = await get(`subcategories/${slugdetail}/products/`, {
    cache: "no-store",
  });

  return (
    <>
      <div className="flex flex-col gap-[10px] bg-sidebar-color border-sidebar-btn-color border-[3px] rounded-[24px] p-5 mb-6 xl:p-4 xl:mb-4">
        <div className="flex items-center gap-3">
          <Link
            href={`/categories/${slug}`}
            className="flex w-[110px] gap-[6px] bg-primary-blue border-sidebar-btn-color border-[3px] px-3 py-2 rounded-[16px] hover:bg-[#FFE4E2] transition-colors"
          >
            <GrFormPreviousLink className="text-[20px] mt-[2px]" />
            <span>Orqaga</span>
          </Link>

          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{respons[0]?.subcategory?.title}</h3>
          </div>
        </div>

        <p className="text-gray-700 text-lg mt-2 xl:mt-0 sm:text-[16px]">
          {respons[0]?.subcategory?.description == ""
            ? "Description yo'q"
            : respons[0]?.subcategory?.description}
        </p>
      </div>

      <div className="p-5 bg-sidebar-color border-sidebar-btn-color border-[3px] rounded-[24px] lg:p-4">
        <h1 className="text-gray-600 text-[20px] font-semibold sm:text-[18px]">
          Natijalar : {respons?.length}
        </h1>

        <div className="grid grid-cols-3 items-stretch gap-4 overflow-hidden mt-3 lg:grid-cols-2 lg:gap-3 md:gap-2 sm:grid-cols-1 sm:gap-5 pb-5">
          {respons?.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-[#FFF1F0] border-sidebar-btn-color border-[3px] rounded-[24px] hover:shadow-lg transition-shadow"
              >
                <Image
                  src={
                    item?.images[0]?.image == null
                      ? noImg
                      : item?.images[0]?.image
                  }
                  alt="Image"
                  width={200}
                  height={200}
                  className="w-full h-[220px] object-cover rounded-t-[24px]"
                />

                <div className="p-3 md:p-2">
                  <h3 className="text-[18px] font-semibold text-gray-800 line-clamp-2 lg:text-[16px]">
                    {item?.title}
                  </h3>

                  <div className="flex items-center my-3 justify-between">
                    <h3 className="text-[16px] text-gray-600 line-clamp-1">
                      {parseFloat(item?.price)}
                    </h3>
                    <div className="flex items-center gap-1">
                      <HiOutlineLocationMarker />
                      <span className="text-[16px] text-gray-600 line-clamp-1">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-stretch gap-2">
                    <button className="border-sidebar-btn-color border-[3px] rounded-[16px] p-3 bg-border-color text-white transition-colors duration-200">
                      <FaRegHeart className="text-[15px]" /> Saqlash
                    </button>

                    <button className="bg-primary-blue border-sidebar-btn-color border-[3px] rounded-[16px] p-3 transition-colors duration-300 text-white">
                      <RiEyeLine className="text-[16px]" />
                      Ko'rish
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Page;
