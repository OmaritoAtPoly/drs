import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function ChatIcon({
  width = 25,
  height = 17,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 29 21"
      fill={fill}
      {...props}>
      <path
        d="M11.278 14.648c-1.893 0-3.677-.303-5.244-.838-1.58 1.1-3.517 1.77-5.576 1.963a.479.479 0 01-.045.002c-.188 0-.358-.112-.404-.272-.049-.177.105-.287.258-.417.757-.647 1.673-1.156 2.032-3.33C.857 10.527 0 8.992 0 7.325 0 3.279 5.05 0 11.278 0c6.228 0 11.277 3.279 11.277 7.324 0 4.048-5.05 7.324-11.277 7.324zm17.474 4.803c-.702-.588-1.553-1.05-1.886-3.027 3.464-2.894 2.626-7.033-1.897-9.28l.003.18c0 5.49-6.524 9.698-14.311 9.466 1.92 1.387 4.732 2.263 7.867 2.263 1.758 0 3.414-.276 4.869-.762 1.466 1 3.266 1.61 5.178 1.784.19.018.37-.088.416-.245.046-.161-.097-.26-.24-.38z"
        fill={fill}
      />
    </svg>
  );
}

export default ChatIcon;
