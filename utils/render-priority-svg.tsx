import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";

export const renderPrioritySvg = (priority: string) => {
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
