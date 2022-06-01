import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function PaymentCardIcon({
  width = 40,
  height = 30,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 30"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36 0H4C1.78 0 .02 1.618.02 3.636L0 25.455c0 2.018 1.78 3.636 4 3.636h32c2.22 0 4-1.618 4-3.637V3.636C40 1.618 38.22 0 36 0zm0 25.454H4V14.545h32v10.91zM4 7.273h32V3.636H4v3.637z"
        fill={fill}
      />
    </svg>
  );
}

export default PaymentCardIcon;
