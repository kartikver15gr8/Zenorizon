"use client";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

export const FeatureCard = ({
  img,
  heading,
  description,
}: {
  img?: string | StaticImageData;
  heading?: string;
  description?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-4xl cursor-pointer bg-black border border-transparent hover:border-[#565555] transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image with Next.js Image component */}
      <div className="absolute inset-0 w-full h-full">
        {typeof img === "string" ? (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />
        ) : img ? (
          <Image
            src={img}
            alt={heading || "Feature"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
        )}
      </div>

      {/* Dark overlay that appears on hover */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isHovered ? "opacity-60" : "opacity-0"
        }`}
      ></div>

      {/* Content container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <h3 className="text-white text-xl font-bold mb-2 transform transition-all duration-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          {heading}
        </h3>
        <p className="text-white text-sm md:text-base transform transition-all duration-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 delay-75">
          {description}
        </p>
      </div>
    </div>
  );
};
