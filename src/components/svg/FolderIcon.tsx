import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function FolderIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 280 280"
      width={width}
      height={height}
      fill={fill}
      {...props}>
      <path d="M265 10H145c-8.284 0-15 6.716-15 15v15H15C6.716 40 0 46.716 0 55v200c0 8.284 6.716 15 15 15h250c8.284 0 15-6.716 15-15V25c0-8.284-6.716-15-15-15zm-15 230H30V70h115c8.284 0 15-6.716 15-15V40h90v200z" />
    </svg>
  );
}

export default FolderIcon;
