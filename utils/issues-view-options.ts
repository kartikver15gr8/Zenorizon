import { RAW_ICONS } from "@/lib/icons";

export const IssueViewOptArray: { title: string; svg: string }[] = [
  { title: "All issues", svg: RAW_ICONS.Stack },
  { title: "Active", svg: RAW_ICONS.ActiveIssue },
  { title: "Inactive", svg: RAW_ICONS.InactiveIssue },
  { title: "In progress", svg: RAW_ICONS.InProgress },
  { title: "Completed", svg: RAW_ICONS.CompletedIssue },
  { title: "Backlog", svg: RAW_ICONS.DashedCircle },
  { title: "Cancelled", svg: RAW_ICONS.CancelledIssue },
  { title: "Planned", svg: RAW_ICONS.PlannedIssue },
];

export const IssueStatus: { title: string; svg: string }[] = [
  { title: "In progress", svg: RAW_ICONS.InProgress },
  { title: "Completed", svg: RAW_ICONS.CompletedIssue },
  { title: "Backlog", svg: RAW_ICONS.DashedCircle },
  { title: "Cancelled", svg: RAW_ICONS.CancelledIssue },
  { title: "Planned", svg: RAW_ICONS.PlannedIssue },
];
