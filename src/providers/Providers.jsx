"use client";
import Footer from "@/components/footer/Footer";
import ModalManager from "@/components/modalManager/ModalManager";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { store } from "@/store/store";
import { Provider } from "react-redux";

function Providers({ children }) {
  return (
    <Provider store={store}>
      <div className="bg-body-color relative">
        <Navbar />

        <div
          className="flex max-w-[1280px] mx-auto"
          style={{ minHeight: "calc(100vh - 70px - 60px)" }}
        >
          {/* Sidebar */}
          <div className="w-1/4 h-full sticky top-[70px] overflow-auto max-h-[75vh] bg-white">
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="w-3/4 h-full overflow-auto mt-[70px]">{children}</div>
        </div>

        <Footer />

        <ModalManager />
      </div>
    </Provider>
  );
}

export default Providers;
