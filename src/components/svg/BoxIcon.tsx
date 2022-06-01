import * as React from "react";

import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function BoxIcon({
  width = 22,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 29"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.802 7.83a1 1 0 010-1.733L12.127.135A.989.989 0 0112.7.003a.989.989 0 01.571.132l10.326 5.962a1 1 0 010 1.732L13.27 13.791a.989.989 0 01-.571.133.99.99 0 01-.572-.133L1.802 7.829zm23.422 3.688a1 1 0 00-1.5-.867l-9.32 5.381a.987.987 0 00-.429.493.987.987 0 00-.212.618v10.762a1 1 0 001.5.866l9.32-5.38a.986.986 0 00.428-.494.987.987 0 00.213-.618V11.518zM1.5 10.7a1 1 0 00-1.5.866V22.33c0 .24.081.452.213.618a.987.987 0 00.429.493l9.32 5.38a1 1 0 001.5-.865V17.193a.987.987 0 00-.213-.618.987.987 0 00-.43-.493L1.5 10.702z"
        fill={fill}
      />
    </svg>
  );
}

export default BoxIcon;
