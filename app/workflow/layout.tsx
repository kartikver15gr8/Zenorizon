import React from "react";
import type { Metadata } from "next";
import WorkflowSidebar from "@/components/workflow/sidebar/workflow-sidebar";
import BottomDock from "@/components/workflow/sidebar/bottom-dock";

export const metadata: Metadata = {
  title: "Zenorizon",
  description: "Workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-8 items-center bg-gradient-to-r from-[#8168CE] via-[#CA3B8F] to-[#5C7FD3] w-full justify-center ">
        <p className="">
          Zenorizon is under development, add yourself in the waitlist to keep
          yourself updated. we&apos;ll ship the app soon 🎉
        </p>
      </div>

      <div className="flex">
        <WorkflowSidebar />
        {children}
      </div>
      <BottomDock />
    </>
  );
}
