import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function BladeIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 18 17" fill={fill} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.515 0a.89.89 0 00-.63.25L6.998 8.137l2.49 2.49 7.886-7.887a.89.89 0 00-.017-1.26L16.143.269A.896.896 0 0015.515 0zm-6.86 11.45L6.17 8.966 0 15.145a3.523 3.523 0 004.976-.006l3.68-3.688z"
        fill={fill}
      />
    </svg>
  );
}

export default BladeIcon;
