"use client";

import Image from "next/image";
import Link from "next/link";
import appIcon from "@/public/assets/icons/appIconTwo.svg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "@/utils/auth";
import { usePathname } from "next/navigation";
import {
  BottomOptionLabel,
  LogoutBtn,
} from "../workflow/sidebar/bottom-options-tile";
import { RAW_ICONS } from "@/lib/icons";
import { customToast } from "@/lib/custom-toast";
import classNames from "classnames";

const optionsArr: {
  title: string;
  svg: string;
  redirectHref: string;
  openToNewPage: boolean;
}[] = [
  {
    title: "Profile",
    svg: RAW_ICONS.User,
    redirectHref: "/profile",
    openToNewPage: false,
  },
  {
    title: "Search for help…",
    svg: RAW_ICONS.Search,
    redirectHref: "",
    openToNewPage: false,
  },
  {
    title: "Shortcuts",
    svg: RAW_ICONS.Keyboard,
    redirectHref: "",
    openToNewPage: false,
  },
  { title: "Docs", svg: RAW_ICONS.Docs, redirectHref: "", openToNewPage: true },
  {
    title: "Contact us",
    svg: RAW_ICONS.ContactUs,
    redirectHref: "",
    openToNewPage: false,
  },
  {
    title: "Community",
    svg: RAW_ICONS.Community,
    redirectHref: "",
    openToNewPage: true,
  },
];

