import { RAW_ICONS } from "@/lib/icons";

export const healthOptions = [
  { name: "Completed", svg: RAW_ICONS.CompletedIssue },
  { name: "Working", svg: RAW_ICONS.WorkingStatus },
  { name: "Cancelled", svg: RAW_ICONS.CancelledIssue },
  { name: "Backlog", svg: RAW_ICONS.BacklogStatus },
  { name: "Planned", svg: RAW_ICONS.PlannedIssue },
];

export const priorityOptionsArray = [
  { name: "Urgent", svg: RAW_ICONS.UrgentPriority },
  { name: "No Priority", svg: RAW_ICONS.NoPriority },
  { name: "High", svg: RAW_ICONS.HighPriority },
  { name: "Medium", svg: RAW_ICONS.MediumPriority },
  { name: "Low", svg: RAW_ICONS.LowPriority },
];
