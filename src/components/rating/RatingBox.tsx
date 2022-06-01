import { makeStyles, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React from "react";

interface Props {
  text?: string;
  readOnly?: boolean;
  disabled?: boolean;
  rateQuantity?: number;
  defaultValue?: number;
}
const useStyles = makeStyles({
  root: { display: "flex" },
},
);

const RatingBox = ({
  text = "",
  disabled = false,
  rateQuantity = 3,
  readOnly = false,
  defaultValue = 1,
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="legend">{text}</Typography>
      <Rating
        value={rateQuantity}
        readOnly={readOnly}
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default RatingBox;
