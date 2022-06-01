import * as React from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function DeleteIcon({
  width = 20,
  height = 22,
  // TODO make this color in theme
  fill = "#F41616",
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 22"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 0h6a2 2 0 012 2v1h3a2 2 0 012 2v2a2 2 0 01-2 2h-.08L17 20a2 2 0 01-2 2H5c-1.105 0-2-.895-1.997-1.917L2.08 9H2a2 2 0 01-2-2V5a2 2 0 012-2h3V2a2 2 0 012-2zM2 5h16v2H2V5zm2.086 4h11.827l-.91 10.917L15 20H5L4.086 9zM13 2v1H7V2h6zm-1.586 12l2.293 2.293-1.414 1.414L10 15.414l-2.293 2.293-1.414-1.414L8.586 14l-2.293-2.293 1.414-1.414L10 12.586l2.293-2.293 1.414 1.414L11.414 14z"
        fill={fill}
      />
    </svg>
  );
}

export default DeleteIcon;
