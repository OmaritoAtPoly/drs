import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function AddIcon({
  width = 18,
  height = 18,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.428 16a2 2 0 002 2H9.57a2 2 0 002-2v-4.429H16a2 2 0 002-2V8.428a2 2 0 00-2-2h-4.43V2a2 2 0 00-2-2H8.429a2 2 0 00-2 2v4.428H2a2 2 0 00-2 2v1.143a2 2 0 002 2h4.428V16z"
        fill={fill}
      />
    </svg>
  );
}

export default AddIcon;
