import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function UserIcon({
  width = 24,
  height = 24,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-5 0 40 40"
      fill={fill}
      {...props}>
      <path
        d="M15 3.563a3.937 3.937 0 11.001 7.874A3.937 3.937 0 0115 3.563zm0 16.875c5.569 0 11.438 2.737 11.438 3.937v2.063H3.563v-2.063c0-1.2 5.868-3.938 11.437-3.938zM15 0a7.498 7.498 0 00-7.5 7.5c0 4.144 3.356 7.5 7.5 7.5s7.5-3.356 7.5-7.5S19.144 0 15 0zm0 16.875c-5.006 0-15 2.512-15 7.5V30h30v-5.625c0-4.988-9.994-7.5-15-7.5z"
        fill={fill}
      />
    </svg>
  );
}

export default UserIcon;
