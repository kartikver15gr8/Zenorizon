"use client";

import { MobileFeatureCard } from "./mobile-feature-card";
import { FeatureCard } from "./feature-card";
import { FeaturesArray } from "@/utils/features-array";
import SVGIcon from "@/lib/svg-icon";
import { RAW_ICONS } from "@/lib/icons";
import { useRef } from "react";

export default function Features() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: "left" | "right") => {
    if (scrollRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      const computedStyle = window.getComputedStyle(cardRef.current);
      const marginRight = parseInt(computedStyle.marginRight, 10) || 0;
      const scrollAmount = cardWidth + marginRight;

      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="min-h-screen relative flex flex-col justify-center bg-gradient-to-b from-[#0A0A0A] via-[#131516] to-[#0A0A0A] mt-5 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-28 gap-y-3 sm:gap-y-4 md:gap-y-5 xl:gap-y-6">
      <div className="relative ">
        <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-7xl font-bold">
          Everything you need
        </h2>
        <p className="text-xs md:text-lg text-[#A8A8A8] max-w-3xl">
          Manage your workspaces, projects, assign issues, integrate with GitHub
          and other apps and a lot more
        </p>
        <div className="mt-8 relative">
          {/* Mobile view: horizontal scrolling */}

          {/* Scroll Left Button */}
          <ScrollingButton
            onClickFn={() => scrollByCard("left")}
            svg={RAW_ICONS.ArrowLeft}
            className="left-[6px]"
          />

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hidden snap-x snap-mandatory sm:hidden pb-2 h-[430px] scroll-smooth"
          >
            {FeaturesArray.map((feature, index) => (
              <div
                key={index}
                ref={index === 0 ? cardRef : null}
                className="snap-center shrink-0 w-full"
              >
                <MobileFeatureCard
                  img={feature.img}
                  heading={feature.heading}
                  description={feature.description}
                />
              </div>
            ))}
          </div>

          {/* Right Button */}
          <ScrollingButton
            onClickFn={() => scrollByCard("right")}
            svg={RAW_ICONS.ArrowRight}
            className="right-[6px]"
          />

          {/* Tablet and Desktop view: grid layout */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6 h-[430px]">
            {FeaturesArray.map((feature, index) => (
              <FeatureCard
                key={index}
                img={feature.img}
                heading={feature.heading}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const ScrollingButton = ({
  onClickFn,
  svg,
  className,
}: {
  onClickFn: () => void;
  svg: string;
  className: string;
}) => {
  return (
    <button
      type="button"
      className={`${className} absolute h-10 w-10 flex justify-center items-center top-1/2 -translate-y-1/2 z-20 bg-[#606060] rounded-full p-2 shadow sm:hidden opacity-35`}
      onClick={onClickFn}
      aria-label="Scroll right"
    >
      <SVGIcon className="flex w-7" svgString={svg} />
    </button>
  );
};
