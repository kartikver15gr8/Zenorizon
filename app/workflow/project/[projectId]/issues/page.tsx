"use client";

import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import { IssueBody, ProjectBody } from "@/utils/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import IssueLabel from "@/components/workflow/issues/issue-label";

const activeTab =
  "flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded bg-[#1C1D21] hover:bg-[#1C1D21] transition-all duration-300";
const inactiveTab =
  "flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded  bg-[#0F1111] hover:bg-[#1C1D21] transition-all duration-300";

export default function Issue() {
  const path = usePathname();

  const [project_id, setProjectId] = useState<string | null>("");
  const [project, setProject] = useState<ProjectBody | null>(null);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const [issues, setIssues] = useState<IssueBody[]>();
  const [isLoading, setIsLoading] = useState(false);

  const [createIssueWindowOpen, setCreateIssueWindowOpen] = useState(false);

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
    const fetchUniqueProject = async () => {
      if (!project_id) return;

      try {
        setIsLoading(true);
        const response = await axios.post("/api/workflow/project", {
          project_id: project_id,
        });

        setProject(response.data);
        // toast.info("Product fetched successfully!");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUniqueProject();
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
          <SVGIcon className="flex w-3 sm:w-4" svgString={RAW_ICONS.Issue} />
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
              <div className="flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded hover:bg-[#1C1D21] transition-all duration-300">
                <SVGIcon className="flex w-4" svgString={RAW_ICONS.Cube} />
                <p className="text-[12px] sm:text-[13px] md:text-[15px]">
                  {project?.title}
                </p>
              </div>
              <Link
                href={`/workflow/project/${project_id}`}
                className={path.includes("/issues") ? inactiveTab : activeTab}
              >
                <SVGIcon className="flex w-4" svgString={RAW_ICONS.Docs} />
                <p className="text-[12px] sm:text-[13px] md:text-[15px]">
                  Overview
                </p>
              </Link>
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
            <div className="flex ">
              <div
                onClick={() => {
                  setCreateIssueWindowOpen(true);
                }}
                className="flex h-7 items-center gap-x-1 cursor-pointer border border-transparent  px-2 rounded-lg hover:bg-[#1C1D21] hover:border-[#2E3035] transition-all duration-300"
              >
                <SVGIcon className="flex w-4" svgString={RAW_ICONS.Add} />
              </div>
              <div className="flex h-7 items-center gap-x-1 cursor-pointer border border-transparent  px-2 rounded-lg hover:bg-[#1C1D21] hover:border-[#2E3035] transition-all duration-300">
                <SVGIcon className="flex w-5" svgString={RAW_ICONS.SideBar} />
              </div>
            </div>
          </div>
          <div className="flex-grow overflow-y-auto h-96 scrollbar-hide pt-1 ">
            {issues &&
              issues?.length > 0 &&
              issues?.map((elem, key) => {
                return (
                  <IssueLabel
                    key={key}
                    title={elem.title}
                    projectID={project_id}
                    projectKey={project?.title.slice(0, 3).toUpperCase()}
                    issueID={elem.id}
                    priority={elem.priority}
                    status={elem.status}
                  />
                );
              })}
          </div>
        </div>
      </div>
      {createIssueWindowOpen && (
        <CreateIssueWindow
          setClose={setCreateIssueWindowOpen}
          project_id={project_id}
        />
      )}
    </>
  );
}

const CreateIssueWindow = ({
  setClose,
  project_id,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  project_id: string | null;
}) => {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

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
    } finally {
      setClose(false);
    }
  };

  return (
    <div className="absolute bg-[rgba(0,0,0,0.1)] backdrop-blur-lg w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-44">
      {/* Issue Box */}

      <div className="border border-[#393B42] bg-[#0F1111] rounded-xl h-96 w-[95%] xl:w-[70%] p-4 flex flex-col">
        <div className="flex items-center justify-between flex-shrink-0">
          <div className="flex items-center">
            <div className="w-20 border border-[#2D3035] h-8 rounded-lg"></div>
            <SVGIcon svgString={RAW_ICONS.ArrowRight} />
            <p className="font-medium text-lg">New Issue</p>
          </div>
          <div
            onClick={() => {
              setClose(false);
            }}
            className="p-1 rounded-md hover:bg-[#2D3035] transition-all duration-200"
          >
            <SVGIcon className="flex" svgString={RAW_ICONS.Close} />
          </div>
        </div>
        <input
          className="mt-4 text-2xl flex-shrink-0 outline-none"
          onChange={(e) => {
            setIssueTitle(e.target.value);
          }}
          placeholder="Issue title"
          value={issueTitle}
        />
        <textarea
          className="w-full mt-4 text-lg outline-none flex-1 resize-none"
          onChange={(e) => {
            setIssueDescription(e.target.value);
          }}
          placeholder="Issue description"
          name="description"
          value={issueDescription}
        ></textarea>
        <div className=" justify-end flex items-center">
          <button onClick={createIssue} className="border px-2 rounded-md h-9">
            Create issue
          </button>
        </div>
      </div>
    </div>
  );
};

const renderPrioritySvg = (priority: string) => {
  switch (priority.split(" ").join().toLowerCase()) {
    case "urgent":
      return (
        <SVGIcon className="flex w-5" svgString={RAW_ICONS.UrgentPriority} />
      );
    case "high":
      return (
        <SVGIcon className="flex w-5" svgString={RAW_ICONS.HighPriority} />
      );
    case "medium":
      return (
        <SVGIcon className="flex w-5" svgString={RAW_ICONS.MediumPriority} />
      );
    case "low":
      return <SVGIcon className="flex w-5" svgString={RAW_ICONS.LowPriority} />;
    default:
      return <SVGIcon className="flex w-5" svgString={RAW_ICONS.NoPriority} />;
  }
};
