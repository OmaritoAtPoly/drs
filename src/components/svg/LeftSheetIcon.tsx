import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function LeftSheetIcon({
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
        d="M5.4 0h7.2c.99 0 1.8.81 1.8 1.8v14.4c0 .99-.801 1.8-1.791 1.8H1.8C.81 18 0 17.19 0 16.2V5.4L5.4 0zM3.6 8.998h7.2v1.8H3.6v-1.8zm0 3.602h7.2v1.8H3.6v-1.8zm9 3.6H1.8V6.3h4.5V1.8h6.3v14.4z"
        fill={fill}
      />
    </svg>
  );
}

export default LeftSheetIcon;
