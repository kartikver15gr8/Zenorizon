import React from "react";

const SVGIcon = ({
  svgString,
  className,
}: {
  svgString: string;
  className?: string;
}) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: svgString,
      }}
    />
  );
};

export default SVGIcon;
