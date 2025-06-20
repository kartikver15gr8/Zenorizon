import { toast } from "sonner";
import { X } from "lucide-react";
import { ReactNode } from "react";
import SVGIcon from "./svg-icon";
import { RAW_ICONS } from "./icons";

type ToastOptions = {
  title?: string;
  description: string | ReactNode;
  icon?: ReactNode;
};

export const customToast = {
  info: ({
    title = "Info",
    description,
    icon = <SVGIcon className="flex w-5" svgString={RAW_ICONS.ToastInfo} />,
  }: ToastOptions) => {
    toast.custom((t) => (
      <ToastBody
        onDismiss={() => toast.dismiss(t)}
        icon={icon}
        title={title}
        description={description}
      />
    ));
  },
  success: ({
    title = "Success",
    description,
    icon = <SVGIcon className="flex w-5" svgString={RAW_ICONS.ToastSuccess} />,
  }: ToastOptions) => {
    toast.custom((t) => (
      <ToastBody
        onDismiss={() => toast.dismiss(t)}
        icon={icon}
        title={title}
        description={description}
      />
    ));
  },
  error: ({
    title = "Error",
    description,
    icon = <SVGIcon className="flex w-5" svgString={RAW_ICONS.ToastError} />,
  }: ToastOptions) => {
    toast.custom((t) => (
      <ToastBody
        onDismiss={() => toast.dismiss(t)}
        icon={icon}
        title={title}
        description={description}
      />
    ));
  },
  warning: ({
    title = "Warning",
    description,
    icon = <SVGIcon className="flex w-5" svgString={RAW_ICONS.ToastWarning} />,
  }: ToastOptions) => {
    toast.custom((t) => (
      <ToastBody
        onDismiss={() => toast.dismiss(t)}
        icon={icon}
        title={title}
        description={description}
      />
    ));
  },
};

const ToastBody = ({
  icon,
  title,
  description,
  onDismiss,
}: {
  icon: ReactNode;
  title: string;
  description: ReactNode | string;
  onDismiss: () => void;
}) => {
  return (
    <div
      onClick={onDismiss}
      className="max-w-sm w-full rounded-xl bg-white/10 dark:bg-zinc-900/30 backdrop-blur-md shadow-xl ring-1 ring-white/10 px-4 py-3 text-white cursor-pointer flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <div className="flex flex-col">
          {title && <p className="text-sm font-semibold">{title}</p>}
          <p className="text-sm text-[#a4a6aa]">{description}</p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        className="ml-4 "
      >
        <X className="w-4 h-4 cursor-pointer" />
      </button>
    </div>
  );
};
