"use client";
import { RAW_ICONS } from "@/lib/icons";
import SVGIcon from "@/lib/svg-icon";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const icons = RAW_ICONS;

export default function Projects() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session?.user.email) {
      router.push("/");
    }
  }, [router, session?.user.email]);
  return (
    <>
      <div className="w-full  bg-[#0A0A0A] h-screen flex flex-col">
        <div className="flex justify-center items-center gap-x-1 h-10 md:h-12">
          <SVGIcon className="flex w-3 sm:w-4" svgString={icons.RubiksCube} />
          <p className="text-[13px] sm:text-[15px]">Projects</p>
        </div>

        <div className="flex-grow border border-[#414141] bg-[#0F1111] rounded-lg ml-2 md:ml-0 mr-2 mb-2 p-1">
          <div className="border h-10 rounded border-[#2d3036] flex items-center justify-between px-4">
            <div className=" flex gap-x-2 md:gap-x-4 items-center ">
              <p className="">Projects</p>
              <div className="flex h-7 items-center gap-x-1 cursor-pointer border border-[#2E3035] px-2 rounded bg-[#1C1D21] hover:bg-[#1C1D21] transition-all duration-300">
                <SVGIcon className="flex w-3" svgString={icons.Cube} />
                <p>All projects</p>
              </div>
            </div>
            <div className="flex gap-x-2 md:gap-x-4 ">
              <div className="flex h-7 items-center gap-x-1 cursor-pointer border border-transparent  px-2 rounded hover:bg-[#1C1D21] hover:border-[#2E3035] transition-all duration-300">
                <SVGIcon className="flex w-3" svgString={icons.Add} />
                <p>Create project</p>
              </div>
            </div>
          </div>
          <ProjectTopTile />
        </div>
      </div>
      <CreateProjectWindow />
    </>
  );
}

const ProjectTopTile = () => {
  return (
    <div className="border-b h-10 border-[#2E3035] grid grid-cols-12 px-4 items-center text-[#97989A]">
      <p className="col-span-5">Title</p>
      <p className="col-span-2">Health</p>
      <p className="col-span-1">Priority</p>
      <p className="col-span-1">Lead</p>
      <p className="col-span-2">Target Date</p>
      <p className="col-span-1">Status</p>
    </div>
  );
};

const CreateProjectWindow = () => {
  const [projTitle, setProjTitle] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [projContent, setProjContent] = useState("");

  const { data: session } = useSession();

  const createProject = async () => {
    try {
      const response = await axios.post("/api/project/createproject", {
        projTitle: projTitle,
        projDescription: projDescription,
        projContent: projContent,
        createdBy: session?.user.id,
      });

      toast.info(response.data.message);
    } catch (error) {
      toast.info("Error occured while creating project");
    }
  };

  return (
    <div className="absolute bg-[rgba(0,0,0,0.1)] backdrop-blur-lg w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-14 xl:px-44">
      <div className="flex flex-col border border-[#393B42] w-full h-[550px] lg:h-[600px] xl:h-[700px] rounded-xl bg-[#0F1111] px-2 md:px-4 xl:px-5 pt-2 md:pt-4 xl:pt-5">
        <div className=" h-10 flex justify-between items-center gap-x-2">
          <div className="flex items-center">
            <div className="border border-[#2E3035] bg-[#1C1D21] rounded h-9 w-20 flex justify-center items-center">
              <p>Team</p>
            </div>
            <SVGIcon className="flex w-t" svgString={icons.ArrowRight} />
            <p>New Project</p>
          </div>
          <SVGIcon className="flex w-5" svgString={icons.Close} />
        </div>

        <div className="mt-5">
          <input
            className=" text-3xl w-full outline-none"
            placeholder="Project name"
            value={projTitle}
            onChange={(e) => {
              setProjTitle(e.target.value);
            }}
          />
          <input
            className=" text-lg w-full outline-none mt-3"
            placeholder="Add some description…"
            value={projDescription}
            onChange={(e) => {
              setProjDescription(e.target.value);
            }}
          />
        </div>

        <div className="flex-grow mt-10 font-extralight">
          <textarea
            className="text-lg w-full outline-none h-full resize-none"
            placeholder="Add project brief, long description, collect ideas and resources…"
            value={projContent}
            onChange={(e) => {
              setProjContent(e.target.value);
            }}
          />
        </div>

        <div className="border-t border-[#393B42] w-full h-20 flex items-center justify-end gap-x-3">
          <button className="px-2 border border-[#393B42] rounded-md h-9">
            Cancel
          </button>
          <button
            onClick={createProject}
            className="px-2 border border-[#6D78E7] bg-[#5E6AD2] rounded-md h-9"
          >
            Create project
          </button>
        </div>
      </div>
    </div>
  );
};
