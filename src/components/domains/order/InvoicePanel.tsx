import { createStyles, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../utils/strings";

const useStyles = makeStyles((theme) =>
  createStyles({
    invoiceContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: theme.spacing(1),
      border: `1px solid ${theme.palette.grey[300]}`,
      borderRadius: theme.spacing(1),
    },
    invoiceRow: {
      display: "flex",
      marginTop: theme.spacing(1),
    },
    invoiceLabel: { fontWeight: "bold", marginRight: theme.spacing(1) },
  }),
);

interface Props {
  subtotal: number;
  discount?: number;
  tax12: number;
  subtotalNoTax: number;
  subtotal12Tax: number;
  total: number;
}

export default function InvoicePanel({
  discount = 0,
  tax12,
  subtotal12Tax,
  subtotalNoTax,
  subtotal,
  total,
}: Props) {
  const classes = useStyles();
  return (
    <div className={classes.invoiceContainer}>
      <div>
        {subtotal12Tax > 0 && (
          <div className={classes.invoiceRow}>
            <Typography className={classes.invoiceLabel}>
              {STRINGS.order.SUBTOTAL_TAX_12.toUpperCase()}
            </Typography>
            <Typography>{`${subtotal12Tax}`}</Typography>
          </div>
        )}
        {tax12 > 0 && (
          <div className={classes.invoiceRow}>
            <Typography className={classes.invoiceLabel}>
              {STRINGS.order.TAX12.toUpperCase()}
            </Typography>
            <Typography>{`$ ${tax12}`}</Typography>
          </div>
        )}
        {subtotalNoTax > 0 && (
          <div className={classes.invoiceRow}>
            <Typography className={classes.invoiceLabel}>
              {STRINGS.order.SUBTOTAL_NO_TAX.toUpperCase()}
            </Typography>
            <Typography>{`${subtotalNoTax}`}</Typography>
          </div>
        )}
        <div className={classes.invoiceRow}>
          <Typography className={classes.invoiceLabel}>
            {STRINGS.order.SUBTOTAL.toUpperCase()}
          </Typography>
          <Typography>{`$ ${subtotal}`}</Typography>
        </div>

        <div className={classes.invoiceRow}>
          <Typography className={classes.invoiceLabel}>
            {STRINGS.order.DISCOUNT.toUpperCase()}
          </Typography>
          <Typography>
            {`$ ${Number.isNaN(discount) ? 0 : discount}`}
          </Typography>
        </div>
      </div>
      <div className={classes.invoiceRow}>
        <Typography className={classes.invoiceLabel}>
          {STRINGS.order.TOTAL.toUpperCase()}
        </Typography>
        <Typography>{`$ ${total}`}</Typography>
      </div>
    </div>
  );
}
