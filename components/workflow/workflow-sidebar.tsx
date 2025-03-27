import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import Image from "next/image";
import applogotwo from "@/public/assets/icons/appIconTwo.svg";
import OptionLabel from "./option-label";
import { BottomOptionsTile } from "./bottom-options-tile";
import { WorkflowTab } from "./workflow-tab";

const icons = RAW_ICONS;

export default function WorkflowSidebar() {
  return (
    <div className="border-r border-[#23252A] w-72 min-h-screen hidden md:block">
      {/* Sidebar Content */}
      <WorkflowTab />
      <div className="px-1 mt-2">
        <OptionLabel svg={icons.Inbox} optName="Inbox" />
        <OptionLabel svg={icons.Target} optName="My Issues" />
      </div>
      <div className="px-1 mt-4">
        <div className="flex px-4 mb-2">
          <p className="text-sm">Workspace</p>
          <SVGIcon className="flex w-4" svgString={icons.ArrowDown} />
        </div>
        <OptionLabel svg={icons.Cube} optName="Projects" />
        <OptionLabel svg={icons.Members} optName="Members" />
        <OptionLabel svg={icons.Team} optName="Teams" />
      </div>
      <div className="px-1 mt-4">
        <div className="flex px-4 mb-2">
          <p className="text-sm">Teams</p>
          <SVGIcon className="flex w-4" svgString={icons.ArrowDown} />
        </div>
        <div className="flex px-4">
          <Image
            className="h-5 w-5 mr-2"
            src={applogotwo}
            alt="Proj"
            width={100}
            height={100}
          />
          <p className="text-sm">Workspace</p>
          <SVGIcon className="flex w-4" svgString={icons.ArrowDown} />
        </div>
        <div className="pl-5">
          <OptionLabel svg={icons.Target} optName="Issues" />
          <OptionLabel svg={icons.Cube} optName="Projects" />
          <OptionLabel svg={icons.Eye} optName="Views" />
        </div>
      </div>
      <div className="px-1 mt-4">
        <div className="flex px-4 mb-2">
          <p className="text-sm">Features</p>
          <SVGIcon className="flex w-4" svgString={icons.ArrowDown} />
        </div>
        <OptionLabel svg={icons.GitHub} optName="GitHub" />
        <OptionLabel svg={icons.Target} optName="Import Issues" />
        <OptionLabel svg={icons.Members} optName="Invite People" />
      </div>
      <BottomOptionsTile />
    </div>
  );
}
