"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ children }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="px-4 h-[42px] bg-[#0D5950] text-white flex items-center gap-[6px]"
    >
      {children}
    </button>
  );
}
