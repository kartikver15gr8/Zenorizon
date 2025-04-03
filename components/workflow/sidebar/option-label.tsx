import SVGIcon from "@/lib/svg-icon";

export default function OptionLabel({
  svg,
  optName,
  className,
}: {
  svg: string;
  optName: string;
  className?: string;
}) {
  return (
    <div
      className={`${className} cursor-pointer h-8 flex px-4 rounded items-center gap-x-2 hover:bg-[#1d1d21] transition-all duration-200`}
    >
      <div className="">
        <SVGIcon className="flex w-5" svgString={svg} />
      </div>
      <p className="">{optName}</p>
    </div>
  );
}
