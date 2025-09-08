import { get } from "@/lib/api";
import React from "react";

async function Category() {
  const categories = await get("/categories");

  return <div>tttttttttt</div>;
}

export default Category;
