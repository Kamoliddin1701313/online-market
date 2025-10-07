"use client";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Image from "next/image";
import google_icon from "../../../../public/icons/google_icon.svg";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { post } from "../../../lib/api";
import Loading from "@/components/loading/Loading";

function Register() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sendEmailParol, setSendEmailParol] = useState(false);
  const [parolInput, setParolInput] = useState(false); // bu inputdagi ko'z iconkasini true va false qilib beradigan state
  const [login, setLogin] = useState({
    email: "",
    full_name: "",
    password: "",
    code: "",
  });

  const openParol = () => {
    setParolInput(!parolInput);
  };

  const loginBtn = () => {
    router.push("/auth/login");
  };

  const registerUser = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!sendEmailParol) {
        const data = await post("register/", login);
        alert("emailingizga kod yuborildi");
        setLoading(false);
        setSendEmailParol(true);
      } else {
        const verify_code = await post("verify-email/", {
          email: login.email,
          code: login.code,
        });

        if (verify_code) {
          alert("Email muvaffaqiyatli tasdiqlandi!");
          // setLoading(false);
          router.push("/");
        } else {
          alert("Kod noto‘g‘ri!");
        }
      }
    } catch (err) {
      console.error("Xatolik:", err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white z-50">
      <div className="bg-white text-black w-2/5 p-6 rounded-lg shadow-lg flex flex-col gap-5">
        <button className="cursor-pointer flex items-center gap-2.5 mx-auto border-[1px] border-border-color rounded-xl w-full justify-center p-3">
          <Image
            src={google_icon}
            alt="google_icon"
            className="w-[28px] h-[28px]"
          />

          <span className="text-[20px] text-gry font-semibold">
            Google orqali kirish
          </span>
        </button>

        <div className="flex items-center border-b-[1px] h-[50px] border-border-color justify-between">
          <button
            onClick={loginBtn}
            className={`w-full grid place-items-center h-full cursor-pointer hover:border-border-color border-b-[4px] border-transparent`}
          >
            Kirish
          </button>

          <button
            // onClick={RegistrationBtn}
            className={`w-full grid place-items-center duration-300 ease-out border-b-[4px] h-full cursor-pointer  ${
              pathname === "/auth/register"
                ? "border-b-[4px] border-border-color"
                : ""
            }`}
          >
            Ro'yxatdan o'tish
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-black">
              Email
            </label>

            <input
              onChange={registerUser}
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              className="border p-3 rounded-[12px] border-border-color outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="full_name" className="text-black">
              Familiya
            </label>

            <input
              onChange={registerUser}
              id="full_name"
              name="full_name"
              type="text"
              placeholder="Familiya"
              className="border p-3 rounded-[12px] border-border-color outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="parol" className="text-black">
              Parol
            </label>
            <input
              onChange={registerUser}
              name="password"
              id="parol"
              type={`${parolInput ? "text" : "password"}`}
              placeholder="Parol"
              className="border p-3 rounded-[12px] border-border-color outline-none"
            />

            <button
              type="button"
              className="absolute right-3 top-[60%]"
              onClick={openParol}
            >
              {parolInput ? (
                <AiOutlineEye className="cursor-pointer text-[18px]" />
              ) : (
                <AiOutlineEyeInvisible className="cursor-pointer text-[18px]" />
              )}
            </button>
          </div>

          {sendEmailParol ? (
            <div className="flex flex-col gap-2">
              <input
                onChange={registerUser}
                name="code"
                type="text"
                placeholder="code ..."
                className="border p-3 rounded-[12px] border-border-color outline-none"
              />
            </div>
          ) : (
            ""
          )}

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white py-3 rounded-[12px] hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <Loading /> : "Ro'yxatdan o'tish"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
