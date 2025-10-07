"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ children }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-[6px]"
    >
      {children}
    </button>
  );
}
