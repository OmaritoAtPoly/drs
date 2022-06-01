import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function ItemListIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 18 18" fill={fill} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 0H2C.9 0 0 .9 0 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm-1 4.5h-5v2h5v-2zm0 7h-5v2h5v-2zM2 16h14V2H2v14zM8 3H3v5h5V3zM4 7h3V4H4v3zm4 3H3v5h5v-5zm-4 4h3v-3H4v3z"
        fill="#5E17EB"
      />
    </svg>
  );
}

export default ItemListIcon;
