import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function GoBackArrowIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 38.273 38.273" width={width} height={height} fill={fill} {...props}>
      <path
        d="M20.621 10.484V5.84c0-.808-.458-1.548-1.181-1.909a2.142 2.142 0 00-2.236.206l-9.486 7.147c-.677.292-1.117.67-1.401 1.058L.849 16.461a2.134 2.134 0 00.013 3.418l16.355 12.133a2.132 2.132 0 003.404-1.714v-5.517h.038c3.842 0 10.687 1.089 13.366 8.386a2.134 2.134 0 004.117-.456c.052-.394 1.208-9.682-4.461-16.23-3.06-3.533-7.446-5.546-13.06-5.997zm.038 10.031c-1.443 0-2.379.132-2.482.146a2.134 2.134 0 00-1.822 2.111v3.287l-10.66-7.907 3.555-2.678a2.21 2.21 0 00.365-.351c.155-.068.301-.152.437-.254l6.303-4.75v2.401c0 1.168.939 2.119 2.108 2.134 5.345.063 9.374 1.61 11.975 4.6 1.442 1.658 2.314 3.602 2.835 5.469-4.35-3.685-9.849-4.208-12.614-4.208z"
        fill={fill}
      />
    </svg>
  );
}

export default GoBackArrowIcon;
