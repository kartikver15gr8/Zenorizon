"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import type { ProjectBody } from "@/utils/types";
import SVGIcon from "@/lib/svg-icon";
import Link from "next/link";
import ProjectLoadingScreen from "@/components/workflow/workspace/project-loading";
import { usePathname } from "next/navigation";
import { RAW_ICONS } from "@/lib/icons";

const activeTab =
  "flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded bg-[#1C1D21] hover:bg-[#1C1D21] transition-all duration-300";
const inactiveTab =
  "flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded  bg-[#0F1111] hover:bg-[#1C1D21] transition-all duration-300";

export default function Project({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const path = usePathname();

  const [project_id, setProjectID] = useState<string | null>(null);
  const [project, setProject] = useState<ProjectBody | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setProjectID(resolvedParams.projectId);
      localStorage.setItem("ZENO_PROJECT_ID", resolvedParams.projectId);
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    const fetchUniqueProject = async () => {
      if (!project_id) return;

      try {
        setIsLoading(true);
        const response = await axios.post("/api/workflow/project", {
          project_id: project_id,
        });

        setProject(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUniqueProject();
  }, [project_id]);

  return (
    <>
      {isLoading ? (
        <ProjectLoadingScreen />
      ) : (
        <div className="w-full  bg-[#0A0A0A] h-screen flex flex-col">
          <div className="flex justify-center items-center gap-x-1 h-10 md:h-12">
            <SVGIcon
              className="flex w-3 sm:w-4"
              svgString={RAW_ICONS.RubiksCube}
            />
            <p className="text-[13px] sm:text-[15px]">
              {project ? project.title : "Loading…"}
            </p>
          </div>
          <div className="flex flex-col flex-grow border border-[#414141] bg-[#0F1111] rounded-lg ml-2 md:ml-0 mr-2 mb-2 p-1">
            <div className="border h-10 rounded border-[#2d3036] flex items-center justify-between px-4">
              <div className=" flex gap-x-2 items-center ">
                <Link
                  href={"/workflow/project"}
                  className="flex items-center rounded text-[12px] sm:text-[13px] md:text-[15px] border border-transparent  hover:border-[#2E3035] px-2 h-7  hover:bg-[#1C1D21] transition-all duration-300"
                >
                  Projects
                </Link>
                <div className="flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded  hover:bg-[#1C1D21] transition-all duration-300">
                  <SVGIcon className="flex w-4" svgString={RAW_ICONS.Cube} />
                  <p className="text-[12px] sm:text-[13px] md:text-[15px]">
                    {project ? project.title : "Loading…"}
                  </p>
                </div>
                <div
                  className={path.includes("/issues") ? inactiveTab : activeTab}
                >
                  <SVGIcon className="flex w-4" svgString={RAW_ICONS.Docs} />
                  <p className="text-[12px] sm:text-[13px] md:text-[15px]">
                    Overview
                  </p>
                </div>
                <Link
                  href={`/workflow/project/${project_id}/issues`}
                  className={path.includes("/issues") ? activeTab : inactiveTab}
                >
                  <SVGIcon className="flex w-4" svgString={RAW_ICONS.Issue} />
                  <p className="text-[12px] sm:text-[13px] md:text-[15px]">
                    Issues
                  </p>
                </Link>
              </div>
              <div className="flex gap-x-2 md:gap-x-4 ">
                <div className="flex h-7 items-center gap-x-1 cursor-pointer border border-transparent  px-2 rounded-lg hover:bg-[#1C1D21] hover:border-[#2E3035] transition-all duration-300">
                  <SVGIcon className="flex w-5" svgString={RAW_ICONS.SideBar} />
                </div>
              </div>
            </div>

            {project && (
              <div className="flex-grow overflow-y-auto h-96 scrollbar-hide px-4 sm:px-6 lg:px-10 xl:px-20">
                <div className="my-4 sm:my-5 lg:my-10">
                  <p className="text-xl lg:text-2xl xl:text-3xl font-medium">
                    {project.title}
                  </p>
                  <p className="my-3 text-[#858687]">{project.description}</p>
                </div>

                <div className="flex gap-x-2 my-5 text-xs md:text-sm ">
                  <p className="h-7 px-4 rounded lg:min-w-20 flex items-center justify-center border border-[#5C5D5E] cursor-pointer hover:bg-[#1C1D21] transition-all duration-300">
                    In progress
                  </p>
                  <p className="h-7 px-4 rounded lg:min-w-20 flex items-center justify-center border border-[#5C5D5E] cursor-pointer hover:bg-[#1C1D21] transition-all duration-300">
                    High
                  </p>
                  <p className="h-7 px-4 rounded lg:min-w-20 flex items-center justify-center border border-[#5C5D5E] cursor-pointer hover:bg-[#1C1D21] transition-all duration-300">
                    Jadu
                  </p>
                  <p className="h-7 px-4 rounded lg:min-w-20 flex items-center justify-center border border-[#5C5D5E] cursor-pointer hover:bg-[#1C1D21] transition-all duration-300">
                    Lead
                  </p>
                  <p className="h-7 px-4 rounded lg:min-w-20 flex items-center justify-center border border-[#5C5D5E] cursor-pointer hover:bg-[#1C1D21] transition-all duration-300">
                    Target Date
                  </p>
                </div>

                <div className="my-5">
                  <p>Resources</p>
                </div>

                <div>
                  <p>{project.content}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
