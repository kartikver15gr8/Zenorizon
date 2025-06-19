import { customToast } from "@/lib/custom-toast";
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
  updatedAt,
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
  updatedAt?: string;
}) {
  const date = new Date(updatedAt ? updatedAt : "");
  // Display: "12 May"
  const shortDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  // Tooltip: "12 May 2025, 01:18 PM"
  const fullDate = date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

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
        customToast.info({
          title: "Status changed!",
          description: `Status set to ${option} successfully.`,
        });
      } else {
        customToast.error({
          title: "",
          description: "Failed to update issue.",
        });
      }
    } catch (error) {
      console.error("Error updating project:", error);
      customToast.error({
        title: "",
        description: "Failed to update issue.",
      });
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
        customToast.info({
          title: "Priority changed!",
          description: `Priority set to ${option} successfully.`,
        });
      } else {
        customToast.error({
          title: "",
          description: "Failed to update issue.",
        });
      }
    } catch (error) {
      console.error("Error updating project:", error);
      customToast.error({
        title: "",
        description: "Failed to update issue.",
      });
    }
  };

  return (
    <div className="h-14 rounded-lg border border-transparent hover:bg-[#1C1D21]  hover:border-[#2E3035] transition-all duration-200 px-3 grid grid-cols-12 items-center text-xs md:text-sm xl:text-[15px] cursor-pointer">
      <div className=" col-span-5 sm:col-span-4 flex items-center  gap-x-5 ">
        {status ? (
          <RenderStatusSvg status={status} />
        ) : (
          <div className="border rounded-full h-5 w-5"></div>
        )}
        <p className="text-sm xl:text-[16px]">{title}</p>
      </div>
      <p
        className="hidden sm:block col-span-1 cursor-pointer"
        title={projectKey}
      >
        {projectKey ? projectKey.slice(0, 3).toUpperCase() : "ZEN-1"}
      </p>
      <div className="col-span-1 relative " ref={dropdownRef}>
        <div
          className="w-fit flex items-center  px-2 h-8 rounded hover:bg-[#212227] transition-all duration-300 cursor-pointer"
          onClick={() =>
            setShowOptionsDropdown(
              showOptionsDropdown == "status" ? false : "status"
            )
          }
        >
          {status}
        </div>
        {showOptionsDropdown == "status" && (
          <div className="absolute w-36 top-full left-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-lg border border-[#414141] rounded-lg shadow-lg mt-1 z-10">
            {IssueStatus.map((option, key) => (
              <div
                key={key}
                className="px-2 flex gap-x-2 rounded-lg items-center py-2 hover:bg-[#151818] cursor-pointer text-white "
                onClick={() => handleStatusOptionClick(option.title)}
              >
                <SVGIcon className="flex w-4" svgString={option.svg} />
                <p>{option.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-span-1 relative " ref={dropdownRef}>
        <div
          className="flex items-center justify-center h-8 w-8 rounded hover:bg-[#212227] transition-all duration-300 cursor-pointer"
          onClick={() =>
            setShowOptionsDropdown(
              showOptionsDropdown == "priority" ? false : "priority"
            )
          }
        >
          {renderPrioritySvg(selectedPriorityOption)}
        </div>
        {showOptionsDropdown == "priority" && (
          <div className="absolute w-36 top-full left-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-lg border border-[#414141] rounded-lg shadow-lg mt-1 z-10">
            {priorityOptionsArray.map((option, key) => (
              <div
                key={key}
                className="px-2 py-2 hover:bg-[#151818] cursor-pointer text-white flex items-center  gap-x-2"
                onClick={() => handlePriorityOptionClick(option.name)}
              >
                <SVGIcon className="flex w-4" svgString={option.svg} />
                <p className="">{option.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div title={fullDate} className="col-span-1 cursor-pointer ">
        {shortDate}
      </div>
      <div className="col-span-1 border border-[#2C2E33] h-7 w-7 rounded-full flex items-center justify-center hover:bg-[#4141414f] transition-all duration-200">
        <SVGIcon className="flex w-6" svgString={RAW_ICONS.AssignedUser} />
      </div>
      <p className="col-span-3">update</p>
    </div>
  );
}

export const renderPrioritySvg = (priority: string) => {
  switch (priority.split(" ").join().toLowerCase()) {
    case "urgent":
      return (
        <SVGIcon className="flex w-4" svgString={RAW_ICONS.UrgentPriority} />
      );
    case "high":
      return (
        <SVGIcon className="flex w-4" svgString={RAW_ICONS.HighPriority} />
      );
    case "medium":
      return (
        <SVGIcon className="flex w-4" svgString={RAW_ICONS.MediumPriority} />
      );
    case "low":
      return <SVGIcon className="flex w-4" svgString={RAW_ICONS.LowPriority} />;
    default:
      return <SVGIcon className="flex w-4" svgString={RAW_ICONS.NoPriority} />;
  }
};

export const RenderStatusSvg = ({ status }: { status: string }) => {
  switch (status.split(" ").join().toLowerCase()) {
    case "working":
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
