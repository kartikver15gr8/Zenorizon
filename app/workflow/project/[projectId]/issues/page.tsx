"use client";

import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import { IssueBody, ProjectBody } from "@/utils/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { usePathname, useSearchParams } from "next/navigation";
import IssueLabel from "@/components/workflow/issues/issue-label";
import { IssueViewOptArray } from "@/utils/issues-view-options";
import { CreateIssueWindow } from "@/components/workflow/issues/create-issue-window";
import IssuesTopTile from "@/components/workflow/issues/issues-top-tile";
import { WorkflowLayout } from "@/components/workflow/workflow-layout";

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
  const [statusFilter, setStatusFilter] = useState("");

  const filteredIssues = statusFilter
    ? issues?.filter(
        (issue) => issue.status?.toLowerCase() === statusFilter.toLowerCase()
      )
    : issues;

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
      <WorkflowLayout windowSvg={RAW_ICONS.Issue} windowTitle="Issues">
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
                {project ? project.title : "Loading…"}
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

        <div
          className="
    h-10 border-b border-[#2E3035] flex items-center px-2 gap-x-2
    overflow-x-auto whitespace-nowrap
    sm:overflow-x-visible scrollbar-hide
  "
        >
          {IssueViewOptArray.map((elem, key) => (
            <IssuesViewButton
              key={key}
              title={elem.title}
              svg={elem.svg}
              filter={statusFilter}
              setFilter={setStatusFilter}
            />
          ))}
        </div>

        <IssuesTopTile />

        {isLoading ? (
          <div className="h-10 flex items-center justify-center">
            <SVGIcon svgString={RAW_ICONS.Loader} />
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto h-96 scrollbar-hide pt-1 ">
            {filteredIssues && filteredIssues?.length > 0 ? (
              filteredIssues?.map((elem, key) => {
                return (
                  <IssueLabel
                    key={key}
                    title={elem.title}
                    projectID={project_id}
                    projectKey={project?.title}
                    issueID={elem.id}
                    priority={elem.priority}
                    status={elem.status}
                    updatedAt={elem.updatedAt}
                  />
                );
              })
            ) : (
              <div className="h-10 flex items-center w-full justify-center">
                <p className="text-[#939494]">No Issues Found</p>
              </div>
            )}
          </div>
        )}
      </WorkflowLayout>

      {createIssueWindowOpen && (
        <CreateIssueWindow
          setClose={setCreateIssueWindowOpen}
          project_id={project_id}
          project_title={project?.title}
        />
      )}
    </>
  );
}

const IssuesViewButton = ({
  title,
  svg,
  filter,
  setFilter,
}: {
  title: string;
  svg: string;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <button
      onClick={
        title.toLowerCase() === "all issues"
          ? () => setFilter("")
          : () => setFilter(title)
      }
      className={
        (filter === title ? "bg-[#1C1D21] " : "") +
        "flex items-center gap-x-1 border border-[#2C2E34] h-7 px-2 rounded-md text-[#9a9a9a] text-sm hover:bg-[#1c1e22] transition-all duration-300 min-w-[90px] flex-shrink-0"
      }
    >
      <SVGIcon className="flex w-4" svgString={svg} />
      <p className="truncate">{title}</p>
    </button>
  );
};
