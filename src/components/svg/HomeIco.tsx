import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function HomeIco({
  width = 24,
  height = 24,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 23 23"
      fill={fill}
      {...props}>
      <path
        d="M2.863 8.589l8.588-6.68 8.589 6.68v10.497a1.908 1.908 0 01-1.909 1.908H4.771a1.909 1.909 0 01-1.908-1.908V8.589z"
        stroke={theme.palette.secondary.main}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.589 20.994v-9.542h5.725v9.542"
        stroke={theme.palette.secondary.main}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default HomeIco;
