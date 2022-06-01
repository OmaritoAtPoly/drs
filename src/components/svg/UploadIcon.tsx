import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function UploadIcon({
  width = 24,
  height = 24,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 16" {...props}>
      <g fill={theme.palette.common.white} fillRule="evenodd">
        <path d="M0-4h24v24H0z" />
        <path
          d="M19.35 6.04A7.49 7.49 0 0012 0C9.11 0 6.6 1.64 5.35 4.04A5.994 5.994 0 000 10c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 14H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95A5.469 5.469 0 0112 2c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11A2.98 2.98 0 0122 11c0 1.65-1.35 3-3 3zM8 9h2.55v3h2.9V9H16l-4-4-4 4z"
          fill={fill}
        />
      </g>
    </svg>
  );
}

export default UploadIcon;
