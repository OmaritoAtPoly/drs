import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function ExpandMore({
  width = 24,
  height = 24,
  fill = theme.palette.common.white,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" {...props}>
      <path fill={fill} d="M24 24H0V0h24v24z" opacity={0.87} />
      <path d="M15.88 9.29L12 13.17 8.12 9.29a.996.996 0 10-1.41 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 000-1.41c-.39-.38-1.03-.39-1.42 0z" />
    </svg>
  );
}

export default ExpandMore;
