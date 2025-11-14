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
  const [toggleSidebarMenuPhone, setToggleSidebarMenuPhone] = useState(false);

  const toggleSidebarMenu = () => {
    setSidebarMenu((p) => !p);
  };

  const toggleSidebarMenuPhoneBtn = () => {
    setToggleSidebarMenuPhone((p) => !p);
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
          <div className="relative mt-[70px] w-full">
            <div
              className={`${
                sidebarMenu
                  ? "w-[100px] xl:w-[80px]"
                  : "w-[290px] xl:w-[270px] lg:w-[240px]"
              } fixed z-20 h-[100vh] transition-all duration-300 ease-in bg-sidebar-color md:hidden`}
            >
              <Sidebar sidebarMenu={sidebarMenu} />

              <button
                onClick={toggleSidebarMenu}
                className="group transition-all duration-300 ease-in absolute flex justify-center items-center top-0 -right-[36px] bg-white w-[36px] h-[36px] rounded-r-[10px] hover:bg-bg-color"
              >
                <IoSettingsOutline className="text-[20px] transition-all duration-300 ease-in" />
              </button>
            </div>

            <div className="hidden md:block fixed top-[70px] left-0 right-0 z-20">
              {toggleSidebarMenuPhone && (
                <div className="animate-fadeInDown">
                  <Sidebar sidebarMenu={sidebarMenu} />
                </div>
              )}

              <button
                className={`${
                  toggleSidebarMenuPhone
                    ? "bg-btn-color text-white"
                    : "bg-white"
                } p-2 block mx-auto`}
                onClick={toggleSidebarMenuPhoneBtn}
              >
                <IoSettingsOutline className="text-[20px]" />
              </button>
            </div>

            {/* Main content */}
            <div
              className={`${
                sidebarMenu
                  ? "ml-[100px] xl:ml-[80px] md:ml-0"
                  : "ml-[290px] xl:ml-[270px] lg:ml-[240px] md:ml-0"
              } transition-all duration-300 ease-in min-h-screen py-10 pl-5 xl:pr-3 md:pr-5`}
            >
              {children}
            </div>
          </div>
        </div>

        <Footer />

        <ModalManager />
      </div>
    </Provider>
  );
}

export default Providers;
