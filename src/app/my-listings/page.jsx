"use client";
import { memo, useMemo, useState } from "react";

import { MdPauseCircleOutline } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { HiOutlineRefresh } from "react-icons/hi";
import { RiCloseCircleLine } from "react-icons/ri";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Active from "./(tabs)/active/page";
import Pending from "./(tabs)/pending/page";
import Unpaid from "./(tabs)/unpaid/page";
import Inactive from "./(tabs)/inactive/page";
import Rejected from "./(tabs)/rejected/page";

function MyListings() {
  const [activeTab, setActiveTab] = useState("active");

  const tabs = [
    {
      id: "active",
      name: "Faol",
      icon: <IoMdDoneAll className="" />,
    },
    {
      id: "inactive",
      name: "Nofaol",
      icon: <MdPauseCircleOutline className="" />,
    },
    {
      id: "pending",
      name: "Kutayotgan",
      icon: <HiOutlineRefresh className="" />,
    },
    {
      id: "rejected",
      name: "Rad etilgan",
      icon: <RiCloseCircleLine className="" />,
    },
    {
      id: "unpaid",
      name: "To'lanmagan",
      icon: <HiOutlineExclamationCircle className="" />,
    },
  ];

  const content = () => {
    switch (activeTab) {
      case "active":
        return <Active />;
      case "pending":
        return <Pending />;
      case "unpaid":
        return <Unpaid />;
      case "inactive":
        return <Inactive />;
      case "rejected":
        return <Rejected />;
      default:
        return <Active />;
    }
  };

  const activeButton = (item) => {
    setActiveTab(item);
  };

  return (
    <div className="py-10 pl-5">
      <div className="flex items-center h-[48px]">
        {tabs &&
          tabs?.map((value) => {
            return (
              <button
                onClick={() => activeButton(value?.id)}
                key={value?.id}
                className={`flex items-center bg-[#F3F4F6] relative gap-2 h-full px-8 hover:bg-white duration-400 ease-out text-[#748384] border-b-[2px] border-[#748384] ${
                  activeTab === value.id
                    ? "bg-white text-[#042826] font-semibold before:absolute before:content-[''] before:w-full before:h-[3px] before:bg-[#042826] before:left-0 before:-bottom-[2px]"
                    : ""
                }`}
              >
                {value?.icon}
                <span>{value?.name}</span>
              </button>
            );
          })}
      </div>
      <div className="my-5">{content()}</div>
    </div>
  );
}

export default memo(MyListings);
