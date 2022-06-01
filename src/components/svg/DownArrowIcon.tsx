import * as React from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function DownArrowIcon({
  width = 13,
  height = 8,
  fill = "#D6E3F3",
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 8"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.709 4.663a1 1 0 001.382 0L10.504 1.4a.606.606 0 11.838.876L7.09 6.34a1 1 0 01-1.382 0l-4.25-4.064a.606.606 0 11.837-.876l3.413 3.263z"
        fill={fill}
        stroke="#D6E3F3"
      />
    </svg>
  );
}

export default DownArrowIcon;
