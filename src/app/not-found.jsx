import Image from "next/image";
import React from "react";
import not_found from "../../public/images/note_found.webp";

function NotFound() {
  return (
    <div className="h-[90vh] relative">
      <Image
        src={not_found}
        fill
        className="object-cover"
        alt="Page not found illustration"
      />
    </div>
  );
}

export default NotFound;
