import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function LabIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 34"
      fill={fill}
      {...props}>
      <path
        d="M29.276 26.469l-7.848-12.365V4.198h.536c.89 0 1.607-.702 1.607-1.574v-1.05C23.571.702 22.855 0 21.964 0H8.035c-.89 0-1.607.702-1.607 1.574v1.05c0 .872.717 1.574 1.607 1.574h.536v9.906L.723 26.469c-1.962 3.09.3 7.117 4.024 7.117h20.505c3.73 0 5.986-4.034 4.024-7.117zM9.234 20.99l3.227-5.09a2.05 2.05 0 00.389-1.207V4.198h4.286v10.496c0 .453.147.866.388 1.207l3.228 5.09H9.234z"
        fill={fill}
      />
    </svg>
  );
}

export default LabIcon;
