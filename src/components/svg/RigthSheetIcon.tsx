import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function RigthSheetIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 15 18" fill={fill} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0H1.8C.81 0 0 .81 0 1.8v14.4c0 .99.8 1.8 1.79 1.8H12.6c.99 0 1.8-.81 1.8-1.8V5.4L9 0zm1.8 8.998H3.6v1.8h7.2v-1.8zm0 3.602H3.6v1.8h7.2v-1.8zm-9 3.6h10.8V6.3H8.1V1.8H1.8v14.4z"
        fill={fill}
      />
    </svg>
  );
}

export default RigthSheetIcon;
