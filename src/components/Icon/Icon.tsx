import { StyledProps } from "@material-ui/core";
import React from "react";
import { IconNames, icons } from "./IconNames";

export interface SvgProps {
  width?: number;
  height?: number;
  fill?: string;
}

interface Props {
  name: IconNames;
}

const Icon = React.memo(
  ({
    name,
    width,
    height,
    fill,
    className,
    ...props
  }: Props & SvgProps & Partial<StyledProps>) => {
    const svg = React.createElement(icons[name], {
      width,
      height,
      fill,
    });
    return (
      <div className={className} {...props}>
        {svg}
      </div>
    );
  },
);

export default Icon;
