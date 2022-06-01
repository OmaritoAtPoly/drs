import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function HospitalPlaceHolder({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 128 128"
      {...props}>
      <path
        d="M124.875 56.716l-24.176-24.183V8.678a4.095 4.095 0 00-5.022-3.984l-65.22 15.218a4.096 4.096 0 00-3.163 3.984v34.185H5.556a3.445 3.445 0 00-3.44 3.448v58.436a3.445 3.445 0 003.44 3.448h116.88a3.451 3.451 0 003.449-3.448V59.153a3.448 3.448 0 00-1.01-2.437zm-97.602 59.809H9.003V64.969h18.291zm59.412-18.297H75.13V75.764H52.452v22.463H40.89V46.853h11.562v20.213H75.13V46.853h11.555zm32.304 5.586h-13.233a3.494 3.494 0 00-.899-.119H100.7V42.277l18.29 18.297z"
        fill={fill}
      />
      <path d="M14.27266 74.56013H22.00378V84.34834000000001H14.27266z" />
      <path d="M14.27266 97.14516H22.00378V106.93337H14.27266z" />
      <path d="M105.98091 68.49469H113.71203V76.74356H105.98091z" />
      <path d="M105.98091 87.5278H113.71203V95.77667H105.98091z" />
    </svg>
  );
}

export default HospitalPlaceHolder;
