"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().email({ message: "Invalid email address" });

export default function Landing() {
  const [email, setEmail] = useState("");

  const waitListCall = async () => {
    try {
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
    }
  };

  return (
    <div className="min-h-screen">
      <div className="h-96 flex justify-center items-center">
        <div className="w-[90%] ">
          <p className="text-6xl">Streamline your workflow,</p>
          <div className="flex">
            <p className="text-6xl mr-3">Amplify your impact with </p>
            <span className="text-6xl text-transparent bg-gradient-to-b from-gray-600 via-gray-400 to-white bg-clip-text mb-5 font-bold">
              Zenorizon
            </span>
          </div>

          <div className=" mt-5 flex gap-x-2">
            <div className="border border-[#565555] h-12 w-96 rounded-md bg-[#121212]">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="rounded-md h-full w-full bg-transparent px-3 outline-none font-extralight"
                placeholder="you@example.com"
              ></input>
            </div>
            <button
              onClick={waitListCall}
              className="h-12 px-4 rounded-md text-black bg-white"
            >
              Join waitlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
