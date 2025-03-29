"use client";

import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import { useState } from "react";

const icons = RAW_ICONS;

type activePopupProp = "profile" | "workflow" | "features" | "teams" | "none";

const dockOptionActive =
  "flex items-center justify-center gap-x-1 bg-[#414141] h-10 rounded-full cursor-pointer";
const dockOptionInactive =
  "flex items-center justify-center gap-x-1  h-10 rounded-full cursor-pointer";

export default function BottomDock() {
  const [windowActive, setWindowActive] = useState(false);
  const [activePopup, setActivePopup] = useState<activePopupProp>("none"); // Tracks which popup is active

  return (
    <>
      {/* Bottom Dock */}
      <div className="fixed bottom-2 w-full h-12 px-2 md:hidden md:pointer-events-none flex justify-center">
        <div className="border border-[#414141] relative h-12 rounded-full gap-x-1 items-center px-1 w-[350px] grid grid-cols-4 bg-black">
          {/* Profile Option */}
          <div
            className={
              activePopup == "profile" ? dockOptionActive : dockOptionInactive
            }
            onClick={() => {
              setActivePopup("profile");
            }}
          >
            <SVGIcon className="flex w-4" svgString={icons.ZenorizonLogo} />
            <p className="text-xs">Profile</p>
          </div>

          {/* Workflow Option */}
          <div
            className={
              activePopup == "workflow" ? dockOptionActive : dockOptionInactive
            }
            onClick={() => {
              setActivePopup("workflow");
            }}
          >
            <SVGIcon className="flex w-4" svgString={icons.Cube} />
            <p className="text-xs">Workflow</p>
          </div>

          {/* Teams Option */}
          <div
            className={
              activePopup == "teams" ? dockOptionActive : dockOptionInactive
            }
            onClick={() => {
              setActivePopup("teams");
            }}
          >
            <SVGIcon className="flex w-4" svgString={icons.Members} />
            <p className="text-xs">Teams</p>
          </div>

          {/* Features Option */}
          <div
            className={
              activePopup == "features" ? dockOptionActive : dockOptionInactive
            }
            onClick={() => setActivePopup("features")}
          >
            <SVGIcon className="flex w-4" svgString={icons.Gliter} />
            <p className="text-xs">Features</p>
          </div>
        </div>
      </div>

      {/* Popup Windows */}
      {activePopup == "profile" && (
        <div className=" w-full  fixed bottom-16 flex justify-center md:pointer-events-none md:hidden ">
          <ProfileWindow setClose={setActivePopup} />
        </div>
      )}
      {activePopup == "workflow" && (
        <div className=" w-full fixed bottom-16 flex justify-center md:pointer-events-none md:hidden ">
          <WorkflowWindow setClose={setActivePopup} />
        </div>
      )}
      {activePopup == "teams" && (
        <div className=" w-full fixed bottom-16 flex justify-center md:pointer-events-none md:hidden ">
          <TeamsWindow setClose={setActivePopup} />
        </div>
      )}
      {activePopup == "features" && (
        <div className=" w-full fixed bottom-16 flex justify-center md:pointer-events-none md:hidden ">
          <FeaturesWindow setClose={setActivePopup} />
        </div>
      )}
    </>
  );
}