const navListArr = [
  { title: "Workflow", redirectHref: "/workflow/project" },
  { title: "Resources", redirectHref: "" },
  {
    title: "Pricing",
    redirectHref: "",
    onClickHandler: () => {
      const pricingSection = document.getElementById("pricing");
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
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

export default function Navbar() {
  const { data: session, status } = useSession();
  const [signupLoading, setSignupLoading] = useState(false);
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  // options when user logged in
  const [profileTabOpen, setProfileTabOpen] = useState(false);

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleSignout = () => {
    try {
      setSignupLoading(true);
      signOut();
    } catch (error) {
      customToast.error({
        title: "Error occured",
        description: "Got an error while signing up.",
      });
    } finally {
      setSignupLoading(false);
      customToast.success({
        title: "Welcome back",
        description: "Logged in successfully!",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 50) {
        setShowNavbar(false); // Scroll down
      } else {
        setShowNavbar(true); // Scroll up
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <div
        className={`top-0 fixed w-full py-2 flex px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 2xl:px-40 z-50 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className=" h-[55px] border border-[#313032] w-full rounded-xl flex items-center justify-between pl-3 pr-2 bg-[#121212]">
          <Link href="/">
            <Image
              className="w-8"
              src={appIcon}
              alt=""
              width={200}
              height={200}
            />
          </Link>
          <div className="hidden md:flex gap-x-5 z-10">
            {navListArr.map((elem, key) => {
              return (
                <NavListElement
                  title={elem.title}
                  key={key}
                  redirectHref={elem.redirectHref}
                  onClickHandler={elem.onClickHandler}
                />
              );
            })}
          </div>
          <div className="hidden md:flex items-center md:relative ">
            {profileTabOpen && (
              <div
                className={`absolute top-13 -right-2 w-44 h-fit bg-[rgba(0,0,0,0.1)] backdrop-blur-lg border border-[#414141] rounded-xl shadow-lg p-1 transition-all duration-300 ${
                  profileTabOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {optionsArr.map((elem, key) => {
                  return (
                    <BottomOptionLabel
                      key={key}
                      svg={elem.svg}
                      title={elem.title}
                      redirectHref={elem.redirectHref}
                      openToNewPage={elem.openToNewPage}
                    />
                  );
                })}
                <LogoutBtn />
              </div>
            )}
            {!session?.user?.id &&
              pathname !== "/login" &&
              pathname !== "/signup" && (
                <Link
                  href={"/signup"}
                  className="border-2 flex items-center px-4 h-9 rounded-md text-black bg-white cursor-pointer border-[#625c5c] hover:bg-[#343638] hover:text-white transition-all duration-300"
                >
                  Sign in
                </Link>
              )}

            {session?.user.email && (
              <button
                aria-label="Toggle menu"
                aria-expanded={profileTabOpen}
                onClick={() => setProfileTabOpen(!profileTabOpen)}
                className="flex flex-col justify-center items-center w-9 h-9 focus:outline-none group border border-[#313032] rounded-lg bg-[#38373771] cursor-pointer"
                type="button"
              >
                <span
                  className={`
          block h-0.5 w-6 bg-[#959292] rounded transition-all duration-300
          ${profileTabOpen ? "rotate-45 translate-y-2" : ""}
        `}
                />
                <span
                  className={`
          block h-0.5 w-6 bg-[#959292] rounded transition-all duration-300 my-1
          ${profileTabOpen ? "opacity-0" : ""}
        `}
                />
                <span
                  className={`
          block h-0.5 w-6 bg-[#959292] rounded transition-all duration-300
          ${profileTabOpen ? "-rotate-45 -translate-y-2" : ""}
        `}
                />
              </button>
            )}
          </div>

          {/* Phone Screen Nav Hamburger Tab */}
          <button
            aria-label="Toggle menu"
            aria-expanded={profileTabOpen}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 focus:outline-none group border border-[#959292] rounded-lg bg-[#38373771] cursor-pointer"
            type="button"
          >
            <span
              className={`
          block h-0.5 w-6 bg-[#959292] rounded transition-all duration-300
          ${isOpen ? "rotate-45 translate-y-2" : ""}
        `}
            />
            <span
              className={`
          block h-0.5 w-6 bg-[#959292] rounded transition-all duration-300 my-1
          ${isOpen ? "opacity-0" : ""}
        `}
            />
            <span
              className={`
          block h-0.5 w-6 bg-[#959292] rounded transition-all duration-300
          ${isOpen ? "-rotate-45 -translate-y-2" : ""}
        `}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed mt-[70px] rounded px-4 w-full z-50">
          <motion.div
            className=" z-50 relative w-full border border-[#565555] bg-[#121212] shadow-lg rounded-lg"
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
                    onClickHandler={elem.onClickHandler}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                );
              })}
              <motion.div variants={itemVariants}>
                {session?.user.email ? (
                  <div
                    className="h-16 flex items-center hover:bg-[#3e3d3d] transition-all duration-500 px-5 py-2 hover:rounded-md border-b border-[#565555]"
                    onClick={() => {
                      handleSignout();
                      setIsOpen(!isOpen);
                    }}
                  >
                    Log out
                  </div>
                ) : (
                  <Link
                    href={session?.user.email ? "" : "/signup"}
                    className="h-16 flex items-center hover:bg-[#3e3d3d] transition-all duration-500 px-5 py-2 hover:rounded-md border-b border-[#565555]"
                    onClick={() => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    Sign in
                  </Link>
                )}
              </motion.div>
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
  onClickHandler,
}: {
  title: string;
  className?: string;
  redirectHref: string;
  onClickHandler?: () => void;
}) => {
  return onClickHandler ? (
    <p
      onClick={onClickHandler}
      className={`${className} px-2 rounded hover:text-[#a8a8a8] transition-all duration-300 cursor-pointer`}
    >
      {title}
    </p>
  ) : (
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
  onClickHandler,
}: {
  href: string;
  text: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClickHandler?: () => void;
}) => (
  <motion.div variants={itemVariants}>
    {onClickHandler ? (
      <div
        className="h-16 flex items-center hover:bg-[#3e3d3d] transition-all duration-500 px-5 py-2 hover:rounded-md border-b border-[#565555]"
        onClick={() => {
          onClickHandler();
          setIsOpen(!isOpen);
        }}
      >
        {text}
      </div>
    ) : (
      <Link
        href={href}
        className="h-16 flex items-center hover:bg-[#3e3d3d] transition-all duration-500 px-5 py-2 hover:rounded-md border-b border-[#565555]"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {text}
      </Link>
    )}
  </motion.div>
);
