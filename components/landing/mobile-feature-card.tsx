"use client";

import Image, { StaticImageData } from "next/image";

export const MobileFeatureCard = ({
  img,
  heading,
  description,
}: {
  img?: string | StaticImageData;
  heading?: string;
  description?: string;
}) => {
  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-4xl cursor-pointer border border-[#1f1f1f] hover:border-[#2e2e2e]  transition-all duration-300 group"
      role="article"
      aria-labelledby={
        heading
          ? `heading-${heading?.replace(/\s+/g, "-").toLowerCase()}`
          : "feature-heading"
      }
    >
      {/* Background Image with Next.js Image component */}
      <div className="absolute inset-0 w-full h-full z-0">
        {typeof img === "string" ? (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
            aria-hidden="true"
          />
        ) : img ? (
          <Image
            src={img}
            alt={heading || "Feature"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"
            aria-hidden="true"
          ></div>
        )}
      </div>

      {/* Content container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 bg-gradient-to-t from-black/70 to-transparent">
        <h3
          id={
            heading
              ? `heading-${heading?.replace(/\s+/g, "-").toLowerCase()}`
              : "feature-heading"
          }
          className="text-white text-xl font-bold mb-2"
        >
          {heading || "Upcoming feature..."}
        </h3>
        <p className="text-white text-sm md:text-base">{description || ""}</p>
      </div>
    </div>
  );
};
