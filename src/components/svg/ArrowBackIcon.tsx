import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function ArrowBackIcon({
  width = 18,
  height = 18,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 24"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.674 10.418a2 2 0 000 2.764l6.526 6.826a1.212 1.212 0 01-1.753 1.675l-8.126-8.501a2 2 0 010-2.764l8.126-8.501A1.212 1.212 0 0112.2 3.592l-6.526 6.826z"
        fill="#5E17EB"
        stroke="#5E17EB"
        strokeWidth={2}
      />
    </svg>
  );
}

export default ArrowBackIcon;
