import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function InfoIcon({
  width = 22,
  height = 22,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 11c0 6.075 4.925 11 11 11s11-4.925 11-11S17.075 0 11 0 0 4.925 0 11zm20 0a9 9 0 11-18 0 9 9 0 0118 0zm-7.996 1.998h.999v2h-4v-2h1v-2h-1v-2h3v4zm-.003-6a1 1 0 11-2 0 1 1 0 012 0z"
        fill={fill}
      />
    </svg>
  );
}

export default InfoIcon;
