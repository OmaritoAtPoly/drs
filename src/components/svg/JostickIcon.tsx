import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function JoystickIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.287 8.421v5.591H7.712v-5.59A3.939 3.939 0 018.5.624a3.938 3.938 0 01.787 7.796zm-3.15 1.777v1.596c-2.31.288-3.937.947-3.937 1.43 0 .635 2.819 1.575 6.3 1.575s6.3-.94 6.3-1.575c0-.483-1.628-1.142-3.938-1.43v-1.596c3.194.35 5.513 1.425 5.513 3.026 0 1.974-3.528 3.15-7.875 3.15-4.347 0-7.875-1.176-7.875-3.15 0-1.6 2.318-2.676 5.513-3.026z"
        fill={theme.palette.secondary.main}
      />
    </svg>
  );
}

export default JoystickIcon;
