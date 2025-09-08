import { FaHome } from "react-icons/fa";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";

function Sidebar() {
  const route = useRouter();
  const pathname = usePathname();

  const categoriyaData = [
    {
      id: 1,
      name: "Home",
      link: "/",
      icon: <FaHome style={{ fontSize: "20px" }} />,
    },

    {
      id: 2,
      name: "Categoriya",
      link: "categoriya",
      icon: <TbAdjustmentsHorizontal style={{ fontSize: "20px" }} />,
    },

    {
      id: 3,
      name: "Sevimli",
      link: "sevimli",
      icon: <FaRegHeart style={{ fontSize: "20px" }} />,
    },

    {
      id: 4,
      name: "Savatcha",
      link: "savatcha",
      icon: <PiShoppingCartBold style={{ fontSize: "20px" }} />,
    },

    {
      id: 5,
      name: "Savatcha",
      link: "savatcha",
      icon: <PiShoppingCartBold style={{ fontSize: "20px" }} />,
    },

    {
      id: 6,
      name: "Savatcha",
      link: "savatcha",
      icon: <PiShoppingCartBold style={{ fontSize: "20px" }} />,
    },

    {
      id: 7,
      name: "Savatcha",
      link: "savatcha",
      icon: <PiShoppingCartBold style={{ fontSize: "20px" }} />,
    },

    {
      id: 1,
      name: "Home",
      link: "/",
      icon: <FaHome style={{ fontSize: "20px" }} />,
    },

    {
      id: 2,
      name: "Categoriya",
      link: "categoriya",
      icon: <TbAdjustmentsHorizontal style={{ fontSize: "20px" }} />,
    },

    {
      id: 3,
      name: "Sevimli",
      link: "sevimli",
      icon: <FaRegHeart style={{ fontSize: "20px" }} />,
    },

    {
      id: 4,
      name: "Savatcha",
      link: "savatcha",
      icon: <PiShoppingCartBold style={{ fontSize: "20px" }} />,
    },

    {
      id: 5,
      name: "Savatcha",
      link: "savatcha",
      icon: <PiShoppingCartBold style={{ fontSize: "20px" }} />,
    },

    {
      id: 6,
      name: "Savatcha",
      link: "savatcha",
      icon: <PiShoppingCartBold style={{ fontSize: "20px" }} />,
    },

    {
      id: 7,
      name: "Savatcha",
      link: "savatcha",
      icon: <PiShoppingCartBold style={{ fontSize: "20px" }} />,
    },
  ];

  const categoriesDetail = (services) => {
    route.push(`/${services}`);
  };

  return (
    <div className="relative">
      <div className={`flex flex-col gap-2.5`}>
        {categoriyaData &&
          categoriyaData?.map((value, index) => {
            const isActiveLink = pathname === `/${value?.link}`;

            return (
              <button
                onClick={() => categoriesDetail(value.link)}
                key={index}
                className={`flex items-center w-full py-2.5 px-4 gap-2.5 cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#789597ff]
                    
                  ${isActiveLink ? "bg-[#789597ff]" : ""}
                  
                  `}
              >
                <span>{value?.icon}</span>

                <span className="text-[18px] transition-all duration-300 ease-in-out">
                  {value.name}
                </span>
              </button>
            );
          })}
      </div>

      {/* <button className="absolute top-0 bg-[#E3E3E3] w-[32px] h-[36px] rounded-r-[10px] flex justify-center items-center cursor-pointer">
        <IoSettingsOutline className="text-[20px]" />
      </button> */}
    </div>
  );
}

export default Sidebar;
