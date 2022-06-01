import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function NotificationIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 23"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.792 9.417c0-4.228-2.332-7.163-5.349-8.044a2.083 2.083 0 00-3.885-.002c-3.021.877-5.35 3.806-5.35 8.046 0 2.744-.553 4.281-1.577 5.395-.171.186-.635.613-.95.902-.148.137-.263.243-.298.278l-.3.304v3.552h6.342c.214 1.107.815 1.847 1.9 2.51a4.175 4.175 0 004.35 0 4.106 4.106 0 001.86-2.51h6.382v-3.552l-.3-.304a16.01 16.01 0 00-.287-.267c-.313-.29-.786-.726-.96-.915-1.025-1.12-1.578-2.659-1.578-5.393zm-5.483 10.431H8.603c.147.274.398.48.807.73.67.41 1.51.41 2.18 0 .31-.188.551-.438.719-.73zm5.524-3.632c.22.24.69.677 1 .963v.586H2.167v-.585c.308-.283.78-.72.998-.958 1.391-1.514 2.127-3.557 2.127-6.805 0-3.938 2.43-6.237 5.208-6.237 2.77 0 5.208 2.311 5.208 6.237 0 3.237.736 5.281 2.125 6.8z"
        fill={fill}
      />
    </svg>
  );
}

export default NotificationIcon;
