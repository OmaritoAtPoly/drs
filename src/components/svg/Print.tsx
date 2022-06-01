import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

function Print({
  width = 19,
  height = 18,
  fill = theme.palette.primary.main,
  ...props
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 18"
      fill="none"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.346 1.5H7.038v2.538h5.308V1.5zM7.038 0h-1.5v4.154H3a3 3 0 00-3 3v3a3 3 0 003 3h2.538V18h8.308v-4.846h1.846a3 3 0 003-3v-3a3 3 0 00-3-3h-1.846V0H7.038zm8.654 6.154H3a1 1 0 00-1 1v3a1 1 0 001 1h2.538V9.692h-.692a.692.692 0 010-1.384h9.693a.692.692 0 010 1.384h-.693V11.154h1.846a1 1 0 001-1v-3a1 1 0 00-1-1zm-3.346 5V9.808H7.038v1.346h5.308zm-5.308 2h5.308V16.5H7.038v-3.346zM3.5 8a.5.5 0 100-1 .5.5 0 000 1zm8 6.4a.4.4 0 00-.4-.4H8.4a.4.4 0 000 .8h2.7a.4.4 0 00.4-.4zm-.4.6a.4.4 0 010 .8H8.4a.4.4 0 010-.8h2.7z"
        fill={fill}
      />
    </svg>
  );
}

export default Print;
