import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function FilterIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} fill={fill} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 2a1 1 0 100-2H1a1 1 0 100 2h18zm-6 4a1 1 0 110 2H1a1 1 0 010-2h12zm-6 6a1 1 0 110 2H1a1 1 0 110-2h6z"
        fill={fill}
      />
    </svg>
  );
}

export default FilterIcon;
