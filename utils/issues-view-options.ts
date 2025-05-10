import { RAW_ICONS } from "@/lib/icons";

export const IssueViewOptArray: { title: string; svg: string }[] = [
  { title: "All issues", svg: RAW_ICONS.Stack },
  { title: "Working", svg: RAW_ICONS.InProgress },
  { title: "Completed", svg: RAW_ICONS.CompletedIssue },
  { title: "Backlog", svg: RAW_ICONS.DashedCircle },
  { title: "Cancelled", svg: RAW_ICONS.CancelledIssue },
  { title: "Planned", svg: RAW_ICONS.PlannedIssue },
];

export const IssueStatus: { title: string; svg: string }[] = [
  { title: "Working", svg: RAW_ICONS.InProgress },
  { title: "Completed", svg: RAW_ICONS.CompletedIssue },
  { title: "Backlog", svg: RAW_ICONS.DashedCircle },
  { title: "Cancelled", svg: RAW_ICONS.CancelledIssue },
  { title: "Planned", svg: RAW_ICONS.PlannedIssue },
];

export const PriorityOptionsArray: { name: string; svg: string }[] = [
  { name: "Urgent", svg: RAW_ICONS.UrgentPriority },
  { name: "No Priority", svg: RAW_ICONS.NoPriority },
  { name: "High", svg: RAW_ICONS.HighPriority },
  { name: "Medium", svg: RAW_ICONS.MediumPriority },
  { name: "Low", svg: RAW_ICONS.LowPriority },
];
