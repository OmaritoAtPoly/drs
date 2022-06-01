import React from "react";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";

interface Props {
  checked: boolean;
}

const CheckBox = ({ checked, ...rest }: Props & CheckboxProps) => (
  <Checkbox checked={checked} color="primary" {...rest} />
);

export default CheckBox;
