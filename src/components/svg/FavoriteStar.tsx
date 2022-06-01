import * as React from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function FavoriteStar({
  width = 60,
  height = 57,
  fill = "#F2C94C",
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 57"
      fill={fill}
      {...props}>
      <path
        d="M30 45.81L48.54 57l-4.92-21.09L60 21.72l-21.57-1.83L30 0l-8.43 19.89L0 21.72l16.38 14.19L11.46 57 30 45.81z"
        fill={fill}
      />
    </svg>
  );
}
export default FavoriteStar;
