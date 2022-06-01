import * as React from "react";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function DoubleCellIcon({
  width = 31,
  height = 26,
  fill = "none",
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 31 26"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.417 0H17.194C15.431 0 14 1.324 14 2.955v20.09C14 24.677 15.431 26 17.194 26h10.223c1.763 0 3.194-1.324 3.194-2.954V2.954C30.611 1.324 29.18 0 27.417 0zm-5.113 24.818c-1.06 0-1.916-.792-1.916-1.773 0-.98.856-1.772 1.916-1.772 1.061 0 1.917.791 1.917 1.772s-.856 1.773-1.916 1.773zm-5.748-4.727h11.5V3.545h-11.5v16.546z"
        fill="#25CEDE"
      />
      <path d="M15 4H29.58V18.58H15z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.417 0H3.194C1.431 0 0 1.324 0 2.955v20.09C0 24.677 1.431 26 3.194 26h10.223c1.763 0 3.194-1.324 3.194-2.954V2.954C16.611 1.324 15.18 0 13.417 0zM8.305 24.818c-1.061 0-1.917-.792-1.917-1.773 0-.98.856-1.772 1.917-1.772 1.06 0 1.916.791 1.916 1.772s-.856 1.773-1.916 1.773zm-5.749-4.727h11.5V3.545h-11.5v16.546z"
        fill="#5E17EB"
      />
      <path d="M1.18176 3.5459H15.363560000000001V17.727700000000002H1.18176z" />
    </svg>
  );
}

export default DoubleCellIcon;
