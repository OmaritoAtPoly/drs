import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function FormIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 25 18" fill={fill} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.48 6.75v9c0 1.238-1.067 2.25-2.371 2.25H3.132C1.827 18 .76 16.999.76 15.761V2.25C.76 1.012 1.827 0 3.132 0h14.232l7.117 6.75zM3.133 2.249v13.5h18.976V7.874h-5.93V2.249H3.132zM13.41 5.798H5.504v1.581h7.907V5.798zM5.504 3.689h7.907v1.582H5.504V3.689zm.508 4.745H9.74c.28 0 .508.227.508.508v3.727c0 .281-.227.509-.508.509H6.012a.508.508 0 01-.508-.509V8.942c0-.28.228-.508.508-.508zm3.262 2.795c.07 0 .127-.057.127-.127v-.593a.127.127 0 00-.127-.127H8.3v-.974a.127.127 0 00-.127-.127H7.58a.127.127 0 00-.128.127v.974h-.974a.127.127 0 00-.127.127v.593c0 .07.057.127.127.127h.974v.975c0 .07.058.127.128.127h.593c.07 0 .127-.058.127-.127v-.975h.974z"
        fill={fill}
      />
    </svg>
  );
}

export default FormIcon;
