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
          {/* salomat */}
          <div className="relative mt-[70px] w-full">
            <div
              className={`${
                sidebarMenu ? "w-[100px]" : "w-[290px]"
              } fixed z-10 max-h-[70vh] transition-all duration-300 ease-in`}
            >
              <Sidebar sidebarMenu={sidebarMenu} />

              <button
                onClick={toggleSidebarMenu}
                className="group transition-all duration-300 ease-in absolute flex justify-center items-center top-0 -right-[36px] bg-white w-[36px] h-[36px] rounded-r-[10px] hover:bg-bg-color"
              >
                <IoSettingsOutline className="text-[20px] group-hover:text-white transition-all duration-300 ease-in" />
              </button>
            </div>

            {/* Main content */}
            <div
              className={`${
                sidebarMenu ? "ml-[100px]" : "ml-[290px]"
              } transition-all duration-300 ease-in min-h-screen`}
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
