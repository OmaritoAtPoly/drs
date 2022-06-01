import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function MapIcon({
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
        d="M10.604 14.404L20.2 24H1.009l9.595-9.596zm10.605-3.48V22.99l-9.596-9.595 1.917-1.918-.11-.133c-.26-.317-.527-.644-.785-.989L0 22.992V3.267c0-.263.213-.476.476-.476h11.55A6.092 6.092 0 0117.143 0a6.1 6.1 0 016.093 6.093c0 2.122-1.016 3.575-2.027 4.83zM9.355 7.65H5.83v1.343h2.076a2.186 2.186 0 01-2.076 1.51 2.184 2.184 0 01-2.182-2.181 2.184 2.184 0 013.511-1.73l.82-1.064a3.492 3.492 0 00-2.149-.73 3.529 3.529 0 00-3.524 3.524 3.528 3.528 0 003.524 3.524 3.529 3.529 0 003.525-3.524V7.65zm12.454-1.557a4.666 4.666 0 10-9.332 0c0 3.874 4.38 4.984 4.38 9.6h.572c0-4.616 4.38-5.726 4.38-9.6zm-4.666-2.134a1.818 1.818 0 100 3.636 1.818 1.818 0 000-3.636z"
        fill={fill}
      />
    </svg>
  );
}

export default MapIcon;
