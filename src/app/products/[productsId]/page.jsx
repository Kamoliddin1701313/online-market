import Image from "next/image";
import { get } from "@/lib/api";
import Loading from "@/components/loading/Loading";
import BackButton from "@/components/backButton/BackButton";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

export const dynamic = "force-dynamic"; // ixtiyoriy: har safar yangilansin desang

async function ProductsId({ params }) {
  // URL dagi ID ni olish (server tomonda avtomatik keladi)
  const { productsId } = params;

  // API dan ma’lumot olish
  //   let product = null;
  try {
    var product = await get(`products/${productsId}`);
  } catch (error) {
    console.error("Xatolik:", error);
  }

  return (
    <>
      {!product ? (
        <Loading />
      ) : (
        <div className="flex flex-col md:flex-row items-start gap-5 justify-between bg-white shadow-lg rounded-2xl p-6">
          <BackButton>
            <HiOutlineArrowNarrowLeft className="mt-1" /> Orqaga
          </BackButton>

          <div className="w-full md:w-1/2 space-y-5">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              {product.title}
            </h1>

            <div className="space-y-5">
              <p className="text-gray-700 text-lg leading-relaxed">
                {product.description}
              </p>

              <div className="border-t border-gray-200 my-4"></div>

              <div className="flex justify-between text-gray-800">
                <span className="font-semibold text-gray-600">💰 Narxi:</span>
                <span className="text-green-600 font-bold">
                  {parseFloat(product.price)}
                </span>
              </div>

              <div className="flex justify-between text-gray-800">
                <span className="font-semibold text-gray-600">
                  📍 Joylashuv:
                </span>
                <span className="text-blue-600">{product.location}</span>
              </div>

              <div className="flex justify-between text-gray-800">
                <span className="font-semibold text-gray-600">
                  👤 Foydalanuvchi:
                </span>
                <span className="text-gray-800">{product.user}</span>
              </div>

              <div className="flex justify-between text-gray-800">
                <span className="font-semibold text-gray-600">🗓 Sana:</span>
                <span className="text-gray-700">
                  {product.created_at
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join(".")}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full mt-3 flex flex-col gap-5">
            {product?.images?.map((img) => {
              const { image, id } = img;
              return (
                <Image
                  key={id}
                  src={image}
                  alt={product?.title || "Mahsulot rasmi"}
                  width={500}
                  height={500}
                  className="rounded-[16px] w-full h-[450px] shadow-md"
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsId;
