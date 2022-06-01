import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function AttachmentIcon({
  width = 18,
  height = 18,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 18"
      fill={fill}
      {...props}>
      <path
        d="M1.514 16.388c-2.046-2.12-2.008-5.538.049-7.65l7.345-7.543a3.908 3.908 0 015.626 0 4.104 4.104 0 010 5.705L8.13 13.47a2.605 2.605 0 01-3.78-.036c-.991-1.053-.96-2.723.05-3.76l5.033-5.162a.559.559 0 01.793-.008l.8.786a.564.564 0 01.008.796l-5.032 5.161c-.173.178-.184.473-.023.643a.372.372 0 00.55.006l6.402-6.569a1.847 1.847 0 000-2.559 1.675 1.675 0 00-2.422 0l-7.345 7.543c-1.217 1.25-1.236 3.274-.042 4.511a2.978 2.978 0 004.31.01l6.024-6.187a.559.559 0 01.792-.01l.801.787a.564.564 0 01.01.795l-6.025 6.188a5.21 5.21 0 01-7.52-.017z"
        fill="#5E17EB"
      />
    </svg>
  );
}

export default AttachmentIcon;
