import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function ShareIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4c0 .287.03.568.088.838L7.017 7.373a4 4 0 100 5.253l5.07 2.536a4 4 0 10.895-1.789l-5.07-2.535a4.016 4.016 0 000-1.676l5.071-2.536A4 4 0 1012 4zm-6 6a2 2 0 11-4 0 2 2 0 014 0zm10-4a2 2 0 100-4 2 2 0 000 4zm2 10a2 2 0 11-4 0 2 2 0 014 0z"
        fill={fill}
      />
    </svg>
  );
}

export default ShareIcon;
