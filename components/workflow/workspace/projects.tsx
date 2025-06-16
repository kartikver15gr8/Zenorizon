"use client";

import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import {
  ProjectBody,
  ProjectPriorityType,
  ProjectStatusType,
} from "@/utils/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ProjectListSkeleton from "./project-skeleton-loader";
import { WorkflowLayout } from "../workflow-layout";
import { renderPrioritySvg } from "../issues/issue-label";
import {
  healthOptions,
  priorityOptionsArray,
} from "@/utils/project-view-options";

export default function Projects() {
  const [deleteProjectId, setDeleteProjectId] = useState("");
  const [deleteWindowOpen, setDeleteWindowOpen] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [createWindowOpen, setCreateWindowOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectBody[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/workflow/getprojects");
      setProjects(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (status === "loading") {
    return <ProjectListSkeleton />;
  }

  return (
    <>
      <WorkflowLayout windowSvg={RAW_ICONS.RubiksCube} windowTitle="Projects">
        <div className="border h-10 rounded border-[#2d3036] flex items-center justify-between px-4">
          <div className=" flex gap-x-2 md:gap-x-4 items-center ">
            <p className="text-[12px] sm:text-[13px] md:text-[15px]">
              Projects
            </p>
            <div className="flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded bg-[#1C1D21] hover:bg-[#1C1D21] transition-all duration-300">
              <SVGIcon className="flex w-3" svgString={RAW_ICONS.Cube} />
              <p className="text-[12px] sm:text-[13px] md:text-[15px]">
                All projects
              </p>
            </div>
          </div>
          <div className="flex gap-x-2 md:gap-x-4 ">
            <div
              onClick={() => setCreateWindowOpen(true)}
              className="flex h-7 items-center gap-x-1 cursor-pointer border border-transparent  px-2 rounded hover:bg-[#1C1D21] hover:border-[#2E3035] transition-all duration-300"
            >
              <SVGIcon className="flex w-3" svgString={RAW_ICONS.Add} />
              <p className="text-[12px] sm:text-[13px] md:text-[15px]">
                Create project
              </p>
            </div>
          </div>
        </div>

        <ProjectTopTile />

        {isLoading && (
          <div className="h-20 flex items-center justify-center">
            <SVGIcon
              className="flex w-10 md:w-20"
              svgString={RAW_ICONS.Loader}
            />
          </div>
        )}

        <div className="">
          {projects &&
            projects?.length > 0 &&
            projects?.map((elem, key) => {
              return (
                <ProjectLabel
                  key={key}
                  title={elem.title}
                  health={elem.status}
                  priority={elem.priority}
                  projectID={elem.id}
                  openDeleteWindow={setDeleteWindowOpen}
                  setProjectIdToDelete={setDeleteProjectId}
                />
              );
            })}
        </div>
      </WorkflowLayout>

      {createWindowOpen && (
        <CreateProjectWindow setClose={setCreateWindowOpen} />
      )}
      {deleteWindowOpen && (
        <DeleteWindow
          closeDeleteWindow={setDeleteWindowOpen}
          projectID={deleteProjectId}
        />
      )}
    </>
  );
}

const ProjectTopTile = () => {
  return (
    <div className="border-b h-10 border-[#2E3035] grid grid-cols-12 px-4 items-center text-[#97989A] text-[11px] sm:text-[13px] md:text-[15px]">
      <p className="col-span-4">Title</p>
      <p className="col-span-2">Health</p>
      <p className="col-span-2">Priority</p>
      <p className="col-span-1">Lead</p>
      <p className="col-span-1">Target Date</p>
      <p className="col-span-2">Status</p>
    </div>
  );
};

const ProjectLabel = ({
  title,
  health,
  priority,
  lead,
  targetDate,
  status,
  projectID,
  openDeleteWindow,
  setProjectIdToDelete,
}: {
  title: string;
  health?: string;
  priority: string;
  lead?: string;
  targetDate?: string;
  status?: string;
  projectID: string;
  openDeleteWindow: React.Dispatch<React.SetStateAction<boolean>>;
  setProjectIdToDelete: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [selectedHealthOption, setSelectedHealthOption] = useState(health);

  const [showOptionsDropdown, setShowOptionsDropdown] = useState<
    "health" | "priority" | boolean
  >(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedPriorityOption, setSelectedPriorityOption] =
    useState(priority);

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

  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       setShowOptionsDropdown(false);
  //     }
  //   }

  //   if (showOptionsDropdown) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   // Cleanup
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [showOptionsDropdown]);

  return (
    <div className="rounded-lg grid grid-cols-12 px-4 items-center text-[#97989A] h-16 hover:bg-[#151818] transition-all duration-300 text-[11px] sm:text-[13px] md:text-[15px]">
      <Link
        href={`/workflow/project/${projectID}`}
        className="col-span-4 text-sm lg:text-lg"
      >
        {title}
      </Link>
      <div className="col-span-2 relative" ref={dropdownRef}>
        <div
          className="w-fit flex items-center px-2 h-8 rounded hover:bg-[#212227] transition-all duration-300 cursor-pointer"
          onClick={() => setShowOptionsDropdown("health")}
        >
          {selectedHealthOption}
        </div>
        {showOptionsDropdown == "health" && (
          <div className="z-10 absolute top-10 -left-3 w-32 h-fit bg-[rgba(0,0,0,0.1)] backdrop-blur-lg border border-[#414141] rounded-xl shadow-lg p-1 transition-all duration-300">
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
      <div className="col-span-2 relative" ref={dropdownRef}>
        <div
          className="flex items-center justify-center h-8 w-8 rounded hover:bg-[#212227] transition-all duration-300 cursor-pointer"
          onClick={() => setShowOptionsDropdown("priority")}
        >
          {renderPrioritySvg(selectedPriorityOption)}
        </div>
        {showOptionsDropdown == "priority" && (
          <div className="z-10 absolute top-10 -left-3 w-32 h-fit bg-[rgba(0,0,0,0.1)] backdrop-blur-lg border border-[#414141] rounded-xl shadow-lg p-1 transition-all duration-300">
            {priorityOptionsArray.map((option, key) => (
              <div
                key={key}
                className="px-2 py-2 hover:bg-[#151818] cursor-pointer text-white flex items-center  gap-x-2"
                onClick={() => handlePriorityOptionClick(option.name)}
              >
                <SVGIcon className="flex w-4" svgString={option.svg} />
                <p className="text-sm">{option.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-1 h-8 w-8 flex items-center justify-center rounded hover:bg-[#212227] transition-all duration-300">
        <SVGIcon className="flex w-4 " svgString={RAW_ICONS.Account} />
      </div>
      <p className="col-span-1">{targetDate ? targetDate : "NA"}</p>

      <div className="col-span-2 flex items-center h-full  justify-between">
        <p>{status ? status : "NA"}</p>
        <button
          onClick={() => {
            setProjectIdToDelete(projectID);
            openDeleteWindow(true);
          }}
          className="flex items-center justify-center h-8 w-8 rounded hover:bg-[#212227] transition-all duration-300 cursor-pointer"
        >
          <SVGIcon className="flex w-4 xl:w-5" svgString={RAW_ICONS.Delete} />
        </button>
      </div>
    </div>
  );
};

const CreateProjectWindow = ({
  setClose,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [projTitle, setProjTitle] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [projContent, setProjContent] = useState("");
  const [status, setStatus] = useState<ProjectStatusType>("Backlog");
  const [priority, setPriority] = useState<ProjectPriorityType>("No Priority");

  const [showOptionsDropdown, setShowOptionsDropdown] = useState<
    "health" | "priority" | boolean
  >(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const statusOptions = [
    "Completed",
    "Backlog",
    "Working",
    "Cancelled",
    "Planned",
  ];

  const priorityOptions = ["No Priority", "Urgent", "High", "Medium", "Low"];

  const { data: session } = useSession();

  const createProject = async () => {
    try {
      const response = await axios.post("/api/workflow/createproject", {
        projTitle: projTitle,
        projDescription: projDescription,
        projContent: projContent,
        createdBy: session?.user.id,
        priority: priority,
        status: status,
      });

      toast.info(response.data.message);
    } catch (error) {
      toast.info("Error occured while creating project");
    } finally {
      setClose(false);
      window.location.reload(); // This will reload the page
    }
  };

  return (
    <div className="absolute bg-[rgba(0,0,0,0.1)] backdrop-blur-lg w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-44">
      {/* Main content */}
      <div className="flex flex-col border border-[#393B42] w-full h-[550px] lg:h-[600px] xl:h-[700px] rounded-xl bg-[#0F1111] px-2 md:px-4 xl:px-5 pt-2 md:pt-4 xl:pt-5">
        <div className=" h-10 flex justify-between items-center gap-x-2">
          <div className="flex items-center">
            <div className="border border-[#2E3035] bg-[#1C1D21] rounded h-7 md:h-9 w-16 md:w-20 flex justify-center items-center">
              <p className="text-[12px] md:text-[14px] xl:text-[16px]">Team</p>
            </div>
            <SVGIcon className="flex w-t" svgString={RAW_ICONS.ArrowRight} />
            <p className="text-[12px] md:text-[14px] xl:text-[16px]">
              New Project
            </p>
          </div>
          <div onClick={() => setClose(false)} className="w-fit cursor-pointer">
            <SVGIcon className="flex w-3 md:w-5" svgString={RAW_ICONS.Close} />
          </div>
        </div>

        <div id="title" className="mt-5">
          <input
            className=" text-xl sm:text-2xl md:text-3xl w-full outline-none"
            placeholder="Project name"
            value={projTitle}
            onChange={(e) => {
              setProjTitle(e.target.value);
            }}
          />
          <input
            id="description"
            className="text-sm md:text-lg w-full outline-none mt-3"
            placeholder="Add some description…"
            value={projDescription}
            onChange={(e) => {
              setProjDescription(e.target.value);
            }}
          />
        </div>

        <div className="my-2 h-10 gap-x-2 flex items-center  text-[10px]  md:text-[14px] lg:text-[15px] xl:text-[16px] ">
          <button
            onClick={() => setShowOptionsDropdown("health")}
            className="border border-[#525353] flex items-center  bg-[#1D1D21] h-8 px-2 lg:px-3 rounded-md hover:bg-[#29292e] transition-all duration-300"
          >
            {status}
          </button>
          {showOptionsDropdown == "health" && (
            <div className="absolute bg-[#1D1D21] border border-[#525353] rounded-md mt-2">
              {statusOptions.map((option, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-[#29292e] cursor-pointer rounded"
                  onClick={() => {
                    //@ts-expect-error //status type differ
                    setStatus(option);
                    setShowOptionsDropdown(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
          <button
            onClick={() => setShowOptionsDropdown("priority")}
            className="border border-[#525353] flex items-center bg-[#1D1D21] h-8 px-2 lg:px-3 rounded-md hover:bg-[#29292e] transition-all duration-300"
          >
            {priority}
          </button>
          {showOptionsDropdown == "priority" && (
            <div className="absolute bg-[#1D1D21] border border-[#525353] rounded-md mt-2">
              {priorityOptions.map((option, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-[#29292e] cursor-pointer rounded"
                  onClick={() => {
                    //@ts-expect-error //project type is different
                    setPriority(option);
                    setShowOptionsDropdown(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}

          <button className="border border-[#525353] bg-[#1D1D21] h-8 px-2 lg:px-3 rounded-md hover:bg-[#29292e] transition-all duration-300">
            lead
          </button>
          <button className="border border-[#525353] bg-[#1D1D21] h-8 px-2 lg:px-3 rounded-md hover:bg-[#29292e] transition-all duration-300">
            members
          </button>
          <button className="border border-[#525353] bg-[#1D1D21] h-8 px-2 lg:px-3 rounded-md hover:bg-[#29292e] transition-all duration-300">
            start date
          </button>
          <button className="border border-[#525353] bg-[#1D1D21] h-8 px-2 lg:px-3 rounded-md hover:bg-[#29292e] transition-all duration-300">
            target date
          </button>
        </div>

        <div className="border-t border-[#525353] mt-1 sm:mt-2 md:mt-3"></div>
        <div
          id="content"
          className="flex-grow mt-2 sm:mt-5 md:mt-10 font-extralight"
        >
          <textarea
            className=" text-[14px]  lg:text-[15px] xl:text-lg w-full outline-none h-full resize-none"
            placeholder="Add project brief, long description, collect ideas and resources…"
            value={projContent}
            onChange={(e) => {
              setProjContent(e.target.value);
            }}
          />
        </div>

        <div className="border-t border-[#393B42] w-full h-20 flex items-center justify-end gap-x-3  text-[12px]  md:text-[14px] lg:text-[15px] xl:text-[16px] ">
          <button
            onClick={() => setClose(false)}
            className="px-2 border border-[#393B42] rounded-md h-9 hover:bg-[#23252A] transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={createProject}
            className="px-2 border border-[#6D78E7] bg-[#5E6AD2] rounded-md h-9 hover:bg-[#6D78E7] transition-all duration-300"
          >
            Create project
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteWindow = ({
  projectID,
  closeDeleteWindow,
}: {
  projectID: string;
  closeDeleteWindow: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const deleteProject = async () => {
    try {
      const response = await axios.delete("/api/workflow/deleteproject", {
        data: { projectId: projectID },
        headers: { "Content-Type": "application/json" },
      });
      toast.info("successfully deleted");
    } catch (error) {
      toast.error("Error while deleting the project");
    } finally {
      closeDeleteWindow(false);
    }
  };

  return (
    <div className="absolute bg-[rgba(0,0,0,0.1)] backdrop-blur-lg w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-44">
      {/* Main content */}
      <div className="flex flex-col justify-between border border-[#393B42] rounded-xl bg-[#0F1111] h-56 w-96 lg:w-[500px] p-4">
        <div className="">
          <p className="font-bold text-2xl">Are you sure?</p>
          <p className="text-[#f2534d]">
            Deleting this project will automatically delete all the issues
            related under this project.
          </p>
        </div>
        <div className="flex items-center justify-end gap-x-2 h-10">
          <button
            onClick={() => closeDeleteWindow(false)}
            className="border border-[#8c8e85] bg-[#8c8e8533] h-9 w-20 rounded-lg  hover:bg-[#908d8c5e] hover:text-white transition-all duration-200 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={deleteProject}
            className="border border-[#9e3e28] bg-[#421c1370] h-9 w-20 rounded-lg text-[#cb4b2e] hover:bg-[#421c13] hover:text-white transition-all duration-200 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
