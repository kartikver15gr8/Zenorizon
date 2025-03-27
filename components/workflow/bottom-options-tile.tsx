"use client";
import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import { useState } from "react";

const icons = RAW_ICONS;

export const BottomOptionsTile = () => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <>
      {/* Options Button */}
      <div
        className="flex border w-8 h-8 items-center justify-center rounded-full absolute bottom-4 left-4 border-[#414141] hover:bg-[#23252A] transition-all duration-300"
        onClick={() => setOptionsOpen(!optionsOpen)} // Toggle popup visibility
      >
        <SVGIcon className="flex w-5" svgString={icons.Gliter} />
      </div>

      {/* Popup */}
      <div
        className={`absolute bottom-16 left-4 w-60 h-96 bg-[#23252A] border border-[#414141] rounded-lg shadow-lg p-4 transition-all duration-300 ${
          optionsOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <p className="text-white">This is the popup content.</p>
      </div>
    </>
  );
};
