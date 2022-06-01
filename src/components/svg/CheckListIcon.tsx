import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function CheckListIcon({
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
        d="M17.1 0H.9C.4 0 0 .4 0 .9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V.9c0-.5-.5-.9-.9-.9zM6 5a1 1 0 10-2 0 1 1 0 002 0zm8 0a1 1 0 00-1-1H9a1 1 0 000 2h4a1 1 0 001-1zm0 4a1 1 0 00-1-1H9a1 1 0 100 2h4a1 1 0 001-1zm-6 4a1 1 0 011-1h4a1 1 0 110 2H9a1 1 0 01-1-1zM4 9a1 1 0 112 0 1 1 0 01-2 0zm2 4a1 1 0 10-2 0 1 1 0 002 0zm-4 2a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1H3a1 1 0 00-1 1v12z"
        fill={fill}
      />
    </svg>
  );
}

export default CheckListIcon;
