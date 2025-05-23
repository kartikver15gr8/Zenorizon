import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import Image from "next/image";
import timeline from "@/public/assets/illustrations/timeline.png";
import laptop from "@/public/assets/illustrations/laptop.png";

export default function ProductTimeline() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#151515] via-[#0f1011] to-[#0A0A0A] px-4 sm:px-6 md:px-10 lg:px-14 xl:px-28 gap-y-3 sm:gap-y-4 md:gap-y-5 xl:gap-y-6 py-5 lg:py-10">
      <div className="mb-4 md:mb-8">
        <div className="flex items-center gap-x-2 text-xs md:text-sm lg:text-lg">
          <p>Single platform to drive your product</p>
          <div className="w-3 h-3 md:w-4 md:h-4 rotate-45 rounded shadow-[inset_-3px_-0.1px_7px_2px_rgba(255,255,255,0.4)] border border-[#717171]"></div>
        </div>
        <p className="text-xl md:text-3xl lg:text-4xl xl:text-6xl font-medium pb-3 pt-2 md:pb-5 md:pt-3">
          Navigate your product timeline
        </p>
        <p className="text-xs md:text-[16px] lg:text-lg text-[#A8A8A8] max-w-3xl w-[70%] lg:w-[45%]">
          Manage your workspaces, projects, assign issues, integrate with GitHub
          and other apps and a lot more
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:mb-8">
        <div className=""></div>

        <div className="mt-10 rounded-2xl border border-[#2D2E2E] p-1 md:p-2">
          <Image
            className="rounded-[10px] border border-[#515252]"
            src={laptop}
            alt=""
          />
        </div>
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

const UpdatesCard = () => {
  return (
    <div className="flex flex-col  h-full w-full">
      <p className="text-xl font-medium mt-10">Real-time product updates</p>
      <p className="mt-2 text-[16px] text-[#A8A8A8] w-[90%] xl:w-[80%]">
        Share project status and updates effortlessly with integrated progress
        reports.
      </p>
      {/* Responsive stacking: vertical on mobile, overlay on desktop */}
      <div className="relative mt-8 md:mt-0 w-full md:w-[90%] flex flex-col items-center justify-center md:h-[340px] h-[300px] ">
        {/* Card 3 (bottom) */}
        <div
          className="
          z-10 h-48 p-4 rounded-2xl border border-[#2d2d2f] bg-[#1c1e1f] backdrop-blur-lg text-white
          hover:bg-[#434444] transition-all duration-300 hover:-translate-y-5
          shadow-[inset_-12px_-18px_74px_0_rgba(0,0,0,0.28)] cursor-pointer
          mb-4 md:mb-0
          absolute bottom-20 left-0 right-0
        "
        >
          <div className="text-[#8f9191] hover:text-red-500 transition-all duration-300 font-medium flex items-center gap-1">
            <span className="text-xl">✔</span>
            <span>Cancelled</span>
          </div>
          <p className="mt-5 text-2xl">We are ready to launch next Thursday</p>
          <div className="absolute bottom-2 text-lg text-[#A8A8A8]">Sep 8</div>
        </div>

        {/* Card 2 (middle) */}
        <div
          className="
          z-20 h-48 p-4 rounded-2xl border border-[#2d2d2f] bg-[#1c1e1f] backdrop-blur-lg text-white
          hover:bg-[#434444] transition-all duration-300 hover:-translate-y-5
          shadow-[inset_-12px_-18px_74px_0_rgba(0,0,0,0.28)] cursor-pointer
          mb-4 md:mb-0
          absolute bottom-10 left-0 right-0
        "
        >
          <div className="text-[#8f9191] hover:text-yellow-500 transition-all duration-300 font-medium flex items-center gap-1">
            <span className="text-xl">✔</span>
            <span>Delayed</span>
          </div>
          <p className="mt-5 text-2xl">We are ready to launch next Thursday</p>
          <div className="absolute bottom-2 text-lg text-[#A8A8A8]">Aug 8</div>
        </div>

        {/* Card 1 (top) */}
        <div
          className="
          z-30 h-48 p-4 rounded-2xl border border-[#2d2d2f] bg-[#1c1e1f] backdrop-blur-lg text-white
          hover:bg-[#434444] transition-all duration-300 hover:-translate-y-5
          shadow-[inset_-12px_-18px_74px_0_rgba(0,0,0,0.28)] cursor-pointer
          absolute bottom-0 left-0 right-0
        "
        >
          <div className="text-[#8f9191] hover:text-green-400 transition-all duration-300 font-medium flex items-center gap-1">
            <span className="text-xl">✔</span>
            <span>On track</span>
          </div>
          <p className="mt-5 text-2xl">We&apos;re launching the Beta soon!</p>
          <div className="absolute bottom-2 text-lg text-[#A8A8A8]">Nov 8</div>
        </div>
      </div>
    </div>
  );
};
