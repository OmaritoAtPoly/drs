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
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";

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
    largeColumn: {
      width: "20%",
      padding: 2,
      justifyContent: "center",
    },
    flex: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingLeft: theme.spacing(2),
    },
    item: {
      fontWeight: "bold",
      display: "flex",
      justifyContent: "center",
    },
  }),
);

const OrderDetailHeader = () => {
  const classes = useStyles();

  const largeDevice = useMediaQuery(() =>
    theme.breakpoints.up("md"),
  );

  const rowInLagerDevice = useMemo(
    () => (
      <ListItem button alignItems="flex-start" className={classes.flex} id="order-detail-header">

        <div className={classes.shortColumn}>
          <ListItemText
            primary={
              <Typography className={classes.item}>
                {STRINGS.order.NUMBER_SIMBOL}
              </Typography>
            }
          />
        </div>
        <div className={classes.shortColumn}>
          <ListItemText
            primary={
              <Typography className={classes.item}>
                {STRINGS.order.ORDER_DESCRIPTION}
              </Typography>
            }
          />
        </div>
        <div className={classes.shortColumn}>
          <ListItemText
            primary={<Typography className={classes.item}>{STRINGS.recipe.AMOUNT}</Typography>}
          />
        </div>
        <div className={`${classes.shortColumn}`}>
          <ListItemText
            primary={<Typography className={classes.item}>{STRINGS.order.UNIT_COST}</Typography>}
          />
        </div>
        <div className={`${classes.largeColumn}`}>
          <ListItemText
            primary={
              <Typography className={classes.item}>{STRINGS.order.DISCOUNT}</Typography>
            }
          />
        </div>
        <div className={classes.shortColumn}>
          <ListItemText
            primary={<Typography className={classes.item}>{STRINGS.payPlan.IVA}</Typography>}
          />
        </div>
        <div className={classes.shortColumn}>
          <ListItemText
            primary={<Typography className={classes.item}>{STRINGS.payPlan.SUBTOTAL}</Typography>}
          />
        </div>
      </ListItem>
    ),
    [classes.flex, classes.item,
    classes.largeColumn,
    classes.shortColumn],
  );

  return (
    <div className={classes.container}>{largeDevice && rowInLagerDevice}</div>
  );
};

export default OrderDetailHeader;
