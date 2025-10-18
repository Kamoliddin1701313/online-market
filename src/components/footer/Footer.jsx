import React from "react";

function Footer() {
  return (
    <div className="h-[100px] w-full bg-bg-color">
      <div className="max-w-[1280px] mx-auto">
        <h1>Footer</h1>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Tepaga
        </button>
      </div>
    </div>
  );
}

export default Footer;
