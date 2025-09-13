import Image from "next/image";
import React from "react";
import not_found from "../../public/images/note_found.webp";

function NotFound() {
  return (
    <div className="h-[90vh]">
      <Image
        src={not_found}
        className="w-full h-full bg-green-700"
        alt="Page not found illustration"
      />
    </div>
  );
}

export default NotFound;
