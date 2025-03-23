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
    <div className="relative w-full h-full overflow-hidden rounded-4xl cursor-pointer border border-transparent hover:border-[#565555] transition-all duration-300 group">
      <div className="absolute inset-0 w-full h-full">
        {typeof img === "string" ? (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />
        ) : img ? (
          <Image
            src={img}
            alt={heading || "Upcoming feature…"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
        )}
      </div>

      {/* Content container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <h3 className="text-white text-xl font-bold mb-2">{heading}</h3>
        <p className="text-white text-sm md:text-base">{description}</p>
      </div>
    </div>
  );
};
