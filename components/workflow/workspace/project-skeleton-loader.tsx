import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";

export default function ProjectListSkeleton() {
  return (
    <div className="w-full bg-[#0A0A0A] h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-center items-center gap-x-1 h-10 md:h-12">
        <p className="text-[13px] sm:text-[15px]">Projects</p>
      </div>

      {/* Main Content */}
      <div className="flex-grow border border-[#414141] bg-[#0F1111] rounded-lg ml-2 md:ml-0 mr-2 mb-2 p-1">
        {/* Top Bar */}
        <div className="border h-10 rounded border-[#2d3036] flex items-center justify-between px-4">
          <div className="flex gap-x-2 md:gap-x-4 items-center">
            <p className="text-[12px] sm:text-[13px] md:text-[15px]">
              Projects
            </p>
            <div className="flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded bg-[#1C1D21] hover:bg-[#1C1D21] transition-all duration-300">
              <p className="text-[12px] sm:text-[13px] md:text-[15px]">
                All projects
              </p>
            </div>
          </div>
          <div className="flex gap-x-2 md:gap-x-4">
            <div className="flex h-7 items-center gap-x-1 cursor-pointer border border-transparent px-2 rounded hover:bg-[#1C1D21] hover:border-[#2E3035] transition-all duration-300">
              <p className="text-[12px] sm:text-[13px] md:text-[15px]">
                Create project
              </p>
            </div>
          </div>
        </div>

        {/* main content */}

        <div className="h-20 flex items-center justify-center">
          <SVGIcon className="flex w-10 md:w-20" svgString={RAW_ICONS.Loader} />
        </div>
      </div>
    </div>
  );
}
