/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { createStyles, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import useProfileCacheSelector from "../../../../modules/profile/cacheSelector";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";
import PrimaryButton from "../../../buttons/PrimaryButton";
import PaymentCard from "./PaymentCard";

const styles = makeStyles((theme) =>
  createStyles({
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "70%",
      padding: theme.spacing(1),
      margin: theme.spacing(1),
      borderRadius: theme.spacing(2),
      backgroundColor: "#D6E3F3",
      cursor: "pointer",
    },
    selectedCard: {
      border: "2px solid #5E17EB",
    },
    name: {
      font: "14px",
      fontWeight: "bold",
    },
    text: {
      fontSize: "1.4rem",
      fontWeight: "bold",
    },
    expirate: { fontSize: "12px" },
    actions: {
      display: "flex",
    },
    listItem: {
      width: "100%",
      display: "flex",
      alignItems: "center",
    },
  }),
);

interface Props {
  paymentCards: Schemas.PaymentCardData[];
  paying: boolean;
  deleting: boolean;
  onAddPaymentCard: () => void;
  onDeletePaymentCard: (token: string) => void;
  onPay: (paymentCard: Schemas.PaymentCardData) => void;
}

export default function PaymentCardList({
  paymentCards,
  paying,
  deleting,
  onAddPaymentCard,
  onDeletePaymentCard,
  onPay,
}: Props) {
  const classes = styles();
  const [selectedCard, setSelectedCard] = useState<Schemas.PaymentCardData>();
  const { currentProfessional, loadingUserMe } = useProfileCacheSelector();
  const handleOnClick = useCallback((paymentCard: Schemas.PaymentCardData) => {
    setSelectedCard(paymentCard);
  }, []);

  const handleOnPay = useCallback(() => {
    if (selectedCard) {
      onPay(selectedCard);
    }
  }, [onPay, selectedCard]);

  useEffect(() => {
    if (
      !loadingUserMe &&
      currentProfessional &&
      currentProfessional.subscriptionCard
    ) {
      setSelectedCard(currentProfessional.subscriptionCard);
    } else {
      setSelectedCard(paymentCards[0]);
    }
  }, [currentProfessional, loadingUserMe, paymentCards]);

  return (
    <>
      <Typography variant="h6" color="primary">
        {STRINGS.payPlan.PICK_CARD}
      </Typography>
      {paymentCards.map((paymentCard) => (
        <div className={classes.listItem} key={paymentCard.token}>
          <PaymentCard
            key={paymentCard.token}
            handleOnClick={handleOnClick}
            paymentCard={paymentCard}
            selectedCard={selectedCard}
          />
          <BadgedButton
            iconName="delete"
            onClick={() => onDeletePaymentCard(paymentCard.token || "")}
            loading={deleting}
          />
        </div>
      ))}
      <div className={classes.actions}>
        <PrimaryButton
          label={STRINGS.payPlan.PAY_NOW}
          loading={paying}
          variant="contained"
          onClick={handleOnPay}
          disabled={!selectedCard || paying}
        />
        <PrimaryButton
          label={STRINGS.payPlan.ADD_PAYMENT_CARD}
          onClick={onAddPaymentCard}
        />
      </div>
    </>
  );
}
