"use client";
import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import { useState } from "react";

export const UpdatesCard = () => {
  const [hoveredOn, setHoveredOn] = useState<
    "ontrack" | "delayed" | "cancelled" | "nothing"
  >("nothing");

  return (
    <div className="flex flex-col  h-full w-full">
      <p className="text-xl font-medium mt-10">Real-time product updates</p>
      <p className="mt-2 text-[16px] text-[#A8A8A8] w-[90%] xl:w-[80%]">
        Share project status and updates effortlessly with integrated progress
        reports.
      </p>
      {/* Responsive stacking: vertical on mobile, overlay on desktop */}
      <div className="relative mt-8 md:mt-0 w-full md:w-[90%] flex flex-col items-center justify-center md:h-[340px] h-[300px] ">
        {/* Card 3 (bottom) */}
        <div
          onMouseEnter={() => {
            setHoveredOn("cancelled");
          }}
          onMouseLeave={() => {
            setHoveredOn("nothing");
          }}
          className="
            z-10 h-48 p-4 rounded-2xl border border-[#2d2d2f] bg-[#1c1e1f] backdrop-blur-lg text-white
            hover:bg-[#2a2c2e] transition-all duration-300 hover:-translate-y-5
            shadow-[inset_-12px_-18px_74px_0_rgba(0,0,0,0.28)] cursor-pointer
            mb-4 md:mb-0
            absolute bottom-20 left-0 right-0
          "
        >
          <div
            className={
              hoveredOn == "cancelled"
                ? "text-[#f21c1c] transition-all duration-300 font-medium flex items-center gap-1"
                : "text-[#8f9191] transition-all duration-300 font-medium flex items-center gap-1"
            }
          >
            <SVGIcon
              className="flex w-5"
              svgString={
                hoveredOn == "cancelled"
                  ? RAW_ICONS.CrossRed
                  : RAW_ICONS.CrossMono
              }
            />
            <span>Cancelled</span>
          </div>
          <p className="mt-5 text-2xl">We are ready to launch next Thursday</p>
          <div className="absolute bottom-2 text-lg text-[#A8A8A8]">Sep 8</div>
        </div>

        {/* Card 2 (middle) */}
        <div
          onMouseEnter={() => {
            setHoveredOn("delayed");
          }}
          onMouseLeave={() => {
            setHoveredOn("nothing");
          }}
          className="
            z-20 h-48 p-4 rounded-2xl border border-[#2d2d2f] bg-[#1c1e1f] backdrop-blur-lg text-white
            hover:bg-[#2a2c2e] transition-all duration-300 hover:-translate-y-5
            shadow-[inset_-12px_-18px_74px_0_rgba(0,0,0,0.28)] cursor-pointer
            mb-4 md:mb-0
            absolute bottom-10 left-0 right-0
          "
        >
          <div
            className={
              hoveredOn == "delayed"
                ? "text-[#ebe839] transition-all duration-300 font-medium flex items-center gap-1"
                : "text-[#8f9191] transition-all duration-300 font-medium flex items-center gap-1"
            }
          >
            <SVGIcon
              className="flex w-5"
              svgString={
                hoveredOn == "delayed"
                  ? RAW_ICONS.DelayedYellow
                  : RAW_ICONS.DelayedMono
              }
            />
            <span>Delayed</span>
          </div>
          <p className="mt-5 text-2xl">We are ready to launch next Thursday</p>
          <div className="absolute bottom-2 text-lg text-[#A8A8A8]">Aug 8</div>
        </div>

        {/* Card 1 (top) */}
        <div
          onMouseEnter={() => {
            setHoveredOn("ontrack");
          }}
          onMouseLeave={() => {
            setHoveredOn("nothing");
          }}
          className="
            z-30 h-48 p-4 rounded-2xl border border-[#2d2d2f] bg-[#1c1e1f] backdrop-blur-lg text-white
            hover:bg-[#2a2c2e] transition-all duration-300 hover:-translate-y-5
            shadow-[inset_-12px_-18px_74px_0_rgba(0,0,0,0.28)] cursor-pointer
            absolute bottom-0 left-0 right-0
          "
        >
          <div
            className={
              hoveredOn == "ontrack"
                ? "text-[#39eb5f] transition-all duration-300 font-medium flex items-center gap-1"
                : "text-[#8f9191] transition-all duration-300 font-medium flex items-center gap-1"
            }
          >
            <SVGIcon
              className="flex w-5"
              svgString={
                hoveredOn == "ontrack"
                  ? RAW_ICONS.OnTrackGreen
                  : RAW_ICONS.OnTrackMono
              }
            />
            <span>On track</span>
          </div>
          <p className="mt-5 text-2xl">We&apos;re launching the Beta soon!</p>
          <div className="absolute bottom-2 text-lg text-[#A8A8A8]">Jun 18</div>
        </div>
      </div>
    </div>
  );
};
