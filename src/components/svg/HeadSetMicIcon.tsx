import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function HeadSetMicIcon({
  width = 40,
  height = 39,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 22"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 9c0-4.97 4.053-9 9.052-9 5 0 9.053 4.03 9.053 9v10c0 1.66-1.348 3-3.018 3H9.053v-2h7.041v-1H12.07v-8h4.023V9c0-3.87-3.148-7-7.04-7C5.16 2 2.011 5.13 2.011 9v2h4.023v8H3.017A3.005 3.005 0 010 16V9zm4.023 4v4H3.018c-.554 0-1.006-.45-1.006-1v-3h2.011zm12.07 0v4h-2.011v-4h2.011z"
        fill={fill}
      />
    </svg>
  );
}

export default HeadSetMicIcon;
