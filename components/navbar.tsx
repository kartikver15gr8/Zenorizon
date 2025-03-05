"use client";

import Image from "next/image";
import Link from "next/link";
import appIcon from "@/public/assets/icons/appIcon.svg";


const navListArr = [
  { title: "Product", redirectHref: "" },
  { title: "Resources", redirectHref: "" },
  { title: "Pricing", redirectHref: "" },
  { title: "Contact", redirectHref: "" },
  { title: "Blogs", redirectHref: "" },
];

export default function Navbar() {
  return (
    <div className="py-2 flex px-10">
      <div className=" h-[55px] border border-[#565555] w-full rounded-lg flex items-center justify-between px-3 bg-[#121212]">
        <Image className="w-8" src={appIcon} alt="" width={200} height={200} />
        <div className="flex gap-x-5">
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
        <div className="flex items-center gap-x-2">
          <button className="px-4 h-9 rounded hover:bg-[#4f4e4e] transition-all duration-300 cursor-pointer">
            Log in
          </button>
          <button className="border px-4 h-9 rounded text-black bg-white cursor-pointer">
            Signup
          </button>
        </div>
      </div>
    </div>
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
