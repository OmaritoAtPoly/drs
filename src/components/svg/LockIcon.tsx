import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function Lock({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      {...props}>
      <path
        d="M16.667 9.333h-.762V7.81A3.811 3.811 0 0012.095 4a3.81 3.81 0 00-3.81 3.81v1.523h-.761C6.686 9.333 6 10.02 6 10.857v7.62C6 19.313 6.686 20 7.524 20h9.143c.838 0 1.523-.686 1.523-1.524v-7.619c0-.838-.685-1.524-1.523-1.524zm-4.572 6.857a1.528 1.528 0 01-1.524-1.523c0-.838.686-1.524 1.524-1.524s1.524.686 1.524 1.524-.686 1.524-1.524 1.524zm2.362-6.857H9.733V7.81a2.364 2.364 0 012.362-2.362 2.364 2.364 0 012.362 2.362v1.523z"
        fill={fill}
      />
    </svg>
  );
}

export default Lock;
