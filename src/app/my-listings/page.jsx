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
  const [activeTab, setActiveTab] = useState("approved");

  const tabs = [
    {
      id: "approved",
      name: "Faol",
      icon: <IoMdDoneAll className="" />,
    },

    {
      id: "pending",
      name: "Kutayotgan",
      icon: <HiOutlineRefresh className="" />,
    },
    {
      id: "inactive",
      name: "Nofaol",
      icon: <MdPauseCircleOutline className="" />,
    },

    {
      id: "rejected",
      name: "Rad etilgan",
      icon: <RiCloseCircleLine className="" />,
    },
    // {
    //   id: "unpaid",
    //   name: "To'lanmagan",
    //   icon: <HiOutlineExclamationCircle className="" />,
    // },
  ];

  const memoizedActiveTab = useMemo(() => {
    return activeTab;
  }, [activeTab]);

  const content = () => {
    switch (activeTab) {
      case "approved":
        return <Active activeTab={memoizedActiveTab} />;

      case "pending":
        return <Pending activeTab={memoizedActiveTab} />;

      case "inactive":
        return <Inactive activeTab={memoizedActiveTab} />;

      case "rejected":
        return <Rejected activeTab={memoizedActiveTab} />;

      // case "unpaid":
      //   return <Unpaid />;
      default:
        return <Active activeTab={memoizedActiveTab} />;
    }
  };

  const activeButton = (item) => {
    setActiveTab(item);
  };

  return (
    <div className="">
      <div className="flex items-center h-[48px] justify-between">
        {tabs &&
          tabs?.map((value) => {
            return (
              <button
                onClick={() => activeButton(value?.id)}
                key={value?.id}
                className={`flex items-center w-full justify-center bg-[#F3F4F6] relative gap-2 h-full px-8 hover:bg-white duration-400 ease-out border-b-[2px] border-[#748384] ${
                  activeTab === value.id
                    ? "bg-white text-[#042826] font-semibold before:absolute before:content-[''] before:w-full before:h-[3px] before:bg-[#042826] before:left-0 before:-bottom-[2px]"
                    : "text-[#748384]"
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
