"use client";
import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const icons = RAW_ICONS;

export default function Projects() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session?.user.email) {
      router.push("/");
    }
  }, [router, session?.user.email]);
  return (
    <div className="w-full  bg-[#0A0A0A] h-screen flex flex-col">
      <div className="flex justify-center items-center gap-x-1 h-10 md:h-12">
        <SVGIcon className="flex w-3 sm:w-4" svgString={icons.Cube} />
        <p className="text-[13px] sm:text-[15px]">Projects</p>
      </div>

      <div className="flex-grow border border-[#414141] bg-[#0F1111] rounded-lg ml-2 md:ml-0 mr-2 mb-2 p-1">
        <div className="border h-10 rounded border-[#2d3036] flex items-center px-1">
          <p>Projects</p>
        </div>
      </div>
    </div>
  );
}
