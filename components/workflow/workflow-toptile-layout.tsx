import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import Link from "next/link";
import React, { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  tileTitle: string;
  windowSvg: string;
  tileBtnList: {
    btnTitle: string;
    btnSvg: string;
    redirectHref: string;
    isActive?: boolean;
    variant: "redirect" | "normal";
    className?: string;
  }[];
}

export const WorkflowToptileLayout: React.FC<WrapperProps> = ({
  children,
  tileTitle,
  windowSvg,
  tileBtnList,
}) => {
  return (
    <div className="border h-10 rounded border-[#2d3036] flex items-center justify-between px-4">
      <div className=" flex gap-x-2 items-center ">
        <Link
          href={`/workflow/${tileTitle.toLowerCase()}`}
          className="flex items-center rounded text-[12px] sm:text-[13px] md:text-[15px] border border-transparent  hover:border-[#2E3035] px-2 h-7  hover:bg-[#1C1D21] transition-all duration-300"
        >
          {tileTitle}
        </Link>

        {tileBtnList.map((elem, key) => {
          return (
            <TopTileButton
              key={key}
              btnTitle={elem.btnTitle}
              btnSvg={elem.btnSvg}
              variant={elem.variant}
              redirectHref={elem.redirectHref}
              isActive={elem.isActive}
              className={elem.className}
            />
          );
        })}
      </div>
      <div className="flex gap-x-2 md:gap-x-4 ">
        <div className="flex h-7 items-center gap-x-1 cursor-pointer border border-transparent  px-2 rounded-lg hover:bg-[#1C1D21] hover:border-[#2E3035] transition-all duration-300">
          <SVGIcon className="flex w-5" svgString={RAW_ICONS.SideBar} />
        </div>
      </div>
    </div>
  );
};

const activeTab =
  "flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded bg-[#1C1D21] hover:bg-[#1C1D21] transition-all duration-300";
const inactiveTab =
  "flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded  bg-[#0F1111] hover:bg-[#1C1D21] transition-all duration-300";

export const TopTileButton = ({
  btnTitle,
  btnSvg,
  redirectHref,
  isActive,
  variant,
  className,
}: {
  btnTitle: string;
  btnSvg: string;
  redirectHref: string;
  isActive?: boolean;
  variant: "redirect" | "normal";
  className?: string;
}) => {
  return variant == "normal" ? (
    <div className={`${className} ${isActive ? activeTab : inactiveTab}`}>
      <SVGIcon className="flex w-4" svgString={btnSvg} />
      <p className="text-[12px] sm:text-[13px] md:text-[15px]">{btnTitle}</p>
    </div>
  ) : (
    <Link
      href={redirectHref}
      className={`${className} ${isActive ? activeTab : inactiveTab}`}
    >
      <SVGIcon className="flex w-4" svgString={btnSvg} />
      <p className="text-[12px] sm:text-[13px] md:text-[15px]">{btnTitle}</p>
    </Link>
  );
};
