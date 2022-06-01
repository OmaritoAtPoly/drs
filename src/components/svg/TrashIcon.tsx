import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function TrashIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 17 18" fill={fill} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.727 0h4.909c.903 0 1.636.733 1.636 1.636v.82h2.454c.904 0 1.637.732 1.637 1.636v1.636c0 .904-.733 1.636-1.637 1.636h-.065l-.753 9c0 .903-.732 1.636-1.636 1.636H4.09c-.904 0-1.637-.733-1.634-1.568l-.756-9.068h-.065A1.636 1.636 0 010 5.728V4.092c0-.904.733-1.637 1.636-1.637h2.455v-.819C4.09.733 4.823 0 5.727 0zM4.091 4.09H1.636v1.636h13.09V4.09H4.091zm8.928 3.274H3.343l.747 8.999h8.182l.003-.068.744-8.93zm-2.383-5.729v.818H5.727v-.818h4.91zM5.15 9.578l1.157-1.157 1.875 1.876 1.876-1.876 1.157 1.157-1.876 1.876 1.876 1.876-1.157 1.157-1.876-1.876-1.875 1.876-1.157-1.157 1.875-1.876L5.15 9.578z"
        // fill="#F41616"
        fill={fill}
      />
    </svg>
  );
}

export default TrashIcon;
