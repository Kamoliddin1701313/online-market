import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import LogoutModal from "./LogoutModal";
import AddProductsModal from "./AddProductsModal";

function ModalManager() {
  const logoutFunction = useSelector((state) => state.cart.logoutModal);
  const addProductsFunction = useSelector((state) => state.cart.addProducts);

  useEffect(() => {
    if (logoutFunction) {
      document.body.classList.add("overflow-hidden");
    } else if (addProductsFunction) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [logoutFunction, addProductsFunction]);

  console.log(addProductsFunction, "sss");

  return (
    <>
      {logoutFunction && <LogoutModal />}
      {addProductsFunction && <AddProductsModal />}
    </>
  );
}

export default ModalManager;
