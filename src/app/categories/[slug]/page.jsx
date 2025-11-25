import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import Link from "next/link";
import Image from "next/image";
import noImg from "../../../../public/images/no-img.webp";
import { get } from "@/lib/api";

async function CategoriesDetail({ params }) {
  const { slug } = params;
  const res = await get(`subcategories/?category=${slug}`, {
    cache: "no-store",
  });

  return (
    <>
      <div className="flex flex-col gap-[10px] bg-sidebar-color border-sidebar-btn-color border-[3px] rounded-[24px] p-5 mb-6 xl:p-4 xl:mb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/categories"
            className="flex w-[110px] justify-center items-center gap-[6px] bg-primary-blue border-sidebar-btn-color border-[3px] py-[6px] rounded-[16px] transition-colors"
          >
            <GrFormPreviousLink className="text-[20px] mt-[2px]" />
            <span>Orqaga</span>
          </Link>

          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{res[0]?.category?.name}</h3>
          </div>
        </div>

        <p className="text-gray-700 text-lg mt-2 xl:mt-0">
          {res[0]?.category?.description == ""
            ? "Description bo'sh"
            : res[0]?.category?.description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 items-stretch p-5 bg-sidebar-color border-sidebar-btn-color border-[3px] rounded-[24px] xl:p-4 lg:grid-cols-2 sm:grid-cols-1">
        {res?.map((item) => (
          <Link
            href={`${slug}/${item?.id}`}
            key={item.id}
            className="bg-body-color border-sidebar-btn-color border-[3px] rounded-[24px] p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              {item?.category?.icon == null ? (
                <span className="text-[22px] w-[28px] h-[28px]">🧸</span>
              ) : (
                <div>
                  <Image
                    alt="salom"
                    width={25}
                    height={25}
                    className="w-[25px] h-[25px] object-cover"
                    src={item?.category?.image}
                  />
                </div>
              )}

              <GrFormNext className="text-[20px]" />
            </div>

            <div className="flex items-center mb-3 gap-1">
              <h3 className="text-[16px] font-semibold text-gray-800 line-clamp-1">
                {item.title}
              </h3>

              {item?.category?.icon == null ? (
                <span className="text-[22px] w-[26px] h-[26px]">🧸</span>
              ) : (
                <div>
                  <Image
                    src={item?.category?.icon}
                    alt="salom"
                    width={22}
                    height={22}
                    className="w-[22px] h-[22px] object-cover"
                  />
                </div>
              )}
            </div>

            <Image
              src={item?.image == null ? noImg : item?.image}
              alt={item?.title}
              width={160}
              height={160}
              className="w-full h-[160px] object-cover rounded-[16px] sm:h-[200px]"
            />

            <p className="text-gray-600 line-clamp-1 mt-2">
              {item.description == "" ? "Description bo'sh" : item.description}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}

export default CategoriesDetail;
