"use client";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Image from "next/image";
import google_icon from "../../../../public/icons/google_icon.svg";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { post } from "../../../lib/api";
import { useDispatch } from "react-redux";
import { setLocalStorageToken } from "../../../store/slice/slice";

function Login() {
  const dispatch = useDispatch();

  const pathname = usePathname();
  const router = useRouter();
  const [parolInput, setParolInput] = useState(false); // bu inputdagi ko'z iconkasini true va false qilib beradigan state
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const openParol = () => {
    setParolInput(!parolInput);
  };

  const registrationBtn = () => {
    router.push("/auth/register");
  };

  const loginUser = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await post("login/", login);
      if (data) {
        dispatch(setLocalStorageToken(data));
        alert(`Logindan o'tdingiz ${data?.user?.full_name}`);
        router.push("/");
      } else {
        console.log(data, "error");
      }
    } catch (error) {
      console.log(error.message);
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
            className={`w-full grid place-items-center h-full cursor-pointer
    ${pathname === "/auth/login" ? "border-b-[4px] border-border-color" : ""}`}
          >
            Kirish
          </button>

          <button
            onClick={registrationBtn}
            className={`w-full grid place-items-center hover:border-b-[4px] duration-300 ease-out border-b-[4px] border-transparent hover:border-border-color h-full cursor-pointer`}
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
              onChange={loginUser}
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              className="border p-3 rounded-[12px] border-border-color outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="parol" className="text-black">
              Parol
            </label>
            <input
              onChange={loginUser}
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

          <Link href="/auth/register">
            <span className="inline-block px-2 py-1 rounded">
              Parolni unitdingizmi?
            </span>
          </Link>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-[12px] hover:bg-blue-700"
          >
            Kirish
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
