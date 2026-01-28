"use client";
import { motion } from "motion/react";

const topCard = {
  rest: { rotate: 0 },
  hover: { rotate: 0 },
};

const middleCard = {
  rest: { rotate: 0 },
  hover: { rotate: 6 },
};

const bottomCard = {
  rest: { rotate: 0 },
  hover: { rotate: -6 },
};

export default function SlideCardStack() {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      className="border border-[#373737] h-96 w-96 rounded-2xl relative "
    >
      {/* Bottom card (tilts UP) */}
      <motion.div
        variants={bottomCard}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformOrigin: "top left" }}
        className="absolute inset-0 m-auto w-72 h-44 translate-y-2 rounded-2xl border border-[#272628] bg-[#121212] p-6 text-[#848484] shadow-xl"
      >
        <h3 className="text-lg font-semibold">Bottom Card</h3>
        <p className="text-sm opacity-70">Tilts up on hover</p>

        <div className="mt-5 h-3 bg-[#272628] rounded-sm" />
        <div className="mt-2 h-3 bg-[#272628] rounded-sm" />
      </motion.div>

      {/* Middle card (tilts DOWN) */}
      <motion.div
        variants={middleCard}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformOrigin: "top left" }}
        className="absolute inset-0 m-auto w-72 h-44 translate-y-1 rounded-2xl border border-[#272628] bg-[#121212] p-6 text-[#848484] shadow-xl"
      >
        <h3 className="text-lg font-semibold">Middle Card</h3>
        <p className="text-sm opacity-70">Tilts down on hover</p>

        <div className="mt-5 h-3 bg-[#272628] rounded-sm" />
        <div className="mt-2 h-3 bg-[#272628] rounded-sm" />
      </motion.div>

      {/* Top card (does NOTHING) */}
      <motion.div
        variants={topCard}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformOrigin: "top left" }}
        className="absolute inset-0 m-auto w-72 h-44 rounded-2xl border border-[#272628] bg-[#121212] p-6 text-[#848484] shadow-xl"
      >
        <div className="text-lg font-semibold h-10 w-10 rounded-full bg-[#272628]"></div>
        <p className="text-sm opacity-70 bg-[#272628] h-3 w-12 rounded-md mt-3"></p>

        <div className="mt-5 h-3 bg-[#272628] rounded-sm" />
        <div className="mt-2 h-3 bg-[#272628] rounded-sm" />
      </motion.div>
    </motion.div>
  );
}
