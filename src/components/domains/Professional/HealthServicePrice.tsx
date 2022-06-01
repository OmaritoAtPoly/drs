import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "../../../styles/theme";

interface Props {
  type?: string;
  price?: number;
}
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(0.5),
    marginRight: 10,
  },
  typeStyle: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#1055b2",
  },
  priceStyle: {
    fontSize: "15px",
    fontWeight: "bold",
    color: theme.palette.grey["400"],
  },
});

const HealthServicePrice = ({ price, type }: Props) => {
  const classes = useStyles();

  return (
    <div id="type-and-price-container" className={classes.root}>
      <Typography className={classes.typeStyle}>{type}</Typography>
      <Typography className={classes.priceStyle}>{`$${price}`}</Typography>
    </div>
  );
};

export default HealthServicePrice;
