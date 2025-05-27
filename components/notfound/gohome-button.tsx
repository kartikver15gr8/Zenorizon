import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import Link from "next/link";

export default function GoBackBtn() {
  return (
    <Link
      href="/"
      className="
  border border-[#6c7175] w-28 text-sm sm:text-[16px] lg:w-32 h-9 rounded-lg mt-4 sm:mt-6 flex items-center justify-center
  bg-black/30 backdrop-blur-md
  hover:bg-black/10
  transition-all duration-300
"
    >
      <SVGIcon className="flex w-4 lg:w-5" svgString={RAW_ICONS.ArrowLeft} />
      <p>Go back</p>
    </Link>
  );
}
