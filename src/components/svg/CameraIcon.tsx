import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function CameraIcon({
  width = 20,
  height = 23,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      id="prefix__Icons"
      x={0}
      y={0}
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      width={width}
      height={height}
      {...props}>
      <style>
        {`.prefix__st1{fill:${theme.palette.primary.main};stroke:#000;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10}`}
      </style>
      <path
        fill={fill}
        className="prefix__st1"
        d="M23 9l-1.4-2.9c-.3-.7-1-1.1-1.8-1.1h-7.5c-.8 0-1.5.4-1.8 1.1L9 9H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h22c1.1 0 2-.9 2-2V11c0-1.1-.9-2-2-2h-4z"
      />
      <circle fill={fill} className="prefix__st1" cx={16} cy={17} r={6} />
      <path fill={fill} className="prefix__st1" d="M5 12h3" />
    </svg>
  );
}

export default CameraIcon;
