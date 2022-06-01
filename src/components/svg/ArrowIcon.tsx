import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function ArrowIcon({
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
        d="M8.326 13.182a2 2 0 000-2.764L1.8 3.592a1.212 1.212 0 011.752-1.675l8.126 8.501a2 2 0 010 2.764l-8.126 8.501A1.212 1.212 0 011.8 20.01l6.525-6.827z"
        fill="#5E17EB"
        stroke="#5E17EB"
        strokeWidth={2}
      />
    </svg>
  );
}

export default ArrowIcon;
