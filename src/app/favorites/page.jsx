import React from "react";
import { PiSlidersHorizontal } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { LuChartNoAxesColumnIncreasing } from "react-icons/lu";

function Favorites() {
  return (
    <div>
      <div className="p-3 border">
        <button>
          <span>Filter</span> <PiSlidersHorizontal />
        </button>

        <button>Narx oralig'i</button>

        <button>
          <span>Kategoriya</span> <IoIosArrowDown />
        </button>

        <button>
          <span>Tanlash</span> <LuChartNoAxesColumnIncreasing />
        </button>

        <button>Filterlarni tozalash</button>
      </div>
    </div>
  );
}

export default Favorites;
