"use client";

import Image from "next/image";
import Link from "next/link";
import appIcon from "@/public/assets/icons/appIconTwo.svg";
import { motion } from "framer-motion";
import { useState } from "react";

const navListArr = [
  { title: "Product", redirectHref: "" },
  { title: "Resources", redirectHref: "" },
  { title: "Pricing", redirectHref: "" },
  { title: "Contact", redirectHref: "" },
  { title: "Blogs", redirectHref: "" },
];

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const wrapperVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 90 },
  closed: { rotate: 0 },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="py-2 flex px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 ">
        <div className=" h-[55px] border border-[#565555] w-full rounded-lg flex items-center justify-between px-3 bg-[#121212]">
          <Image
            className="w-8"
            src={appIcon}
            alt=""
            width={200}
            height={200}
          />
          <div className="hidden md:flex gap-x-5 z-10">
            {navListArr.map((elem, key) => {
              return (
                <NavListElement
                  title={elem.title}
                  key={key}
                  redirectHref={elem.redirectHref}
                />
              );
            })}
          </div>
          <div className="hidden md:flex items-center gap-x-2">
            <button className="px-4 h-9 rounded hover:bg-[#4f4e4e] transition-all duration-300 cursor-pointer">
              Log in
            </button>
            <button className="border px-4 h-9 rounded text-black bg-white cursor-pointer">
              Signup
            </button>
          </div>
          <div className="md:hidden w-fit flex ml-4">
            <motion.button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
              animate={isOpen ? "open" : "closed"}
            >
              <motion.svg
                className="w-7"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                variants={iconVariants}
              >
                <path
                  d="M1 7H19M1 1H19M1 13H19"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute mt-1 rounded px-4 w-full">
          <motion.div
            className=" z-50 relative w-full border border-[#565555] bg-[#121212] shadow-lg rounded"
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={wrapperVariants}
          >
            <div className="text-white font-medium  flex flex-col shadow-[inset_5px_2px_30px_rgba(0,0,0,0.1)]">
              {navListArr.map((elem, key) => {
                return (
                  <NavLink
                    key={key}
                    href={elem.redirectHref}
                    text={elem.title}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

const NavListElement = ({
  title,
  className,
  redirectHref,
}: {
  title: string;
  className?: string;
  redirectHref: string;
}) => {
  return (
    <Link
      href={redirectHref}
      className={`${className} px-2 rounded hover:text-[#a8a8a8] transition-all duration-300 cursor-pointer`}
    >
      {title}
    </Link>
  );
};

const NavLink = ({
  href,
  text,
  isOpen,
  setIsOpen,
}: {
  href: string;
  text: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <motion.div variants={itemVariants}>
    <Link
      href={href}
      className="h-16 flex items-center hover:bg-[#3e3d3d] transition-all duration-500 px-5 py-2 hover:rounded-md border-b border-[#565555]"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      {text}
    </Link>
  </motion.div>
);
