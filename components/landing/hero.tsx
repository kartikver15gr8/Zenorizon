"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { BlurFade } from "../magicui/blur-fade";
import Image from "next/image";
import homebannerImg from "@/public/banner/homebannertwo.png";

import bg from "@/public/assets/bg/bg.svg";
import grid from "@/public/assets/bg/grid.svg";
import spinner from "@/public/assets/loader/spinner.svg";

const emailSchema = z.string().email({ message: "Invalid email address" });

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const waitListCall = async (): Promise<void> => {
    try {
      setIsLoading(true);

      // Basic client-side validation
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        toast.warning("Invalid email format");
        return;
      }

      const response = await axios.post<{ message: string; emailId?: string }>(
        "/api/waitlist",
        {
          userEmail: email.trim(),
        }
      );

      if (response.data) {
        toast.success(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error occurred");
      }
    } finally {
      setEmail("");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "Enter" && !isLoading) {
      waitListCall();
    }
  };

  return (
    <div className="">
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] flex px-4 sm:px-6 md:px-10 lg:px-14 xl:px-28 justify-center items-center">
        <Image className="absolute opacity-20 z-0" src={bg} alt="" />
        <div className=" flex flex-col items-center md:font-bold ">
          <BlurFade
            delay={0.5}
            inView
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-1 md:mb-2"
          >
            Streamline your workflow,
          </BlurFade>
          <BlurFade
            delay={0.75}
            inView
            className="flex flex-wrap justify-center items-center gap-x-1 xl:gap-x-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
          >
            Amplify your impact with
            <p className="text-transparent bg-gradient-to-b from-gray-600 via-gray-400 to-white bg-clip-text ml-2">
              Zenorizon
            </p>
          </BlurFade>
          <div className="mt-4 flex flex-col items-center font-extralight text-[#AEAEAE] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
            <BlurFade delay={1} inView>
              Introducing the system for modern software development.
            </BlurFade>
            <BlurFade delay={1.2} inView>
              Organize issues, projects, and product roadmaps.
            </BlurFade>
          </div>

          <BlurFade inView delay={1} className=" mt-10 flex gap-x-2">
            <div className="border border-[#565555] h-10 md:h-12 w-fit bg-[#121212] flex items-center p-1 rounded-full">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="rounded-md h-full bg-transparent px-3 outline-none font-extralight w-60 sm:w-64 md:w-96 text-[14px] sm:text-sm md:text-[16px]"
                placeholder="Email"
                value={email}
                disabled={isLoading}
                onKeyDown={handleKeyPress}
              ></input>
              <button
                onClick={waitListCall}
                disabled={(email.length == 0 ? true : false) || isLoading}
                className="h-full px-4 text-[14px] sm:text-sm md:text-[16px] rounded-full text-white bg-[#27272A] border border-[#565555]"
              >
                {!isLoading ? "Join waitlist" : <Image src={spinner} alt="" />}
              </button>
            </div>
          </BlurFade>
        </div>
      </div>
      <HomeBanner />
    </div>
  );
}

const HomeBanner = () => {
  return (
    <BlurFade
      delay={1}
      inView
      className="px-4 sm:px-6 md:px-10 lg:px-14 xl:px-28"
    >
      <div className=" bg-black flex justify-center border-4 md:border-[8px] border-[#363636] rounded-xl ">
        <Image
          className="rounded-lg md:rounded-md"
          src={homebannerImg}
          alt="img"
        />
      </div>
    </BlurFade>
  );
};
