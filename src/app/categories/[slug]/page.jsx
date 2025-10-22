import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import Link from "next/link";
import Image from "next/image";
import telefon from "../../../../public/images/iphone.webp";

function CategoriesDetail({ params }) {
  const { slug } = params;

  const subcategory = [
    {
      id: 1,
      smaylik: "🧸",
      title: "O'yinchoqlar",
      description: "Konstruktorlar, puzzle o'yinlari, stol o'yinlari",
      img: "/images/toys.jpg",
    },
    {
      id: 2,
      smaylik: "👕",
      title: "Bolalar kiyimlari",
      description: "Yozgi, qishki kiyimlar, alacasimonlar",
      img: "/images/kids-clothes.jpg",
    },
    {
      id: 3,
      smaylik: "🚗",
      title: "Aravachalar",
      description: "Yurish aravachalari, transport vositalari",
      img: "/images/strollers.jpg",
    },
    {
      id: 4,
      smaylik: "🎨",
      title: "Go'zallik va badiiy mahsulotlar",
      description: "Ranglar, qalamlar, bo'yoqlar va boshqa ijodiy materiallar",
      img: "/images/art-supplies.jpg",
    },
    {
      id: 5,
      smaylik: "📚",
      title: "O'quv qurilmalari",
      description:
        "Daftarlar, qalamlar, ruchkalar va boshqa yozuv materiallari",
      img: "/images/school-supplies.jpg",
    },
    {
      id: 6,
      smaylik: "📖",
      title: "Bolalar kitoblari",
      description: "Ertaqlar, interaktiv kitoblar, qo'shiq kitoblari",
      img: "/images/kids-books.jpg",
    },
    {
      id: 7,
      smaylik: "🛏️",
      title: "Bolalar mebellari",
      description: "Krovatlar, stollar, o'tiradigan joylar to'plamlari",
      img: "/images/kids-furniture.jpg",
    },
    {
      id: 8,
      smaylik: "🎪",
      title: "O'yin maydonchasi jihozlari",
      description: "Swinglar, sandiqlar, o'yin uylari",
      img: "/images/playground.jpg",
    },
    {
      id: 9,
      smaylik: "🎮",
      title: "Elektron o'yinlar",
      description: "O'yin konsollari, planshetlar, interaktiv o'yinlar",
      img: "/images/electronic-games.jpg",
    },
  ];

  console.log(slug);

  return (
    <div className="">
      <div className="flex flex-col gap-[10px] bg-[#FFFCF7] border-sidebar-btn-color border-[3px] rounded-[24px] p-5 mb-8">
        <div className="flex items-center gap-3">
          <Link
            href="/categories"
            className="flex w-fit items-center gap-[6px] bg-[#FFF1F0] border-sidebar-btn-color border-[3px] px-3 py-2 rounded-[16px] hover:bg-[#FFE4E2] transition-colors"
          >
            <GrFormPreviousLink className="text-[20px] mt-[2px]" />
            <span>Orqaga</span>
          </Link>

          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Bolalar dunyosi</h3>
          </div>
        </div>

        <p className="text-gray-700 text-lg mt-2">
          Bolalar uchun o'yinchoqlar, kiyimlar, kitoblar va boshqa mahsulotlarni
          bu yerdan toping
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 items-stretch p-5 bg-white border-sidebar-btn-color border-[3px] rounded-[24px]">
        {subcategory.map((item) => (
          <div
            key={item.id}
            className="bg-[#FFF1F0] border-sidebar-btn-color border-[3px] rounded-[24px] p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-[22px]">{item.smaylik}</span>
              <Link href="/">
                <GrFormNext className="text-[20px]" />
              </Link>
            </div>

            <div className="flex items-center mb-3 gap-1">
              <h3 className="text-[16px] font-semibold text-gray-800 line-clamp-1">
                {item.title}
              </h3>
              <span className="text-[20px]">{item.smaylik}</span>
            </div>

            <Image
              src={telefon}
              alt="Image"
              className="w-full h-[160px] object-cover rounded-[16px]"
            />

            <p className="text-gray-600 line-clamp-1 mt-2">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesDetail;
