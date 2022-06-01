import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function WriteReviewIcon({
  width = 22,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 19"
      fill={fill}
      {...props}>
      <path
        d="M14.678 3.084l3.289 3.348a.368.368 0 010 .513l-7.963 8.106-3.383.382a.716.716 0 01-.784-.798l.376-3.444 7.962-8.107a.352.352 0 01.503 0zm5.906-.85L18.805.424a1.408 1.408 0 00-2.012 0l-1.29 1.313a.367.367 0 000 .512l3.288 3.348a.352.352 0 00.503 0l1.29-1.314a1.47 1.47 0 000-2.049zM14 12.846v3.779H2.333V4.747h8.378a.444.444 0 00.31-.13l1.459-1.484c.277-.282.08-.761-.31-.761H1.75C.784 2.372 0 3.17 0 4.153v13.065C0 18.202.784 19 1.75 19h12.833c.966 0 1.75-.798 1.75-1.782v-5.857a.437.437 0 00-.747-.315l-1.458 1.485a.46.46 0 00-.128.315z"
        fill={theme.palette.secondary.main}
      />
    </svg>
  );
}

export default WriteReviewIcon;
