"use client";
import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import Image from "next/image";
import applogotwo from "@/public/assets/icons/appIconTwo.svg";
import OptionLabel from "./option-label";
import { BottomOptionsTile } from "./bottom-options-tile";
import { WorkflowTab } from "./workflow-tab";
import { useState } from "react";
import { usePathname } from "next/navigation";

const icons = RAW_ICONS;

const TabActive = "rounded  bg-[#0F1111] border border-[#4b4b4b] ";

interface CollapsedState {
  teams: boolean;
  workspace: boolean;
}

export default function WorkflowSidebar() {
  const [workspaceCollapsed, setWorkspaceCollapsed] = useState(false);
  const [featuresCollapsed, setFeaturesCollapsed] = useState(false);

  const pathname = usePathname();

  const toggleWorkspaceCollapse = () => {
    setWorkspaceCollapsed(!workspaceCollapsed);
  };

  const toggleFeatureCollapse = () => {
    setFeaturesCollapsed(!featuresCollapsed);
  };

  const [collapsed, setCollapsed] = useState<CollapsedState>({
    teams: false,
    workspace: false,
  });

  const toggleSection = (section: keyof CollapsedState) => {
    setCollapsed((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className=" w-72 min-h-screen hidden md:block font-extralight px-2">
      <WorkflowTab />
      <div className="px-1 mt-2">
        <OptionLabel svg={icons.Inbox} optName="Inbox" />
        <OptionLabel svg={icons.Target} optName="My Issues" />
      </div>
      <div className=" mt-4">
        <div
          className="flex px-4 mb-2 cursor-pointer"
          onClick={toggleWorkspaceCollapse}
        >
          <p className="text-sm">Workspace</p>
          <SVGIcon
            className={`flex w-4 transition-transform duration-300 ${
              workspaceCollapsed ? "rotate-180" : "rotate-0"
            }`}
            svgString={icons.ArrowDown}
          />
        </div>
        {/* Workspace Content */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            workspaceCollapsed
              ? "max-h-0 opacity-0"
              : "max-h-[500px] opacity-100"
          }`}
        >
          <div className="space-y-1">
            <OptionLabel
              className={
                pathname.includes("/workflow/project") ? TabActive : ""
              }
              svg={icons.RubiksCube}
              optName="Projects"
            />
            <OptionLabel svg={icons.Members} optName="Members" />
            <OptionLabel svg={icons.Team} optName="Teams" />
          </div>
        </div>
      </div>

      <div className=" mt-4">
        <div className="cursor-pointer" onClick={() => toggleSection("teams")}>
          <div className="flex px-4 mb-2">
            <p className="text-sm">Teams</p>
            <SVGIcon
              className={`flex w-4 transition-transform duration-300 ${
                collapsed.teams ? "rotate-180" : "rotate-0"
              }`}
              svgString={icons.ArrowDown}
            />
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            collapsed.teams ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"
          }`}
        >
          {/* Team's Workspace content */}
          <div
            className="flex px-4 cursor-pointer"
            onClick={() => toggleSection("workspace")}
          >
            <Image
              className="h-5 w-5 mr-2"
              src={applogotwo}
              alt="Proj"
              width={100}
              height={100}
            />
            <p className="text-sm">Workspace</p>
            <SVGIcon
              className={`flex w-4 transition-transform duration-300 ${
                collapsed.workspace ? "rotate-180" : "rotate-0"
              }`}
              svgString={icons.ArrowDown}
            />
          </div>

          {/* Workspace Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              collapsed.workspace
                ? "max-h-0 opacity-0"
                : "max-h-[500px] opacity-100"
            }`}
          >
            <div className="pl-5">
              <OptionLabel svg={icons.Target} optName="Issues" />
              <OptionLabel svg={icons.RubiksCube} optName="Projects" />
              <OptionLabel svg={icons.Eye} optName="Views" />
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-4">
        <div
          onClick={toggleFeatureCollapse}
          className="flex px-4 mb-2 cursor-pointer"
        >
          <p className="text-sm">Features</p>
          <SVGIcon
            className={`flex w-4 transition-transform duration-300 ${
              featuresCollapsed ? "rotate-180" : "rotate-0"
            }`}
            svgString={icons.ArrowDown}
          />
        </div>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            featuresCollapsed
              ? "max-h-0 opacity-0"
              : "max-h-[500px] opacity-100"
          }`}
        >
          <div className="space-y-1">
            <OptionLabel svg={icons.GitHub} optName="GitHub" />
            <OptionLabel svg={icons.Target} optName="Import Issues" />
            <OptionLabel svg={icons.Members} optName="Invite People" />
          </div>
        </div>
      </div>
      <BottomOptionsTile />
    </div>
  );
}
