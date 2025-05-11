"use client";
import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import axios from "axios";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { renderPrioritySvg, RenderStatusSvg } from "./issue-label";
import { IssueStatus, PriorityOptionsArray } from "@/utils/issues-view-options";

export const CreateIssueWindow = ({
  setClose,
  project_id,
  project_title,
}: {
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  project_id: string | null;
  project_title: string | undefined;
}) => {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  const [selectedPriorityOption, setSelectedPriorityOption] =
    useState("No Priority");
  const [selectedStatusOption, setSelectedStatusOption] = useState("Working");
  const [showOptionsDropdown, setShowOptionsDropdown] = useState<
    "status" | "priority" | boolean
  >(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const createIssue = async () => {
    try {
      const response = await axios.post("/api/issues/createissue", {
        issueTitle: issueTitle,
        issueDescription: issueDescription,
        issueStatus: selectedStatusOption,
        issuePriority: selectedPriorityOption,
        projectId: project_id,
      });

      toast.info(response.data.message);
    } catch (error) {
      toast.info("Error occured while creating project");
    } finally {
      setClose(false);
    }
  };

  const handlePriorityOptionClick = async (option: string) => {
    setSelectedPriorityOption(option);
    setShowOptionsDropdown(false);
  };

  const handleStatusOptionClick = async (option: string) => {
    setSelectedStatusOption(option);
    setShowOptionsDropdown(false);
  };

  return (
    <div className="absolute bg-[rgba(0,0,0,0.1)] backdrop-blur-lg w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-44">
      {/* Issue Box */}

      <div className="border border-[#393B42] bg-[#0F1111] rounded-xl h-96 w-[95%] xl:w-[70%] p-4 flex flex-col">
        <div className="flex items-center justify-between flex-shrink-0">
          <div className="flex items-center">
            <div className="w-20 border border-[#2D3035] h-8 rounded-lg flex items-center justify-center font-medium">
              {project_title?.toUpperCase().slice(0, 3)}
            </div>
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
        <div className=" h-fit mb-4 items-center flex text-[#caccd4]">
          <div className="flex items-center gap-x-2">
            <div className=" relative" ref={dropdownRef}>
              <div
                className="flex border border-[#6A6C75] bg-[#1f2025] items-center text-sm justify-center h-7 w-8 rounded-md hover:bg-[#212227] transition-all duration-300 cursor-pointer"
                onClick={() => setShowOptionsDropdown("priority")}
              >
                {renderPrioritySvg(selectedPriorityOption)}
              </div>
              {showOptionsDropdown == "priority" && (
                <div className="absolute w-28 top-full left-0 bg-[#0A0A0A] border border-[#414141] rounded shadow-lg mt-1 z-10">
                  {PriorityOptionsArray.map((option, key) => (
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

            <div className="col-span-1 relative" ref={dropdownRef}>
              <div
                className="flex border border-[#6A6C75] bg-[#1f2025] items-center text-sm justify-center h-7 w-8 rounded-md hover:bg-[#212227] transition-all duration-300 cursor-pointer"
                onClick={() => setShowOptionsDropdown("status")}
              >
                <RenderStatusSvg status={selectedStatusOption} />
              </div>
              {showOptionsDropdown == "status" && (
                <div className="absolute w-36 top-full left-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-lg border border-[#414141] rounded-lg shadow-lg mt-1 z-10">
                  {IssueStatus.map((option, key) => (
                    <div
                      key={key}
                      className="px-2 flex gap-x-2 rounded-lg items-center py-2 hover:bg-[#151818] cursor-pointer text-white text-sm"
                      onClick={() => handleStatusOptionClick(option.title)}
                    >
                      <SVGIcon className="flex w-4" svgString={option.svg} />
                      <p>{option.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button className="border border-[#696c75] bg-[#1f2025] rounded-md text-sm px-2 h-7">
              Assignee
            </button>
          </div>
        </div>
        <div className=" justify-end flex items-center">
          <button
            onClick={createIssue}
            className="bg-gradient-to-b from-[#6A6C75] to-[#35373E] text-white  px-2 rounded-md h-8"
          >
            Create issue
          </button>
        </div>
      </div>
    </div>
  );
};
