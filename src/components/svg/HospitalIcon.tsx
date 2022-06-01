import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function HospitalIcon({
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
        d="M17.145 4.672c.513.331.846.928.846 1.61L18 15.756c0 1.042-.81 1.895-1.8 1.895H1.8c-.99 0-1.8-.853-1.8-1.895V6.282c0-.682.342-1.279.855-1.61L7.95.297a2 2 0 012.1 0l7.095 4.375zM8.357 13.65a.5.5 0 01-.5-.5v-2.357H5.5a.5.5 0 01-.5-.5V9.008a.5.5 0 01.5-.5h2.357V6.15a.5.5 0 01.5-.5h1.286a.5.5 0 01.5.5v2.357H12.5a.5.5 0 01.5.5v1.285a.5.5 0 01-.5.5h-2.357v2.357a.5.5 0 01-.5.5H8.357z"
        fill={fill}
      />
    </svg>
  );
}

export default HospitalIcon;
