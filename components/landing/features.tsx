import { MobileFeatureCard } from "./mobile-feature-card";
import { FeatureCard } from "./feature-card";
import { FeaturesArray } from "@/utils/features-array";

export default function Features() {
  const featuresData = FeaturesArray;

  return (
    <section className="min-h-screen relative flex flex-col justify-center bg-gradient-to-b from-[#0A0A0A] via-[#131516] to-[#0A0A0A] mt-5 px-4 sm:px-6 md:px-10 lg:px-14 xl:px-28 gap-y-3 sm:gap-y-4 md:gap-y-5 xl:gap-y-6">
      {/* Coming Soon Mask */}
      <div className="absolute  inset-0 flex items-center justify-center z-10">
        <div className="bg-bg-[rgba(0,0,0,0.1)] backdrop-blur-lg bg-opacity-70 w-full h-full absolute"></div>
        <div className="relative z-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white text-center">
            Coming Soon!
          </h2>
        </div>
      </div>

      {/* Original Content (Blurred) */}
      <div className="relative filter blur-sm">
        <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-7xl font-bold">
          Everything you need
        </h2>
        <p className="text-xs md:text-lg text-[#A8A8A8] max-w-3xl">
          Manage your workspaces, projects, assign issues, integrate with GitHub
          and other apps and a lot more
        </p>
        <div className="mt-8">
          {/* Mobile view: horizontal scrolling */}
          <div className="flex space-x-4 overflow-x-auto scrollbar-hidden snap-x snap-mandatory sm:hidden pb-4 h-[430px]">
            {featuresData.map((feature, index) => (
              <div key={index} className="snap-center shrink-0 w-full">
                <MobileFeatureCard
                  img={feature.img}
                  heading={feature.heading}
                  description={feature.description}
                />
              </div>
            ))}
          </div>

          {/* Tablet and Desktop view: grid layout */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[430px]">
            {featuresData.map((feature, index) => (
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
