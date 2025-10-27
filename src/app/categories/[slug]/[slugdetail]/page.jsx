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

  const subcategory = [
    {
      id: 1,
      name: "O'yinchoqlar",
      price: "4000",
      description: "Konstruktorlar, puzzle o'yinlari, stol o'yinlari",
      location: "Toshkent",
    },
    {
      id: 2,
      name: "Bolalar kiyimlari",
      price: "13312",
      description: "Yozgi, qishki kiyimlar, alacasimonlar",
      location: "Samarqand",
    },
    {
      id: 3,
      name: "Aravachalar",
      price: "7500",
      description: "Yurish aravachalari, transport vositalari",
      location: "Buxoro",
    },
    {
      id: 4,
      name: "Go'zallik va badiiy mahsulotlar",
      price: "9200",
      description: "Ranglar, qalamlar, bo'yoqlar va boshqa ijodiy materiallar",
      location: "Andijon",
    },
    {
      id: 5,
      name: "O'quv qurilmalari",
      price: "15400",
      description:
        "Daftarlar, qalamlar, ruchkalar va boshqa yozuv materiallari",
      location: "Farg'ona",
    },
    {
      id: 6,
      name: "Bolalar kitoblari",
      price: "6800",
      description: "Ertaqlar, interaktiv kitoblar, qo'shiq kitoblari",
      location: "Namangan",
    },
    {
      id: 7,
      name: "Bolalar mebellari",
      price: "21000",
      description: "Krovatlar, stollar, o'tiradigan joylar to'plamlari",
      location: "Qashqadaryo",
    },
    {
      id: 8,
      name: "O'yin maydonchasi jihozlari",
      price: "18500",
      description: "Swinglar, sandiqlar, o'yin uylari",
      location: "Surxondaryo",
    },
    {
      id: 9,
      name: "Elektron o'yinlar",
      price: "25500",
      description: "O'yin konsollari, planshetlar, interaktiv o'yinlar",
      location: "Jizzax",
    },
    {
      id: 10,
      name: "Sport anjomlari",
      price: "11200",
      description: "Futbol to'plari, velosipedlar, sport to'plamlari",
      location: "Sirdaryo",
    },
    {
      id: 11,
      name: "Musiqa asboblari",
      price: "32000",
      description: "Gitara, pianino, baraban va boshqa cholg'u asboblari",
      location: "Xorazm",
    },
    {
      id: 12,
      name: "Sog'lom ovqatlar",
      price: "8900",
      description: "Bolalar uchun maxsus ovqatlar va suyuqliklar",
      location: "Navoiy",
    },
    {
      id: 13,
      name: "Tibbiy buyumlar",
      price: "14300",
      description: "Harorat o'lchagich, inhalator, shpris",
      location: "Toshkent viloyati",
    },
    {
      id: 14,
      name: "Xavfsizlik moslamalari",
      price: "27600",
      description: "Kamera, monitor, signalizatsiya",
      location: "Qoraqalpog'iston",
    },
  ];

  const respons = await get(`subcategories/${slugdetail}/products/`, {
    cache: "no-store",
  });

  return (
    <>
      <div className="flex flex-col gap-[10px] bg-[#FFFCF7] border-sidebar-btn-color border-[3px] rounded-[24px] p-5 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href={`/categories/${slug}`}
            className="flex w-fit items-center gap-[6px] bg-[#FFF1F0] border-sidebar-btn-color border-[3px] px-3 py-2 rounded-[16px] hover:bg-[#FFE4E2] transition-colors"
          >
            <GrFormPreviousLink className="text-[20px] mt-[2px]" />
            <span>Orqaga</span>
          </Link>

          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{respons[0]?.subcategory?.title}</h3>
          </div>
        </div>

        <p className="text-gray-700 text-lg mt-2">
          {respons[0]?.subcategory?.description == ""
            ? "Description yo'q"
            : respons[0]?.subcategory?.description}
        </p>
      </div>

      <div className="p-5 bg-white border-sidebar-btn-color border-[3px] rounded-[24px]">
        <h1 className="text-gray-600 text-[20px] font-semibold">
          Natijalar : {respons?.length}
        </h1>

        <div className="grid grid-cols-3 items-stretch gap-4 overflow-hidden mt-3">
          {respons?.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-[#FFF1F0] border-sidebar-btn-color border-[3px] rounded-[24px] hover:shadow-lg transition-shadow"
              >
                <Image
                  src={
                    item?.images[0].image == null
                      ? noImg
                      : item?.images[0].image
                  }
                  alt="Image"
                  width={200}
                  height={200}
                  className="w-full h-[220px] object-cover rounded-t-[24px]"
                />

                <div className="p-3">
                  <h3 className="text-[18px] font-semibold text-gray-800 line-clamp-2">
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
                    <button className="border-sidebar-btn-color border-[3px] rounded-[16px] p-3 hover:bg-gray-50 transition-colors duration-200">
                      <FaRegHeart className="text-[15px]" /> Saqlash
                    </button>

                    <button className="bg-[#FB97A1] border-sidebar-btn-color border-[3px] rounded-[16px] p-3 transition-colors duration-300">
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
