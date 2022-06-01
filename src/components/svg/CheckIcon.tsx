import * as React from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function CheckIcon({
  height = 16,
  width = 20,
  fill = "#fff",
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 16"
      fill={fill}
      {...props}>
      <path
        d="M6.59 11.58L2.42 7.41 1 8.82l5.59 5.59 12-12L17.18 1 6.59 11.58z"
        fill={fill}
        stroke={fill}
      />
    </svg>
  );
}

export default CheckIcon;
