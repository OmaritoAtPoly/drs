import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

function CloseIcon({
  width = 19,
  height = 19,
  fill = theme.palette.error.main,
  ...props
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 19"
      fill={fill}
      {...props}>
      <path
        d="M17.144 3.568a1.21 1.21 0 00-1.712-1.712l-4.518 4.518a2 2 0 01-2.828 0L3.568 1.856a1.21 1.21 0 00-1.712 1.712l4.518 4.518a2 2 0 010 2.828l-4.518 4.518a1.21 1.21 0 101.712 1.712l4.518-4.518a2 2 0 012.828 0l4.518 4.518a1.21 1.21 0 101.712-1.712l-4.518-4.518a2 2 0 010-2.828l4.518-4.518z"
        fill="#F41616"
        stroke="#F41616"
        strokeWidth={2}
      />
    </svg>
  );
}

export default CloseIcon;
