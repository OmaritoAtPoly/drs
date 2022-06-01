import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function SideBarHomeIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill={theme.palette.primary.main}
      {...props}>
      <path
        d="M3.75 11.25L15 2.5l11.25 8.75V25a2.5 2.5 0 01-2.5 2.5H6.25a2.5 2.5 0 01-2.5-2.5V11.25z"
        stroke={fill}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.25 27.5V15h7.5v12.5"
        stroke={fill}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SideBarHomeIcon;
