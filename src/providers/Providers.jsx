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
          <div className="relative mt-[70px]">
            <div
              className={`${
                sidebarMenu ? "w-[100px]" : "w-[290px]"
              } fixed z-10 max-h-[70vh] transition-all duration-300 ease-in`}
            >
              <Sidebar sidebarMenu={sidebarMenu} />
              {/* <h1 className="bg-green-900 w-full">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae similique minima, ipsam nulla adipisci quisquam
                magni aliquam quos odit. Ex dolore iste sunt exercitationem
                temporibus officia rem sapiente impedit vel quibusdam deleniti
                maxime, voluptatem accusantium provident ratione corporis nobis
                soluta aperiam ea. Veniam vitae officia nulla ad ab doloribus,
                voluptates ipsam reprehenderit ullam, fuga dolore iusto facere
                possimus tempora tenetur nemo excepturi asperiores explicabo
                quidem neque quos numquam et. Cumque, animi quia accusantium ab
                esse dolore cum voluptates, molestiae qui vel ut corrupti, sint
                repellendus ducimus voluptatibus magnam commodi aperiam deserunt
                eum deleniti itaque adipisci saepe! Rerum ipsam magni
                perspiciatis.
              </h1> */}

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
              } transition-all duration-300 ease-in`}
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
