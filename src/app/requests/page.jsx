import React from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { FiZap } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { GrLocation } from "react-icons/gr";

function Requests() {
  return (
    <div className="border-[2px] border-border-color w-full rounded-[18px] p-5 bg-white">
      <h1 className="text-[20px]">Post Ad-Buy Request</h1>

      <p className="text-border-color">
        Create a buyer request.Blue actions indecate publishing.
      </p>

      <form className="flex flex-col gap-5 my-3">
        <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
          <span className="text-border-color">Title</span>

          <input
            className="h-[42px] border-border-color border-[2px] rounded-[12px] w-full outline-none px-3 mt-2"
            placeholder="Looking for 5 computers, office use"
          />
        </div>

        <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
          <span className="text-border-color">Category</span>

          <div className="group relative">
            <button
              type="button"
              className="w-full h-[42px] border-[2px] rounded-[12px] mt-2 border-border-color flex justify-start items-center px-2 gap-1"
            >
              <span>Electronics</span>
              <IoIosArrowForward className="mt-1 text-[15px]" />
              <span>Computers</span>
              <IoIosArrowDown className="mt-1 text-[18px] group-hover:-rotate-180 duration-300 ease-in-out" />
            </button>

            <ul className="hidden animate-fadeInUpSmoll absolute w-[250px] group-hover:flex flex-col bg-body-color rounded-[12px] overflow-hidden">
              <li className="h-[42px] hover:bg-white p-3 duration-300 ease-in-out cursor-pointer flex items-center">
                Savol 1
              </li>
              <li className="h-[42px] hover:bg-white p-3 duration-300 ease-in-out cursor-pointer flex items-center">
                Savol 2
              </li>
              <li className="h-[42px] hover:bg-white p-3 duration-300 ease-in-out cursor-pointer flex items-center">
                Savol 3
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
          <span className="text-border-color">Budget</span>

          <div className="flex justify-between items-center gap-4 mt-2">
            <input
              className="h-[42px] border-border-color border-[2px] rounded-[12px] w-full outline-none px-3"
              placeholder="Narxini kiriting!!!"
            />

            <div className="group relative w-[180px]">
              <button
                type="button"
                className="w-full gap-[6px] flex justify-start items-center px-2 h-[42px] border-border-color border-[2px] rounded-[12px]"
              >
                <span>Money</span>
                <IoIosArrowDown className="mt-1 text-[18px] group-hover:-rotate-180 duration-300 ease-in-out" />
              </button>
              <ul className="hidden animate-fadeInUpSmoll absolute w-full group-hover:flex flex-col bg-body-color rounded-[12px]">
                <li className="h-[42px] hover:bg-white p-3 duration-300 ease-in-out cursor-pointer flex items-center">
                  Sum
                </li>

                <li className="h-[42px] hover:bg-white p-3 duration-300 ease-in-out cursor-pointer flex items-center">
                  Dollor
                </li>

                <li className="h-[42px] hover:bg-white p-3 duration-300 ease-in-out cursor-pointer flex items-center">
                  Euro
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
            <span className="text-border-color">Deadline</span>
            <div className="w-full h-[42px] border-border-color border-[2px] rounded-[12px] mt-2 overflow-hidden">
              {/* <label htmlFor="data" className="w-full h-full block px-3">
                dd
              </label> */}

              <input
                id="data"
                type="date"
                className="w-full h-full px-3 cursor-pointer outline-none"
              />
            </div>
          </div>

          <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
            <span className="text-border-color">Urgent Request</span>

            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                className="h-[42px] flex items-center gap-[6px] border-border-color bg-body-color border-[2px] rounded-[12px] px-3 py-2"
              >
                <FiZap />
                On
              </button>

              <button
                type="button"
                className="h-[42px] border-border-color border-[2px] rounded-[12px] px-3 py-2 flex items-center"
              >
                Off
              </button>
            </div>
          </div>
        </div>

        <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
          <span className="text-border-color">Description</span>
          <textarea
            name=""
            id=""
            placeholder="Description ..."
            className="w-full resize-none min-h-[160px] border-border-color border-[2px] rounded-[12px] mt-2 px-3 py-2 flex items-center outline-none"
          ></textarea>
        </div>

        <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
          <span className="text-border-color">Attachments (optional)</span>
          <div className="bg-body-color w-full h-[160px] border-border-color border-[2px] rounded-[12px] mt-2">
            <label
              htmlFor="images"
              className="w-full h-full flex items-center justify-center gap-2 cursor-pointer"
            >
              <MdOutlineFileUpload className="text-[22px]" />
              <span>Drag & drop files hero or click to upload</span>
            </label>
            <input id="images" type="file" multiple className="hidden" />
          </div>

          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="h-[120px] bg-[#F3F4F6] rounded-[12px] border-border-color border-[2px] w-full"></div>
            <div className="h-[120px] bg-[#F3F4F6] rounded-[12px] border-border-color border-[2px] w-full"></div>
            <div className="h-[120px] bg-[#F3F4F6] rounded-[12px] border-border-color border-[2px] w-full"></div>
            <div className="h-[120px] bg-[#F3F4F6] rounded-[12px] border-border-color border-[2px] w-full"></div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
            <span className="text-border-color">Loacation</span>
            <div className="w-full h-[42px] border-border-color border-[2px] rounded-[12px] mt-2 overflow-hidden flex justify-between items-center">
              <label
                htmlFor="location"
                className="h-full w-[45px] flex items-center justify-center"
              >
                <GrLocation />
              </label>

              <input
                id="location"
                type="text"
                autoComplete="off"
                placeholder="Samarqand,Uzbekiston"
                className="h-full w-full outline-none"
              />
            </div>
          </div>

          <div className="border-border-color border-[2px] rounded-[18px] w-full p-4">
            <span className="text-border-color">Contact info</span>
            <div className="w-full h-[42px] border-border-color border-[2px] rounded-[12px] mt-2 overflow-hidden flex justify-between items-center">
              <label
                htmlFor="location"
                className="h-full w-[45px] flex items-center justify-center"
              >
                <LuPhoneCall />
              </label>

              <input
                id="location"
                type="text"
                autoComplete="off"
                placeholder="+998 97-777-77-77"
                className="h-full w-full outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end w-full">
          <button
            type="submit"
            className="bg-[#2563EA] text-white h-[42px] rounded-[12px] w-[200px]"
          >
            Post Request
          </button>
        </div>
      </form>
    </div>
  );
}

export default Requests;
