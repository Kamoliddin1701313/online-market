"use client";

import { IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";
import Footer from "@/components/footer/Footer";
import ModalManager from "@/components/modalManager/ModalManager";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { store } from "@/store/store";
import { Provider } from "react-redux";

function Providers({ children }) {
  const [sidebarMenu, setSidebarMenu] = useState(false);
  const toggleSidebarMenu = () => {
    setSidebarMenu((p) => !p);
  };

  return (
    <Provider store={store}>
      <div className="bg-body-color relative">
        <Navbar />

        <div
          className="flex max-w-[1280px] mx-auto"
          style={{ minHeight: "calc(100vh - 70px - 60px)" }}
        >
          {/* Sidebar */}

          <div
            className={`relative mt-[70px] duration-300 ease-in ${
              sidebarMenu ? "w-[6%]" : "w-1/4"
            }`}
          >
            <div
              className={`fixed z-10 max-h-[75vh] overflow-auto duration-300 ease-in ${
                sidebarMenu ? "w-[6%]" : "w-[21%]"
              }`}
            >
              <Sidebar sidebarMenu={sidebarMenu} />
            </div>

            <div
              className={`${
                sidebarMenu ? "left-[14%]" : "left-[29%]"
              } fixed z-10 duration-300 ease-in`}
            >
              <button
                onClick={toggleSidebarMenu}
                className="bg-white w-[38px] h-[38px] rounded-r-[10px] flex justify-center items-center cursor-pointer"
              >
                <IoSettingsOutline className="text-[20px]" />
              </button>
            </div>
          </div>

          {/* Main content */}
          <div
            className={`h-full overflow-auto mt-[70px] duration-300 ease-in ${
              sidebarMenu ? "w-[94%] ml-[2%]" : "w-3/4"
            }`}
          >
            {children}
          </div>
        </div>

        <Footer />

        <ModalManager />
      </div>
    </Provider>
  );
}

export default Providers;
