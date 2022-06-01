import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function InvoiceIcon({
  width = 22,
  height = 22,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 15"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.865 1.5H12c.825 0 1.5.675 1.5 1.5v10.5c0 .825-.675 1.5-1.5 1.5H1.5c-.105 0-.202-.008-.3-.023a1.506 1.506 0 01-1.08-.892A1.539 1.539 0 010 13.5V3c0-.21.045-.405.12-.578A1.506 1.506 0 011.5 1.5h3.135C4.95.63 5.775 0 6.75 0c.975 0 1.8.63 2.115 1.5zM3 4.5h7.5V6H3V4.5zm7.5 3H3V9h7.5V7.5zm-2.25 3H3V12h5.25v-1.5zm-1.5-9.188c.308 0 .563.255.563.563a.567.567 0 01-.563.562.567.567 0 01-.563-.562c0-.308.255-.563.563-.563zM1.5 13.5H12V3H1.5v10.5z"
        fill={fill}
      />
    </svg>
  );
}

export default InvoiceIcon;
