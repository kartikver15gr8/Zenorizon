"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { TextAnimate } from "./magicui/text-animate";
import { BlurFade } from "./magicui/blur-fade";
import Image from "next/image";
import homebannerImg from "@/public/banner/homebanner.png";
import { HyperText } from "./magicui/hyper-text";
import grid from "@/public/assets/bg/grid.svg";
import spinner from "@/public/assets/loader/spinner.svg";

const emailSchema = z.string().email({ message: "Invalid email address" });

const active =
  "h-10 md:h-12 px-4 text-xs sm:text-sm font-extralight md:text-lg rounded-md text-black bg-white";

const disable =
  "h-10 md:h-12 px-4 text-xs sm:text-sm font-extralight md:text-lg rounded-md text-black bg-black bg-opacity-50 border border-white";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [loading, setIsLoading] = useState(false);

  const waitListCall = async () => {
    try {
      setIsLoading(true);
      const emailcheck = emailSchema.safeParse(email.trim());
      if (emailcheck.success) {
        const response = await axios.post("/api/waitlist", {
          userEmail: email.trim(),
        });
        if (response.data) {
          toast.info(response.data.message);
        }
        return response.data;
      } else {
        toast.warning("Invalid email body");
      }
    } catch (error) {
      toast.info(`${error}`);
    } finally {
      setEmail("");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] flex px-4 sm:px-6 md:px-10 lg:px-14 xl:px-28 justify-center items-center">
        <Image className="absolute opacity-20 z-0" src={grid} alt="" />
        <div className=" flex flex-col items-center md:font-bold ">
          <BlurFade
            delay={0.5}
            inView
            className="md:mb-2 text-2xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl"
          >
            Streamline your workflow,
          </BlurFade>
          <BlurFade
            delay={0.75}
            inView
            className="text-2xl sm:text-4xl flex-wrap justify-center md:text-4xl lg:text-5xl xl:text-6xl flex gap-x-1 xl:gap-x-3"
          >
            Amplify your impact with
            <p className="mt-1 sm:mt-0 text-transparent bg-gradient-to-b from-gray-600 via-gray-400 to-white bg-clip-text mb-5  text-5xl sm:text-4xl lg:text-5xl xl:text-6xl">
              Zenorizon
            </p>
          </BlurFade>
          <div className="flex font-extralight flex-col items-center text-sm md:text-lg xl:text-xl  text-[#AEAEAE]">
            <HyperText className="text-[10px] sm:text-xs md:text-sm">
              Introducing the system for modern software development.
            </HyperText>

            <HyperText className="text-[10px] sm:text-xs md:text-sm">
              Organize issues, projects, and product roadmaps.
            </HyperText>
          </div>

          <BlurFade inView delay={1} className=" mt-10 flex gap-x-2">
            <div className="border border-[#565555] h-10 md:h-12 w-60 sm:w-64 md:w-96 rounded-md bg-[#121212]">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="rounded-md h-full w-full bg-transparent px-3 outline-none font-extralight"
                placeholder="you@example.com"
                value={email}
              ></input>
            </div>
            <button
              onClick={waitListCall}
              disabled={(email.length == 0 ? true : false) || loading}
              className={loading ? disable : active}
            >
              {!loading ? "Join waitlist" : <Image src={spinner} alt="" />}
            </button>
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
      <div className=" bg-black flex justify-center border-4 md:border-[8px] border-[#363635] rounded-xl ">
        <Image
          className="rounded-lg md:rounded-md"
          src={homebannerImg}
          alt="img"
        />
      </div>
    </BlurFade>
  );
};
