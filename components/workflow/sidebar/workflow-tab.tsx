import Image from "next/image";
import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import applogotwo from "@/public/assets/icons/appIconTwo.svg";
import Link from "next/link";

export const WorkflowTab = () => {
  return (
    <div className="flex item-center justify-between h-16 px-2 cursor-pointer">
      <div className="flex items-center gap-x-2 ">
        <Link
          href={"/"}
          className="border w-8 h-8 rounded-xl flex items-center justify-center"
        >
          <Image
            className=" w-6"
            src={applogotwo}
            alt=""
            width={100}
            height={100}
          />
        </Link>
        <div className="flex gap-x-1 items-center">
          <Link href={"/"} className="text-lg font-medium">
            Zenorizon
          </Link>
          <div className="w-4  h-4 flex items-center justify-center  cursor-pointer rounded hover:bg-[#26292f]">
            <SVGIcon className="flex w-4" svgString={RAW_ICONS.ArrowDown} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-1">
        <button className="h-7 w-7 rounded-lg cursor-pointer flex justify-center items-center bg-[#23252A] hover:bg-[#383b43] transition-all duration-200">
          <SVGIcon className="flex w-4 " svgString={RAW_ICONS.Search} />
        </button>
        <button className="h-7 w-7 rounded-lg cursor-pointer flex justify-center items-center bg-[#23252A] hover:bg-[#383b43] transition-all duration-200">
          <SVGIcon className="flex w-4 " svgString={RAW_ICONS.CreateFile} />
        </button>
      </div>
    </div>
  );
};
