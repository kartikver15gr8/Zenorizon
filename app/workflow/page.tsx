"use client";

import { WorkflowLayout } from "@/components/workflow/workflow-layout";
import { customToast } from "@/lib/custom-toast";
import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import { toast } from "sonner";

export default function Workspace() {
  return (
    <WorkflowLayout windowSvg={RAW_ICONS.RubiksCube} windowTitle="Workspace">
      <div className="border h-10 rounded border-[#2d3036] flex items-center justify-between px-4">
        <div className=" flex gap-x-2 md:gap-x-4 items-center ">
          {/* top label content */}
        </div>
      </div>
      <button className="" onClick={()=>customToast.info({
  title: 'Button clicked!',
  description: 'You just clicked the button!',
})}>click me</button>
    </WorkflowLayout>
  );
}
