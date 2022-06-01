import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function TimeBackIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 21 18" fill={fill} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 9a9 9 0 119 9c-2.49 0-4.73-1.01-6.36-2.64l1.42-1.42A6.944 6.944 0 0012 16c3.87 0 7-3.13 7-7s-3.13-7-7-7-7 3.13-7 7h3l-4.04 4.03-.07-.14L0 9h3zm8 1V5h1.5v4.15l3.52 2.09-.77 1.28L11 10z"
        fill="#5E17EB"
      />
    </svg>
  );
}

export default TimeBackIcon;
