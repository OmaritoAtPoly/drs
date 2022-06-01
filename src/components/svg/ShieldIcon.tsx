import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function ShieldIcon({
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
        d="M7.364 0L0 3.273v4.909c0 4.54 3.142 8.787 7.364 9.818 4.221-1.03 7.363-5.277 7.363-9.818v-4.91L7.364 0zm5.727 8.182c0 3.698-2.438 7.11-5.727 8.124-3.29-1.014-5.728-4.426-5.728-8.124V4.336l5.728-2.544 5.727 2.544v3.846zM4 9.162l.822-.823 1.511 1.505L10.178 6l.822.828-4.667 4.667L4 9.162z"
        fill={fill}
      />
    </svg>
  );
}

export default ShieldIcon;
