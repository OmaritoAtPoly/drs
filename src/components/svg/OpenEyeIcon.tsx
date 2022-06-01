import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function OpenEyeIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 16 11" fill={fill} {...props}>
      <path
        d="M8 0C4.364 0 1.258 2.262 0 5.455c1.258 3.192 4.364 5.454 8 5.454s6.742-2.262 8-5.454C14.742 2.262 11.636 0 8 0zm0 9.09a3.638 3.638 0 01-3.636-3.635A3.638 3.638 0 018 1.818a3.638 3.638 0 013.636 3.637A3.638 3.638 0 018 9.09zm0-5.817a2.179 2.179 0 00-2.182 2.182c0 1.207.975 2.181 2.182 2.181a2.179 2.179 0 002.182-2.181A2.179 2.179 0 008 3.273z"
        fill={fill}
      />
    </svg>
  );
}

export default OpenEyeIcon;
