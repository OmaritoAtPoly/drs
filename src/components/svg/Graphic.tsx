import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function GraphicIcon({
  width = 23,
  height = 20,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 28 25"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.266 24.203c.28.414.753.686 1.29.686h24.888a1.556 1.556 0 100-3.111H3.111V1.556a1.556 1.556 0 10-3.111 0v21.777c0 .323.098.622.266.87zM23.648 3.111c-.891 0-1.337 1.077-.707 1.707l.168.169a1 1 0 010 1.414l-4.09 4.09a1 1 0 01-1.414 0L14.51 7.393a1 1 0 00-1.415 0l-6.943 6.953a1 1 0 000 1.414l.177.176a1 1 0 001.414 0l5.352-5.352a1 1 0 011.414 0l3.098 3.097a1 1 0 001.413 0l5.691-5.68a1 1 0 011.414 0l.169.169c.63.63 1.707.183 1.707-.707V4.11a1 1 0 00-1-1h-3.352z"
        fill={fill}
      />
    </svg>
  );
}

export default GraphicIcon;
