"use client";

import { toast } from "sonner";
import React from "react";

export default function AuthButton({
  btnTitle,
  btnbg,
  btnHoverBg,
  working,
  handleOnClickFunction,
}: {
  btnTitle: string;
  btnbg?: string;
  btnHoverBg?: string;
  working?: boolean;
  handleOnClickFunction?:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined;
}) {
  return (
    <button
      onClick={
        working ? handleOnClickFunction : () => toast.info("Under development!")
      }
      className="w-full border-[1px] border-[#3a3838] h-14 rounded-lg bg-[#121212] hover:border-[#626161] hover:bg-[#222222] transition-all duration-200 "
    >
      {btnTitle}
    </button>
  );
}
