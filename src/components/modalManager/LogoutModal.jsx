"use client";
import { useDispatch } from "react-redux";
import {
  logoutModalFunction,
  removeLocalStorageToken,
} from "@/store/slice/slice";

function LogoutModal() {
  const dispatch = useDispatch();

  return (
    <div className="fixed flex bg-border-color inset-0 justify-center items-center z-50">
      <div className="rounded-xl p-6 w-[400px] shadow-lg bg-[#313b52]">
        <h2 className="text-lg font-bold mb-4 text-white">
          Chiqishni xohlaysizmi?
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(logoutModalFunction())}
            className="px-4 py-2 rounded bg-gray-300"
          >
            Bekor qilish
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("access");
              dispatch(removeLocalStorageToken());
              dispatch(logoutModalFunction());
            }}
            className="px-4 py-2 rounded bg-gray-300"
          >
            Ha, chiqish
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
