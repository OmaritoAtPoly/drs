import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function NoteBookIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.7 6.667h6.967C33.5 6.667 35 8.167 35 10v23.334c0 1.833-1.5 3.333-3.333 3.333H8.333a4.33 4.33 0 01-.666-.05 3.346 3.346 0 01-1.684-.917c-.3-.317-.55-.667-.716-1.067a3.42 3.42 0 01-.267-1.3V10c0-.467.1-.9.267-1.283.166-.4.416-.767.716-1.067a3.346 3.346 0 011.684-.917 2.92 2.92 0 01.666-.066H15.3c.7-1.934 2.533-3.334 4.7-3.334 2.167 0 4 1.4 4.7 3.334zm-13.034 6.667h16.667v3.333H11.667v-3.334zM28.334 20H11.667v3.333h16.666V20zm-5 6.667H11.667V30h11.666v-3.333zM20 6.25c.683 0 1.25.567 1.25 1.25A1.26 1.26 0 0120 8.75a1.26 1.26 0 01-1.25-1.25c0-.683.567-1.25 1.25-1.25zM8.334 33.333h23.333V10H8.333v23.333z"
        fill={fill}
      />
    </svg>
  );
}

export default NoteBookIcon;
