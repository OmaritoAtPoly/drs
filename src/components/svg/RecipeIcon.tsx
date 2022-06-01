import * as React from "react";
import theme from "../../styles/theme";

interface Props {
  width?: number;
  height?: number;
  fill?: string | number;
}

function RecipeIcon({
  width = 25,
  height = 25,
  fill = theme.palette.primary.main,
  ...props
}: Props & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 45 35"
      fill={fill}
      {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M45 12.805V29.88c0 2.347-2.025 4.268-4.5 4.268h-36c-2.475 0-4.5-1.9-4.5-4.247V4.268C0 1.921 2.025 0 4.5 0h27L45 12.805zM4.5 4.267v25.61h36v-14.94H29.25V4.268H4.5zM24 10.999H9v3h15v-3zM9 7h15v3H9v-3zm.964 9h7.072c.532 0 .964.432.964.964v7.072a.964.964 0 01-.964.964H9.964A.965.965 0 019 24.035v-7.072c0-.532.432-.964.964-.964zm6.188 5.303a.242.242 0 00.24-.24v-1.126a.242.242 0 00-.24-.24h-1.848v-1.849a.242.242 0 00-.242-.241h-1.124a.242.242 0 00-.242.241v1.848h-1.848a.242.242 0 00-.24.241v1.125c0 .133.108.241.24.241h1.848v1.849c0 .132.109.24.242.24h1.124a.242.242 0 00.242-.24v-1.849h1.848z"
        fill={fill}
      />
    </svg>
  );
}

export default RecipeIcon;
