"use client";

import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import { BlurFade } from "../magicui/blur-fade";
import Image from "next/image";
import homebannerImg from "@/public/banner/homebannertwo.png";
import grid from "@/public/assets/bg/grid.svg";
import spinner from "@/public/assets/loader/spinner.svg";
import { customToast } from "@/lib/custom-toast";
import { motion } from "framer-motion";

const emailSchema = z.string().email({ message: "Invalid email address" });

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const waitListCall = async (): Promise<void> => {
    try {
      setIsLoading(true);

      // Basic client-side validation
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        customToast.warning({
          title: "",
          description: `The email body is invalid`,
        });
        return;
      }

      const response = await axios.post<{ message: string; emailId?: string }>(
        "/api/waitlist",
        {
          userEmail: email.trim(),
        },
      );

      if (response.data) {
        customToast.info({
          title: "",
          description: `${response.data.message}`,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        customToast.error({
          title: "",
          description: error.response?.data?.message || "An error occurred",
        });
      } else {
        customToast.error({
          title: "",
          description: "An error occurred",
        });
      }
    } finally {
      setEmail("");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === "Enter" && !isLoading) {
      waitListCall();
    }
  };

  return (
    <div className="">
      <div className="relative h-[300px] sm:h-[400px] flex px-4 sm:px-6 md:px-10 lg:px-14 xl:px-28 2xl:px-40 justify-center items-center ">
        <Image className="absolute opacity-20 z-0" src={grid} alt="" />
        <div className=" flex flex-col items-center md:font-bold ">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold md:mb-2"
          >
            Streamline your workflow
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-x-1 xl:gap-x-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
          >
            Amplify your impact with
            <p className="text-transparent bg-gradient-to-b from-gray-600 via-gray-400 to-white bg-clip-text ml-2">
              Zenorizon
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-4 flex flex-col items-center font-extralight text-[#AEAEAE] text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
          >
            <p>Introducing the system for modern software development.</p>
            <p>Organize issues, projects, and product roadmaps.</p>
          </motion.div>
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
      className="px-4 sm:px-6 md:px-10 lg:px-14 xl:px-28 2xl:px-40"
    >
      <div className="relative flex justify-center border-t border-[#313032c6] rounded-2xl p-1 md:p-2 bg-[#0A0A0A]">
        <Image
          className="rounded-[11px] border border-[#313032] mask-bottom-dark"
          src={homebannerImg}
          alt="img"
        />
      </div>
    </BlurFade>
  );
};
