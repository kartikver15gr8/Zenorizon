"use client";

import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";

export default function Workspace() {
  return (
    <>
      <div className="w-full  bg-[#0A0A0A] h-screen flex flex-col">
        <div className="flex justify-center items-center gap-x-1 h-10 md:h-12">
          <SVGIcon
            className="flex w-3 sm:w-4"
            svgString={RAW_ICONS.RubiksCube}
          />
          <p className="text-[13px] sm:text-[15px]">Workspace</p>
        </div>
        <div className="flex-grow border border-[#414141] bg-[#0F1111] rounded-lg ml-2 md:ml-0 mr-2 mb-2 p-1">
          <div className="border h-10 rounded border-[#2d3036] flex items-center justify-between px-4">
            <div className=" flex gap-x-2 md:gap-x-4 items-center ">
              {/* top label content */}
            </div>
          </div>
          {/* main content */}
        </div>
      </div>
    </>
  );
}
