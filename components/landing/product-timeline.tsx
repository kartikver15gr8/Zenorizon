import Image from "next/image";
import timeline from "@/public/assets/illustrations/timeline.png";
import graph from "@/public/assets/illustrations/graphhq.png";
import { UpdatesCard } from "./product-updates-card";

export default function ProductTimeline() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#151515] via-[#0f1011] to-[#0A0A0A] px-4 sm:px-6 md:px-10 lg:px-14 xl:px-28 2xl:px-40 gap-y-3 sm:gap-y-4 md:gap-y-5 xl:gap-y-6 py-5 lg:py-10 xl:pb-20">
      <div className="mb-4 md:mb-8">
        <div className="flex items-center gap-x-2 text-xs md:text-sm lg:text-lg">
          <p>Single platform to drive your product</p>
          <div className="w-3 h-3 md:w-4 md:h-4 rotate-45 rounded shadow-[inset_-3px_-0.1px_7px_2px_rgba(255,255,255,0.4)] border border-[#717171]"></div>
        </div>
        <p className="text-xl md:text-3xl lg:text-4xl xl:text-6xl font-medium pb-3 pt-2 md:pb-5 md:pt-3">
          Lead your product trajectory
        </p>
        <p className="text-xs md:text-[16px] lg:text-lg text-[#A8A8A8] max-w-3xl w-[70%] lg:w-[45%]">
          Manage your workspaces, projects, assign issues, integrate with GitHub
          and other apps and a lot more
        </p>
      </div>

      <div className="mb-10">
        <Image className=" opacity-65" src={graph} alt="" />
      </div>

      <div className="border-t border-[#2f2f2f] mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        <TimelineCard />
        <UpdatesCard />
      </div>
    </div>
  );
}

const TimelineCard = () => {
  return (
    <div className="relative">
      <div className="md:border-r border-[#555555] pt-10">
        <p className="text-xl font-medium">
          Get more control over your project
        </p>
        <p className="mt-2 text-[16px] text-[#A8A8A8] w-[90%] xl:w-[80%]">
          Unify specifications, milestones, tasks, and all related documentation
          in one streamlined, easily accessible platform.
        </p>
        <div className="border border-[#2d2e2e] rounded-2xl p-2 mt-7">
          <Image
            className="border border-[#515252] rounded-[10px] "
            src={timeline}
            alt=""
          />
        </div>
      </div>

      <div className="absolute shadow-[inset_-40px_-91px_136px_0px_#0A0A0A] top-0 w-full h-full"></div>
    </div>
  );
};
