import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function Consulting({
  width = 24,
  height = 24,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg height={height} viewBox="0 0 512 512" width={width} {...props}>
      <g fill={fill}>
        <path d="M412 16H100a19.994 19.994 0 00-20 20v440a19.994 19.994 0 0020 20h312a19.994 19.994 0 0020-20V36a19.994 19.994 0 00-20-20zm-52 424H152V200h208z" />
        <path d="M232 384h48v-40h40v-48h-40v-40h-48v40h-40v48h40z" />
      </g>
      <g fill={fill}>
        <path d="M192 352h32v32a8 8 0 008 8h48a8 8 0 008-8v-32h32a8 8 0 008-8v-48a8 8 0 00-8-8h-32v-32a8 8 0 00-8-8h-48a8 8 0 00-8 8v32h-32a8 8 0 00-8 8v48a8 8 0 008 8zm8-48h32a8 8 0 008-8v-32h32v32a8 8 0 008 8h32v32h-32a8 8 0 00-8 8v32h-32v-32a8 8 0 00-8-8h-32z" />
        <path d="M412 8H100a28.031 28.031 0 00-28 28v440a28.031 28.031 0 0028 28h312a28.031 28.031 0 0028-28V36a28.031 28.031 0 00-28-28zm12 468a12.01 12.01 0 01-12 12H100a12.01 12.01 0 01-12-12V36a12.01 12.01 0 0112-12h312a12.01 12.01 0 0112 12z" />
        <path d="M376 144H136a8 8 0 00-8 8v48a8 8 0 008 8h8v232a8 8 0 008 8h208a8 8 0 008-8V208h8a8 8 0 008-8v-48a8 8 0 00-8-8zm-24 288H160V208h192zm16-240H144v-32h224z" />
      </g>
    </svg>
  );
}

export default Consulting;
