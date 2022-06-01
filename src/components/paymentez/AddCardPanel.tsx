import { createStyles, makeStyles } from "@material-ui/core";
import React, { useCallback } from "react";
import STRINGS from "../../utils/strings";
import PrimaryButton from "../buttons/PrimaryButton";

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      padding: "10px",
      width: "100%",
      backgroundColor: "#F5F5F7",
      borderRadius: "8px",
    },
  }),
);

interface Props {
  loading: boolean;
  onAddCard: (card: Schemas.PaymentCardData) => void;
}

export default function AddCardPanel({ loading, onAddCard }: Props) {
  const handleOnAddClick = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const myCard = $("#my-card") as any;
    onAddCard(myCard);
  }, [onAddCard]);

  const classes = useStyles();
  return (
    <div className={classes.form}>
      <div className="payment-form" id="my-card" data-capture-name="true" />
      <PrimaryButton
        label={STRINGS.payPlan.ADD_PAYMENT_CARD}
        onClick={handleOnAddClick}
        loading={loading}
        disabled={loading}
        variant="contained"
      />
    </div>
  );
}
