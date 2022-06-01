import * as React from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function BackArrowIcon({
  width = 18,
  height = 18,
  fill = "black", // todo add this color to theme palette
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg height={height} viewBox="0 0 512 512" width={width} fill={fill} {...props}>
      <path d="M352 128.4L319.7 96 160 256l159.7 160 32.3-32.4L224.7 256z" />
    </svg>
  );
}

export default BackArrowIcon;
