import { toast } from 'sonner';
import { X } from 'lucide-react'; 
import { ReactNode } from 'react';

type ToastOptions = {
  title?: string;
  description: string | ReactNode;
  icon?: ReactNode;
};

export const customToast = {
  info: ({ title = 'Info', description, icon = 'ℹ️' }: ToastOptions) => {
    toast.custom((t) => (
      <div
        onClick={() => toast.dismiss(t)}
        className="max-w-sm w-full rounded-xl bg-white/10 dark:bg-zinc-900/30 backdrop-blur-md shadow-xl ring-1 ring-white/10 px-4 py-3 text-white cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">{icon}</span>
          <div className="flex flex-col">
            {title && <p className="text-sm font-semibold">{title}</p>}
            <p className="text-sm text-white/90">{description}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toast.dismiss(t);
          }}
          className="ml-4 text-white/70 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    ));
  },
};
