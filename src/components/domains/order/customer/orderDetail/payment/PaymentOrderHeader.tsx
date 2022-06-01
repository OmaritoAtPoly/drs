/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createStyles,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import React, { useMemo } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    shortColumn: {
      width: "10%",
      padding: 2,
    },
    flex: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      paddingRight: "11%",
    },
    item: {
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
    },
  }),
);

const PaymentOrderHeader = () => {
  const classes = useStyles();

  const largeDevice = useMediaQuery(() =>
    theme.breakpoints.up("md"),
  );

  const rowInLagerDevice = useMemo(
    () => (
      <ListItem button alignItems="flex-start" className={classes.flex} id="order-detail-header">
        <div className={classes.shortColumn}>
          <ListItemText
            primary={<Typography className={classes.item}>{STRINGS.order.PAYMENT}</Typography>}
          />
        </div>
        <div className={`${classes.shortColumn}`}>
          <ListItemText
            primary={<Typography className={classes.item}>{STRINGS.order.VALUE}</Typography>}
          />
        </div>
        <div className={`${classes.shortColumn}`}>
          <ListItemText
            primary={
              <Typography className={classes.item}>{STRINGS.order.DATE}</Typography>
            }
          />
        </div>
      </ListItem>
    ),
    [classes.flex, classes.item,
    classes.shortColumn],
  );

  return (
    <div className={classes.container}>{largeDevice && rowInLagerDevice}</div>
  );
};

export default PaymentOrderHeader;
