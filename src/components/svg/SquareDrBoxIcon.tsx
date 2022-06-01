import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function SquareDrBoxIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 17 18" fill={fill} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.638 1.8H14.4c.99 0 1.8.81 1.8 1.8v12.6c0 .99-.81 1.8-1.8 1.8H1.8C.81 18 0 17.19 0 16.2V3.6c0-.99.81-1.8 1.8-1.8h3.762C5.94.756 6.93 0 8.1 0c1.17 0 2.16.756 2.538 1.8zm-2.043 0a.674.674 0 00-.495-.225.674.674 0 00-.495.225.673.673 0 00-.18.45.68.68 0 00.675.675.68.68 0 00.675-.675.673.673 0 00-.18-.45zM1.8 16.2V3.6h12.6v12.6H1.8zM7.357 14a.5.5 0 01-.5-.5v-2.357H4.5a.5.5 0 01-.5-.5V9.357a.5.5 0 01.5-.5h2.357V6.5a.5.5 0 01.5-.5h1.286a.5.5 0 01.5.5v2.357H11.5a.5.5 0 01.5.5v1.286a.5.5 0 01-.5.5H9.143V13.5a.5.5 0 01-.5.5H7.357z"
        fill={fill}
      />
    </svg>
  );
}

export default SquareDrBoxIcon;
