"use client";

import Image from "next/image";
import mist from "@/public/banner/mist.png";
import { PriceCardContents } from "@/utils/pricing-card-contents";
import { useRouter } from "next/navigation";
import MistContainer from "../ui/mistcontainer";

export default function Pricing() {
  return (
    <div
      id="pricing"
      className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 2xl:px-40 xl:pb-20"
    >
      <div>
        <p className="text-xl md:text-3xl lg:text-4xl xl:text-6xl font-medium pb-3">
          Explore our plans
        </p>
        <p className="text-xs md:text-[16px] lg:text-lg text-[#A8A8A8] max-w-3xl w-[70%] lg:w-[45%] xl:w-[60%]">
          Our plans are built to grow with your team, start small, scale
          confidently, and only pay for what you need.
        </p>
      </div>

      {/* Pricing container */}

      <MistContainer className="mt-5 mb-10  border border-[#565555] rounded-3xl">
        {/* content */}
        <div className="relative z-10 p-4 lg:p-5 grid grid-cols-1 md:grid-cols-3 h-full gap-x-4 lg:gap-x-5 gap-y-4 md:gap-y-0">
          {PriceCardContents.map((elem, key) => {
            return (
              <PriceCard
                key={key}
                tier={elem.tier}
                price={elem.price}
                subText={elem.subText}
                btnText={elem.btnText}
                featuresList={elem.featuresList}
                onClickHandler={elem.onClickHandler}
              />
            );
          })}
        </div>
      </MistContainer>
    </div>
  );
}

const ProClass =
  "rounded-xl p-4 h-full bg-[rgba(0,0,0,0.4)] backdrop-blur-lg border-2 border-[#565555]";

const PriceCard = ({
  tier,
  price,
  subText,
  btnText,
  featuresList,
  onClickHandler,
}: {
  tier: string;
  price: string;
  subText: string;
  btnText: string;
  featuresList: { id: number; content: string }[];
  onClickHandler: () => void;
}) => {
  const router = useRouter();

  return (
    <div
      className={
        tier == "Pro"
          ? ProClass
          : "rounded-xl p-4 h-full bg-[rgba(0,0,0,0.4)] backdrop-blur-lg"
      }
    >
      <p>{tier}</p>
      <span className="flex items-baseline mt-4 mb-10">
        <p className="text-4xl font-medium">${price}</p>
        <p>/month</p>
      </span>

      <span className="flex mb-4">{subText}</span>

      {tier == "Pro" ? (
        <button
          onClick={onClickHandler}
          className="h-10 md:text-sm lg:text-[16px] rounded-xl w-full bg-[#565555] mb-4 border border-[#7d8483] cursor-pointer hover:bg-[#383737] transition-all duration-300"
        >
          {btnText}
        </button>
      ) : (
        <button
          onClick={onClickHandler}
          className="h-10 md:text-sm lg:text-[16px] rounded-xl w-full bg-[#2A2A2C] mb-4 border-[0.3px] border-[#565555] cursor-pointer hover:bg-[#383737] transition-all duration-300"
        >
          {btnText}
        </button>
      )}

      <div className="flex items-center gap-x-4 text-sm lg:text-[16px]">
        <div className="border border-[#565555] bg-[#565555] w-2 h-2 rounded-full"></div>
        <div className="border-b border-[#565555] flex-1 h-0.5"></div>
        <p>Features</p>
        <div className="border-b border-[#565555] flex-1 h-0.5"></div>
        <div className="border border-[#565555] bg-[#565555] w-2 h-2 rounded-full"></div>
      </div>

      {/* features */}
      <ul className="flex flex-col gap-y-3 mt-4 text-sm lg:text-[16px]">
        {featuresList.map((elem) => {
          return (
            <li
              key={elem.id}
              className="flex items-center gap-x-2 cursor-pointer text-[#a7b0b3] hover:text-white transition-all duration-200"
            >
              <p>✔︎</p>
              <p className="">{elem.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
