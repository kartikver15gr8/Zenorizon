"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import type { ProjectBody } from "@/utils/types";
import SVGIcon from "@/lib/svg-icon";
import Link from "next/link";
import ProjectLoadingScreen from "@/components/workflow/workspace/project-loading";
import { usePathname } from "next/navigation";
import { RAW_ICONS } from "@/lib/icons";
import { WorkflowLayout } from "@/components/workflow/workflow-layout";
import { TopTileButton } from "@/components/workflow/workflow-toptile-layout";
import { toast } from "sonner";
import { renderPrioritySvg } from "@/utils/render-priority-svg";
import {
  healthOptions,
  priorityOptionsArray,
} from "@/utils/project-view-options";
import { customToast } from "@/lib/custom-toast";

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
  const [selectedHealthOption, setSelectedHealthOption] = useState("");
  const [selectedPriorityOption, setSelectedPriorityOption] = useState("");

  const [showOptionsDropdown, setShowOptionsDropdown] = useState<
    "status" | "priority" | boolean
  >(false);

  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const priorityDropdownRef = useRef<HTMLDivElement>(null);

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

  const handleHealthOptionClick = async (option: string) => {
    setSelectedHealthOption(option);

    setShowOptionsDropdown(false);
    try {
      const response = await axios.patch("/api/workflow/updateproject", {
        projectId: project_id,
        status: option,
      });
      if (response.status === 200) {
        customToast.info({
          title: "Status changed!",
          description: `Status set to ${option} successfully.`,
        });
      } else {
        customToast.error({
          title: "Action failed",
          description: `Failed to update status.`,
        });
      }
    } catch (error) {
      customToast.error({
        title: "Action failed",
        description: `Failed to update status.`,
      });
    }
  };

  const handlePriorityOptionClick = async (option: string) => {
    setSelectedPriorityOption(option);
    setShowOptionsDropdown(false);
    try {
      const response = await axios.patch("/api/workflow/updateproject", {
        projectId: project_id,
        priority: option,
      });
      if (response.status === 200) {
        customToast.info({
          title: "Priority changed!",
          description: `Priority set to ${option} successfully.`,
        });
      } else {
        customToast.error({
          title: "Action failed",
          description: `Failed to update priority.`,
        });
      }
    } catch (error) {
      customToast.error({
        title: "Action failed",
        description: `Failed to update priority.`,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showOptionsDropdown === "status" &&
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setShowOptionsDropdown(false);
      }

      if (
        showOptionsDropdown === "priority" &&
        priorityDropdownRef.current &&
        !priorityDropdownRef.current.contains(event.target as Node)
      ) {
        setShowOptionsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptionsDropdown]);

  return (
    <>
      {isLoading ? (
        <ProjectLoadingScreen />
      ) : (
        <WorkflowLayout windowSvg={RAW_ICONS.RubiksCube} windowTitle="Projects">
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
                <div
                  ref={statusDropdownRef}
                  className="h-7  relative rounded-md lg:min-w-20 flex items-center justify-center border border-[#5C5D5E] cursor-pointer hover:bg-[#1C1D21] transition-all duration-300"
                >
                  <div
                    className="w-full h-full px-2 flex items-center rounded-md hover:bg-[#212227] transition-all duration-300 cursor-pointer text-white"
                    onClick={() => setShowOptionsDropdown("status")}
                  >
                    {project.status ? project.status : "status"}
                  </div>
                  {showOptionsDropdown == "status" && (
                    <div className="z-10 absolute top-8 -left-3 w-32 h-fit bg-[rgba(0,0,0,0.1)] backdrop-blur-lg border border-[#414141] rounded-xl shadow-lg p-1 transition-all duration-300">
                      {healthOptions.map((option, key) => (
                        <div
                          key={key}
                          className="px-2 py-1 hover:bg-[#151818] cursor-pointer text-white flex items-center rounded-md gap-x-2"
                          onClick={() => handleHealthOptionClick(option.name)}
                        >
                          <SVGIcon
                            className="flex w-4"
                            svgString={option.svg}
                          />
                          <p className="text-sm">{option.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  ref={priorityDropdownRef}
                  className="h-7 w-7 relative rounded-md  flex items-center justify-center border border-[#5C5D5E] cursor-pointer hover:bg-[#1C1D21] transition-all duration-300"
                >
                  <div
                    className="flex items-center justify-center w-full h-full  rounded-md hover:bg-[#212227] transition-all duration-300 cursor-pointer"
                    onClick={() => setShowOptionsDropdown("priority")}
                  >
                    {renderPrioritySvg(project.priority)}
                  </div>
                  {showOptionsDropdown == "priority" && (
                    <div className="z-10 absolute top-8 -left-3 w-32 h-fit bg-[rgba(0,0,0,0.1)] backdrop-blur-lg border border-[#414141] rounded-xl shadow-lg p-1 transition-all duration-300">
                      {priorityOptionsArray.map((option, key) => (
                        <div
                          key={key}
                          className="px-2 py-1 hover:bg-[#151818] cursor-pointer text-white flex items-center gap-x-2"
                          onClick={() => handlePriorityOptionClick(option.name)}
                        >
                          <SVGIcon
                            className="flex w-3"
                            svgString={option.svg}
                          />
                          <p className="text-sm">{option.name}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="h-7 px-4 relative rounded lg:min-w-20 flex items-center justify-center border border-[#5C5D5E] cursor-pointer hover:bg-[#1C1D21] transition-all duration-300">
                  Jadu
                </div>
                <div className="h-7 px-4 relative rounded lg:min-w-20 flex items-center justify-center border border-[#5C5D5E] cursor-pointer hover:bg-[#1C1D21] transition-all duration-300">
                  Lead
                </div>
                <div className="h-7 px-4 relative rounded lg:min-w-20 flex items-center justify-center border border-[#5C5D5E] cursor-pointer hover:bg-[#1C1D21] transition-all duration-300">
                  Target Date
                </div>
              </div>

              <div className="my-5">
                <p>Resources</p>
              </div>

              <div className="">
                <p>{project.content}</p>
              </div>
            </div>
          )}
        </WorkflowLayout>
      )}
    </>
  );
}
