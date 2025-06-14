import Image from "next/image";
import mist from "@/public/banner/mist.png";
import React from "react";

export default function MistContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={mist}
        alt=""
        fill
        className="object-cover opacity-20"
        priority
      />
      {/* content */}
      {children}
    </div>
  );
}
