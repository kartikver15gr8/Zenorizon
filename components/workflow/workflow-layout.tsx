import SVGIcon from "@/lib/svg-icon";
import React, { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  windowTitle: string;
  windowSvg: string;
}

export const WorkflowLayout: React.FC<WrapperProps> = ({
  children,
  windowTitle,
  windowSvg,
}) => {
  return (
    <div className="w-full  bg-[#0A0A0A] h-screen flex flex-col">
      <div className="flex justify-center items-center gap-x-1 h-10 md:h-12">
        <SVGIcon className="flex w-3 sm:w-4" svgString={windowSvg} />
        <p className="text-[13px] sm:text-[15px]">{windowTitle}</p>
      </div>
      <div className="flex-grow border border-[#414141] bg-[#0F1111] rounded-lg ml-2 md:ml-0 mr-2 mb-2 p-1">
        {children}
      </div>
    </div>
  );
};
