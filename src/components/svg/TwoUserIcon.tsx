import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function TwoUserIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 18"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 9c2.481 0 4.5-2.019 4.5-4.5S11.481 0 9 0a4.505 4.505 0 00-4.5 4.5C4.5 6.981 6.519 9 9 9zm-9 6.75c0-2.996 5.991-4.5 9-4.5 3.009 0 9 1.504 9 4.5V18H0v-2.25zm9-1.929c-2.302 0-4.912.862-5.992 1.607h11.983c-1.08-.745-3.69-1.607-5.991-1.607zM10.929 4.5A1.926 1.926 0 009 2.571 1.926 1.926 0 007.071 4.5c0 1.067.862 1.929 1.929 1.929A1.926 1.926 0 0010.929 4.5zm7.122 6.827c1.492 1.08 2.52 2.52 2.52 4.423V18h5.143v-2.25c0-2.597-4.5-4.076-7.663-4.423zM21.214 4.5c0 2.481-2.018 4.5-4.5 4.5a4.43 4.43 0 01-1.928-.45A6.995 6.995 0 0016.07 4.5 6.995 6.995 0 0014.786.45 4.43 4.43 0 0116.714 0c2.482 0 4.5 2.019 4.5 4.5z"
        fill={fill}
      />
    </svg>
  );
}

export default TwoUserIcon;
