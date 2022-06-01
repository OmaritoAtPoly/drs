import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function NextArrowIcon({
  width = 8,
  height = 13,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 13"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.877 7.09a1 1 0 000-1.381l-3.699-3.87a.673.673 0 11.974-.93l4.588 4.8a1 1 0 010 1.382l-4.588 4.8a.673.673 0 01-.974-.93l3.699-3.87z"
        fill={fill}
        stroke="#323232"
      />
    </svg>
  );
}

export default NextArrowIcon;