const ProfileWindow = ({
  setClose,
}: {
  setClose: React.Dispatch<React.SetStateAction<activePopupProp>>;
}) => {
  return (
    <div className="fixed bottom-16 transform w-[350px] md:hidden md:pointer-events-none bg-[rgba(0,0,0,0.1)] backdrop-blur-lg border border-[#414141] rounded-lg shadow-lg p-2 transition-all duration-300">
      {/* Popup Content */}
      <p className="text-white ">Profile</p>
      <div className="grid grid-cols-2 gap-x-2 mt-2">
        <DockOptions svg={icons.Target} optName="Inbox" />
        <DockOptions svg={icons.Target} optName="My Issues" />
      </div>

      {/* Close Button */}
      <button
        onClick={() => setClose("none")}
        className="absolute top-1 right-1 rounded-lg bg-[#e2e2e4] hover:bg-[#d1d1d3] transition-colors duration-200"
      >
        <SVGIcon className="" svgString={icons.Close} />
      </button>
    </div>
  );
};
const WorkflowWindow = ({
  setClose,
}: {
  setClose: React.Dispatch<React.SetStateAction<activePopupProp>>;
}) => {
  return (
    <div className="fixed bottom-16 transform w-[350px] md:hidden md:pointer-events-none bg-[rgba(0,0,0,0.1)] backdrop-blur-lg border border-[#414141] rounded-lg shadow-lg p-2 transition-all duration-300">
      {/* Popup Content */}
      <p className="text-white ">Workflow</p>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-2">
        <DockOptions svg={icons.Cube} optName="Projects" />
        <DockOptions svg={icons.Members} optName="Members" />
        <DockOptions svg={icons.Team} optName="Teams" />
      </div>

      {/* Close Button */}
      <button
        onClick={() => setClose("none")}
        className="absolute top-1 right-1 rounded-lg bg-[#e2e2e4] hover:bg-[#d1d1d3] transition-colors duration-200"
      >
        <SVGIcon className="" svgString={icons.Close} />
      </button>
    </div>
  );
};
const FeaturesWindow = ({
  setClose,
}: {
  setClose: React.Dispatch<React.SetStateAction<activePopupProp>>;
}) => {
  return (
    <div className="fixed bottom-16 transform w-[350px] md:hidden md:pointer-events-none bg-[rgba(0,0,0,0.1)] backdrop-blur-lg border border-[#414141] rounded-lg shadow-lg p-2 transition-all duration-300">
      {/* Popup Content */}
      <p className="text-white ">Features</p>
      <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-2">
        <DockOptions svg={icons.GitHub} optName="GitHub" />
        <DockOptions svg={icons.Target} optName="Import Iss…" />
        <DockOptions svg={icons.Members} optName="Invite People" />
      </div>

      {/* Close Button */}
      <button
        onClick={() => setClose("none")}
        className="absolute top-1 right-1 rounded-lg bg-[#e2e2e4] hover:bg-[#d1d1d3] transition-colors duration-200"
      >
        <SVGIcon className="" svgString={icons.Close} />
      </button>
    </div>
  );
};
const TeamsWindow = ({
  setClose,
}: {
  setClose: React.Dispatch<React.SetStateAction<activePopupProp>>;
}) => {
  return (
    <div className="fixed bottom-16 transform w-[350px] md:hidden md:pointer-events-none bg-[rgba(0,0,0,0.1)] backdrop-blur-lg border border-[#414141] rounded-lg shadow-lg p-2 transition-all duration-300">
      {/* Popup Content */}
      <p className="text-white ">Teams</p>

      <div className="grid grid-cols-2 gap-x-2 gap-y-2 mt-2">
        <DockOptions svg={icons.Target} optName="Issues" />
        <DockOptions svg={icons.Cube} optName="Project" />
        <DockOptions svg={icons.Eye} optName="Views" />
      </div>
      {/* Close Button */}
      <button
        onClick={() => setClose("none")}
        className="absolute top-1 right-1 rounded-lg bg-[#e2e2e4] hover:bg-[#d1d1d3] transition-colors duration-200"
      >
        <SVGIcon className="" svgString={icons.Close} />
      </button>
    </div>
  );
};

function DockOptions({
  svg,
  optName,
  redirectUri,
}: {
  svg: string;
  optName: string;
  redirectUri?: string;
}) {
  return (
    <div className="border border-[#414141] h-8 flex px-4 rounded-lg items-center gap-x-2 hover:bg-[#1d1d21] transition-all duration-200">
      <div className="">
        <SVGIcon className="flex w-5" svgString={svg} />
      </div>
      <p className="">{optName}</p>
    </div>
  );
}
