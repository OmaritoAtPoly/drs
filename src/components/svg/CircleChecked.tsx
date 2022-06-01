import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

function CircleChecked({
  width = 20,
  height = 20,
  fill = theme.palette.primary.main,
  ...props
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5.83l6.59-6.59L16 7l-8 8-4-4 1.41-1.41L8 12.17z"
        fill={fill}
      />
    </svg>
  );
}

export default CircleChecked;
