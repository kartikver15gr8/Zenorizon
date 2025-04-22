"use client";
import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import Link from "next/link";
import { title } from "process";
import { useState } from "react";

const optionsArr = [
  {
    title: "Search for help…",
    svg: RAW_ICONS.Search,
    redirectHref: "",
    openToNewPage: false,
  },
  {
    title: "Shortcuts",
    svg: RAW_ICONS.Keyboard,
    redirectHref: "",
    openToNewPage: false,
  },
  { title: "Docs", svg: RAW_ICONS.Docs, redirectHref: "", openToNewPage: true },
  {
    title: "Contact us",
    svg: RAW_ICONS.ContactUs,
    redirectHref: "",
    openToNewPage: false,
  },
  {
    title: "Community",
    svg: RAW_ICONS.Community,
    redirectHref: "",
    openToNewPage: true,
  },
];

export const BottomOptionsTile = () => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <>
      {/* Options Button */}
      <div
        className="flex border w-8 h-8 items-center justify-center cursor-pointer rounded-full absolute bottom-2 md:bottom-4 left-4 border-[#414141] hover:bg-[#23252A] transition-all duration-300"
        onClick={() => setOptionsOpen(!optionsOpen)} // Toggle popup visibility
      >
        <SVGIcon className="flex w-5" svgString={RAW_ICONS.Gliter} />
      </div>

      {/* Popup */}
      <div
        className={`absolute bottom-16 left-4 w-52 h-72 bg-[rgba(0,0,0,0.1)] backdrop-blur-lg border border-[#414141] rounded-xl shadow-lg p-1 transition-all duration-300 ${
          optionsOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {optionsArr.map((elem, key) => {
          return (
            <BottomOptionLabel
              key={key}
              svg={elem.svg}
              title={elem.title}
              redirectHref={elem.redirectHref}
              openToNewPage={elem.openToNewPage}
            />
          );
        })}
      </div>
    </>
  );
};

const BottomOptionLabel = ({
  title,
  svg,
  redirectHref,
  openToNewPage,
}: {
  title: string;
  svg: string;
  redirectHref: string;
  openToNewPage: boolean;
}) => {
  return (
    <Link
      href={redirectHref}
      target={openToNewPage ? "_blank" : "_self"}
      className="rounded-lg flex items-center h-9 px-2 gap-x-2 hover:bg-[#1f1f22] transition-all duration-300  border border-transparent hover:border-[#4b4b4b] "
    >
      <SVGIcon className="flex w-4" svgString={svg} />
      <p>{title}</p>
      {openToNewPage && (
        <SVGIcon className="flex w-4" svgString={RAW_ICONS.Arrow45} />
      )}
    </Link>
  );
};
