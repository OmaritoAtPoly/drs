import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function FaceIcon({
  width = 24,
  height = 24,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill={fill} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32 16c0 8.832-7.168 16-16 16S0 24.832 0 16 7.168 0 16 0s16 7.168 16 16zm-20.8 3.6a2 2 0 10-.001-4.002 2 2 0 00.001 4.001zm7.6-2a2 2 0 114.001 0 2 2 0 01-4.001 0zm6-8c-4.64 0-8.704-2.496-10.944-6.208A13.353 13.353 0 0116 3.2c4.64 0 8.704 2.496 10.944 6.208-.688.112-1.408.192-2.144.192zM3.872 11.951a12.874 12.874 0 005.856-7.104 12.874 12.874 0 00-5.856 7.104zm24.4.464c.336 1.136.528 2.336.528 3.584 0 7.056-5.744 12.8-12.8 12.8-7.056 0-12.8-5.744-12.8-12.8 0-.027.002-.054.004-.081.004-.051.007-.1-.004-.143 4.16-1.568 7.504-4.784 9.184-8.88 2.944 3.6 7.408 5.904 12.416 5.904 1.2 0 2.352-.144 3.472-.384z"
        fill={fill}
      />
    </svg>
  );
}

export default FaceIcon;
