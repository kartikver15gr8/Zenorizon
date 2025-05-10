import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import { IssueStatus } from "@/utils/issues-view-options";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function IssueLabel({
  title,
  description,
  projectKey,
  priority,
  createdAt,
  status,
  update,
  assigedUser,
  projectID,
  issueID,
}: {
  title: string;
  description?: string;
  projectKey?: string;
  priority?: string;
  createdAt?: string;
  status?: string;
  update?: string;
  assigedUser?: string;
  projectID: string | null;
  issueID: string;
}) {
  const [selectedStatusOption, setSelectedStatusOption] = useState(status);

  const [showOptionsDropdown, setShowOptionsDropdown] = useState<
    "status" | "priority" | boolean
  >(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedPriorityOption, setSelectedPriorityOption] = useState(
    priority ? priority : "No Priority"
  );

  const priorityOptionsArray = [
    { name: "Urgent", svg: RAW_ICONS.UrgentPriority },
    { name: "No Priority", svg: RAW_ICONS.NoPriority },
    { name: "High", svg: RAW_ICONS.HighPriority },
    { name: "Medium", svg: RAW_ICONS.MediumPriority },
    { name: "Low", svg: RAW_ICONS.LowPriority },
  ];

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

  const handleStatusOptionClick = async (option: string) => {
    setSelectedStatusOption(option);

    setShowOptionsDropdown(false);
    try {
      const response = await axios.patch("/api/issues/updateissue", {
        issueId: issueID,
        issueStatus: option,
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
      const response = await axios.patch("/api/issues/updateissue", {
        issueId: issueID,
        issuePriority: option,
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
    <div className="h-14 rounded-lg border border-transparent hover:bg-[#1C1D21]  hover:border-[#2E3035] transition-all duration-200 px-3 grid grid-cols-12 items-center ">
      <div className=" col-span-4 flex items-center  gap-x-5">
        {status ? (
          <RenderStatusSvg status={status} />
        ) : (
          <div className="border rounded-full h-5 w-5"></div>
        )}
        <p>{title}</p>
      </div>
      <p className="col-span-1">{projectKey ? projectKey : "ZEN-1"}</p>
      <div className="col-span-1 relative" ref={dropdownRef}>
        <div
          className="w-fit flex items-center text-sm px-2 h-8 rounded hover:bg-[#212227] transition-all duration-300 cursor-pointer"
          onClick={() => setShowOptionsDropdown("status")}
        >
          {status}
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
      <div className="col-span-1 relative" ref={dropdownRef}>
        <div
          className="flex items-center text-sm justify-center h-8 w-8 rounded hover:bg-[#212227] transition-all duration-300 cursor-pointer"
          onClick={() => setShowOptionsDropdown("priority")}
        >
          {renderPrioritySvg(selectedPriorityOption)}
        </div>
        {showOptionsDropdown == "priority" && (
          <div className="absolute top-full left-0 bg-[#0A0A0A] border border-[#414141] rounded shadow-lg mt-1 z-10">
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

      <p className="col-span-2 ">update</p>
      <p className="col-span-1 ">date</p>
      <p className="col-span-1 ">Assigned to</p>
    </div>
  );
}

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

const RenderStatusSvg = ({ status }: { status: string }) => {
  switch (status.split(" ").join().toLowerCase()) {
    case "in progress":
      return <SVGIcon className="flex w-5" svgString={RAW_ICONS.InProgress} />;
    case "completed":
      return (
        <SVGIcon className="flex w-5" svgString={RAW_ICONS.CompletedIssue} />
      );
    case "backlog":
      return (
        <SVGIcon className="flex w-5" svgString={RAW_ICONS.DashedCircle} />
      );
    case "cancelled":
      return (
        <SVGIcon className="flex w-5" svgString={RAW_ICONS.CancelledIssue} />
      );
    case "planned":
      return (
        <SVGIcon className="flex w-5" svgString={RAW_ICONS.PlannedIssue} />
      );
    default:
      return <SVGIcon className="flex w-5" svgString={RAW_ICONS.Todo} />;
  }
};
