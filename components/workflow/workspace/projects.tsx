"use client";

import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import { ProjectBody } from "@/utils/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const icons = RAW_ICONS;

type ProjectStatusType =
  | "Completed"
  | "Backlog"
  | "In Progress"
  | "Cancelled"
  | "Planned";

type ProjectPriorityType = "No Priority" | "Urgent" | "High" | "Medium" | "Low";

export default function Projects() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [createWindowOpen, setCreateWindowOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectBody[]>();
  const [projStatus, setProjStatus] = useState<ProjectStatusType>("Backlog");

  const [isLoading, setIsLoading] = useState(false);

  const [projPriority, setProjPriority] =
    useState<ProjectPriorityType>("No Priority");

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

  useEffect(() => {
    if (!session?.user.email) {
      router.push("/");
    }
  }, [router, session?.user.email]);
  return (
    <>
      <div className="w-full  bg-[#0A0A0A] h-screen flex flex-col">
        <div className="flex justify-center items-center gap-x-1 h-10 md:h-12">
          <SVGIcon className="flex w-3 sm:w-4" svgString={icons.RubiksCube} />
          <p className="text-[13px] sm:text-[15px]">Projects</p>
        </div>

        <div className="flex-grow border border-[#414141] bg-[#0F1111] rounded-lg ml-2 md:ml-0 mr-2 mb-2 p-1">
          <div className="border h-10 rounded border-[#2d3036] flex items-center justify-between px-4">
            <div className=" flex gap-x-2 md:gap-x-4 items-center ">
              <p className="text-[12px] sm:text-[13px] md:text-[15px]">
                Projects
              </p>
              <div className="flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded bg-[#1C1D21] hover:bg-[#1C1D21] transition-all duration-300">
                <SVGIcon className="flex w-3" svgString={icons.Cube} />
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
                <SVGIcon className="flex w-3" svgString={icons.Add} />
                <p className="text-[12px] sm:text-[13px] md:text-[15px]">
                  Create project
                </p>
              </div>
            </div>
          </div>
          <ProjectTopTile />

          {isLoading && (
            <div className="h-20 flex items-center justify-center">
              <SVGIcon className="flex w-10 md:w-20" svgString={icons.Loader} />
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
                  />
                );
              })}
          </div>
        </div>
      </div>
      {createWindowOpen && (
        <CreateProjectWindow setClose={setCreateWindowOpen} />
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
      <p className="col-span-2">Target Date</p>
      <p className="col-span-1">Status</p>
    </div>
  );
};

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

const ProjectLabel = ({
  title,
  health,
  priority,
  lead,
  targetDate,
  status,
  projectID,
}: {
  title: string;
  health?: string;
  priority: string;
  lead?: string;
  targetDate?: string;
  status?: string;
  projectID: string;
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
      className="rounded-lg grid grid-cols-12 px-4 items-center text-[#97989A] h-16 hover:bg-[#151818] transition-all duration-300 text-[11px] sm:text-[13px] md:text-[15px]"
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
          {renderPrioritySvg(selectedPriorityOption)}
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

  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [showPriorityOptions, setShowPriorityOptions] = useState(false);
  const statusOptions = [
    "Completed",
    "Backlog",
    "In Progress",
    "Cancelled",
    "Planned",
  ];

  const toggleOptions = () => {
    setShowStatusOptions(!showStatusOptions);
  };

  const priorityOptions = ["No Priority", "Urgent", "High", "Medium", "Low"];

  const togglePriorityOptions = () => {
    setShowPriorityOptions(!showPriorityOptions);
  };

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
    }
  };

  return (
    <div className="absolute bg-[rgba(0,0,0,0.1)] backdrop-blur-lg w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-44">
      <div className="flex flex-col border border-[#393B42] w-full h-[550px] lg:h-[600px] xl:h-[700px] rounded-xl bg-[#0F1111] px-2 md:px-4 xl:px-5 pt-2 md:pt-4 xl:pt-5">
        <div className=" h-10 flex justify-between items-center gap-x-2">
          <div className="flex items-center">
            <div className="border border-[#2E3035] bg-[#1C1D21] rounded h-7 md:h-9 w-16 md:w-20 flex justify-center items-center">
              <p className="text-[12px] md:text-[14px] xl:text-[16px]">Team</p>
            </div>
            <SVGIcon className="flex w-t" svgString={icons.ArrowRight} />
            <p className="text-[12px] md:text-[14px] xl:text-[16px]">
              New Project
            </p>
          </div>
          <div onClick={() => setClose(false)} className="w-fit cursor-pointer">
            <SVGIcon className="flex w-3 md:w-5" svgString={icons.Close} />
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
            onClick={toggleOptions}
            className="border border-[#525353]  bg-[#1D1D21] h-8 px-2 lg:px-3 rounded-md hover:bg-[#29292e] transition-all duration-300"
          >
            {status}
          </button>
          {showStatusOptions && (
            <div className="absolute bg-[#1D1D21] border border-[#525353] rounded-md mt-2">
              {statusOptions.map((option, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-[#29292e] cursor-pointer rounded"
                  onClick={() => {
                    //@ts-expect-error //status type differ
                    setStatus(option);
                    setShowStatusOptions(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
          <button
            onClick={togglePriorityOptions}
            className="border border-[#525353] bg-[#1D1D21] h-8 px-2 lg:px-3 rounded-md hover:bg-[#29292e] transition-all duration-300"
          >
            {priority}
          </button>
          {showPriorityOptions && (
            <div className="absolute bg-[#1D1D21] border border-[#525353] rounded-md mt-2">
              {priorityOptions.map((option, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-[#29292e] cursor-pointer rounded"
                  onClick={() => {
                    //@ts-expect-error //project type is different
                    setPriority(option);
                    setShowPriorityOptions(false);
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
