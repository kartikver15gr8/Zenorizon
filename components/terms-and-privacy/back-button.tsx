import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import Link from "next/link";

export function BackButton() {
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-52 py-4 flex items-center">
      <Link
        href={"/"}
        className="border border-[#3e3c43] bg-[#33333760] hover:bg-[#45414170] transition-all duration-300 pl-3 pr-4 h-8 rounded-full flex items-center gap-x-1 cursor-pointer"
      >
        <SVGIcon
          className="flex w-3 md:w-4 rotate-180"
          svgString={RAW_ICONS.BackArrow}
        />
        <p className="text-[14px] lg:text-[15px] xl:text-[16px]">back</p>
      </Link>
    </div>
  );
}
