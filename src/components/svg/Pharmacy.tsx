import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function Pharmacy({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill={fill}
      {...props}>
      <path
        d="M26.786 0H3.214C1.44 0 0 1.404 0 3.134v22.984c0 1.73 1.44 3.134 3.214 3.134h23.572c1.774 0 3.214-1.403 3.214-3.134V3.134C30 1.404 28.56 0 26.786 0zm-2.143 16.454c0 .431-.362.784-.804.784h-6.16v6.007a.796.796 0 01-.804.784h-3.75a.796.796 0 01-.804-.784v-6.007h-6.16a.796.796 0 01-.804-.784v-3.656c0-.431.362-.784.804-.784h6.16V6.007c0-.43.362-.783.804-.783h3.75c.442 0 .804.352.804.783v6.007h6.16c.442 0 .804.353.804.784v3.656z"
        fill={fill}
      />
    </svg>
  );
}

export default Pharmacy;
