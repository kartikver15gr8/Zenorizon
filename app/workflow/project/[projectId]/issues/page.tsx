"use client";

import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import { IssueBody } from "@/utils/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

const icons = RAW_ICONS;

const activeTab =
  "flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded bg-[#1C1D21] hover:bg-[#1C1D21] transition-all duration-300";
const inactiveTab =
  "flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded  bg-[#0F1111] hover:bg-[#1C1D21] transition-all duration-300";

export default function Issue() {
  const path = usePathname();

  const [project_id, setProjectId] = useState<string | null>("");

  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const [issues, setIssues] = useState<IssueBody[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchIssues = async () => {
      if (!project_id) return;

      try {
        setIsLoading(true);
        const response = await axios.post("/api/issues/getissues", {
          project_id: project_id,
        });

        setIssues(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchIssues();
  }, [project_id]);

  useEffect(() => {
    setProjectId(localStorage.getItem("ZENO_PROJECT_ID"));
  }, []);

  const createIssue = async () => {
    try {
      const response = await axios.post("/api/issues/createissue", {
        issueTitle: issueTitle,
        issueDescription: issueDescription,
        projectId: project_id,
      });

      toast.info(response.data.message);
    } catch (error) {
      toast.info("Error occured while creating project");
    }
  };

  return (
    <>
      <div className="w-full  bg-[#0A0A0A] h-screen flex flex-col">
        <div className="flex justify-center items-center gap-x-1 h-10 md:h-12">
          <SVGIcon className="flex w-3 sm:w-4" svgString={icons.Issue} />
          <p className="text-[13px] sm:text-[15px]">Issues</p>
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
              <Link
                href={`/workflow/project/${project_id}`}
                className="flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded bg-[#1C1D21] hover:bg-[#1C1D21] transition-all duration-300"
              >
                <SVGIcon className="flex w-4" svgString={icons.Cube} />
                <p className="text-[12px] sm:text-[13px] md:text-[15px]">
                  project
                </p>
              </Link>
              <div
                className={path.includes("/issues") ? inactiveTab : activeTab}
              >
                <SVGIcon className="flex w-4" svgString={icons.Docs} />
                <p className="text-[12px] sm:text-[13px] md:text-[15px]">
                  Overview
                </p>
              </div>
              <Link
                href={`/workflow/project/${project_id}/issues`}
                className={path.includes("/issues") ? activeTab : inactiveTab}
              >
                <SVGIcon className="flex w-4" svgString={icons.Issue} />
                <p className="text-[12px] sm:text-[13px] md:text-[15px]">
                  Issues
                </p>
              </Link>
            </div>
            <div className="flex gap-x-2 md:gap-x-4 ">
              <div className="flex h-7 items-center gap-x-1 cursor-pointer border border-transparent  px-2 rounded-lg hover:bg-[#1C1D21] hover:border-[#2E3035] transition-all duration-300">
                <SVGIcon className="flex w-5" svgString={icons.SideBar} />
              </div>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto h-96 scrollbar-hide ">
            {issues &&
              issues?.length > 0 &&
              issues?.map((elem, key) => {
                return (
                  <IssuesLabel
                    key={key}
                    title={elem.title}
                    projectID={project_id}
                  />
                );
              })}

            <div className="h-14 rounded-lg border border-[#97989A] px-3 flex items-center gap-x-3">
              <div className="border rounded-full h-5 w-5"></div>
              <p>Build v1 for Zenorizon</p>
              <p>Key for project</p>
              <p>Priority</p>
              <p>date</p>
              <p>Assigned to</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const renderPrioritySvg = (priority: string) => {
  switch (priority.split(" ").join().toLowerCase()) {
    case "urgent":
      return <SVGIcon className="flex w-5" svgString={icons.UrgentPriority} />;
    case "high":
      return <SVGIcon className="flex w-5" svgString={icons.HighPriority} />;
    case "medium":
      return <SVGIcon className="flex w-5" svgString={icons.MediumPriority} />;
    case "low":
      return <SVGIcon className="flex w-5" svgString={icons.LowPriority} />;
    default:
      return <SVGIcon className="flex w-5" svgString={icons.NoPriority} />;
  }
};

const IssuesLabel = ({
  title,
  description,
  health,
  priority,
  lead,
  targetDate,
  status,
  projectID,
}: {
  title: string;
  description?: string;
  health?: string;
  priority?: string;
  lead?: string;
  targetDate?: string;
  status?: string;
  projectID: string | null;
}) => {
  const [selectedHealthOption, setSelectedHealthOption] = useState(health);

  const [showOptionsDropdown, setShowOptionsDropdown] = useState<
    "health" | "priority" | boolean
  >(false);

  const [selectedPriorityOption, setSelectedPriorityOption] =
    useState(priority);

  const healthOptions = [
    "Completed",
    "In Progress",
    "Cancelled",
    "Backlog",
    "Planned",
  ];
  const priorityOptions = ["Urgent", "No Priority", "High", "Medium", "Low"];

  const handleHealthOptionClick = async (option: string) => {
    setSelectedHealthOption(option);

    setShowOptionsDropdown(false);
    try {
      const response = await axios.patch("/api/workflow/updateproject", {
        projectId: projectID,
        status: option,
      });
      if (response.status === 200) {
        toast.info(`Status set to ${option} successfully 🎉`);
      } else {
        toast.error("Failed to update project status");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project status");
    }
  };

  const handlePriorityOptionClick = async (option: string) => {
    setSelectedPriorityOption(option);
    setShowOptionsDropdown(false);
    try {
      const response = await axios.patch("/api/workflow/updateproject", {
        projectId: projectID,
        priority: option,
      });
      if (response.status === 200) {
        toast.info(`Priority set to ${option} successfully 🎉`);
      } else {
        toast.error("Failed to update project status");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project status");
    }
  };

  return (
    <Link
      href={`/workflow/project/${projectID}`}
      className="rounded-lg grid grid-cols-12 px-4 items-center text-[#97989A] h-16 hover:bg-[#151818] transition-all duration-300 text-[11px] sm:text-[13px] md:text-[15px] border"
    >
      <p className="col-span-4 text-sm lg:text-lg">{title}</p>
      <div className="col-span-2 relative">
        <div
          className="w-fit flex items-center px-2 h-8 rounded hover:bg-[#212227] transition-all duration-300 cursor-pointer"
          onClick={() => setShowOptionsDropdown("health")}
        >
          {selectedHealthOption}
        </div>
        {showOptionsDropdown == "health" && (
          <div className="absolute top-full left-0 bg-[#0A0A0A] border border-[#414141] rounded shadow-lg mt-1 z-10">
            {healthOptions.map((option) => (
              <div
                key={option}
                className="px-4 py-2 hover:bg-[#151818] cursor-pointer text-white"
                onClick={() => handleHealthOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-2 relative">
        <div
          className="flex items-center justify-center h-8 w-8 rounded hover:bg-[#212227] transition-all duration-300 cursor-pointer"
          onClick={() => setShowOptionsDropdown("priority")}
        >
          {/* {renderPrioritySvg(selectedPriorityOption)} */}priority
        </div>
        {showOptionsDropdown == "priority" && (
          <div className="absolute top-full left-0 bg-[#0A0A0A] border border-[#414141] rounded shadow-lg mt-1 z-10">
            {priorityOptions.map((option) => (
              <div
                key={option}
                className="px-4 py-2 hover:bg-[#151818] cursor-pointer text-white"
                onClick={() => handlePriorityOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-1 h-8 w-8 flex items-center justify-center rounded hover:bg-[#212227] transition-all duration-300">
        <SVGIcon className="flex w-4 " svgString={icons.Account} />
      </div>
      <p className="col-span-2">{targetDate}</p>
      <p className="col-span-1">{status}</p>
    </Link>
  );
};
