import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function EditIcon({
  width = 20,
  height = 20,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.244.25a.75.75 0 00-.525.218L9.347 1.84l2.812 2.813 1.372-1.373a.747.747 0 000-1.057L11.776.468a.736.736 0 00-.532-.218zm-2.7 4.515l.69.69-6.795 6.795h-.69v-.69l6.795-6.795zM.249 10.938l8.295-8.296 2.813 2.813-8.295 8.295H.249v-2.813z"
        fill={fill}
      />
    </svg>
  );
}

export default EditIcon;
