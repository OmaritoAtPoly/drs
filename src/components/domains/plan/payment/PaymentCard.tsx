/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { createStyles, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import visa from "../../../../assert/visa.png";
import master from "../../../../assert/master.png";
import network from "../../../../assert/network.png";
import american from "../../../../assert/american.png";

import { CARD_TYPE } from "../../../../utils/enums";
import STRINGS from "../../../../utils/strings";

const styles = makeStyles((theme) =>
  createStyles({
    card: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "70%",
      padding: theme.spacing(1),
      margin: theme.spacing(1),
      borderRadius: theme.spacing(2),
      cursor: "pointer",
      boxShadow: "0px 4px 15px rgba(25, 10, 45, 0.15)",
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
    cardInfo: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    cardImage: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginRight: "16px",
    },
  }),
);

interface Props {
  selectedCard?: Schemas.PaymentCardData;
  paymentCard?: Schemas.PaymentCardData;
  handleOnClick: (paymentCard: Schemas.PaymentCardData) => void;
}

export default function PaymentCard({
  selectedCard,
  paymentCard,
  handleOnClick,
}: Props) {
  const classes = styles();

  const renderCardLogo = useCallback(
    (cardType: string) => {
      if (
        cardType.toUpperCase() === CARD_TYPE.VISA.VISA ||
        cardType.toUpperCase() === CARD_TYPE.VISA.VI
      ) {
        return (
          <div className={classes.cardImage}>
            <img src={visa} alt="visa-card" />
          </div>
        );
      }
      if (
        cardType.toUpperCase() === CARD_TYPE.MASTER.MASTERCARD ||
        cardType.toUpperCase() === CARD_TYPE.MASTER.MC
      ) {
        return (
          <div className={classes.cardImage}>
            <img src={master} alt="master-card" />
          </div>
        );
      }
      if (
        cardType.toUpperCase() === CARD_TYPE.DISCOVER.DISCOVER ||
        cardType.toUpperCase() === CARD_TYPE.DISCOVER.DC
      ) {
        return (
          <div className={classes.cardImage}>
            <img src={network} alt="discover-card" />
          </div>
        );
      }
      if (
        cardType.toUpperCase() === CARD_TYPE.AMERICAN_EXPRESS.AMERICANEXPRESS ||
        cardType.toUpperCase() === CARD_TYPE.AMERICAN_EXPRESS.AX ||
        cardType.toUpperCase() === CARD_TYPE.AMERICAN_EXPRESS.AMERICAN_EXPRESS
      ) {
        return (
          <div className={classes.cardImage}>
            <img src={american} alt="american-card" />
          </div>
        );
      }
      return <div />;
    },
    [classes.cardImage],
  );

  return paymentCard ? (
    <div
      className={`${classes.card} ${
        selectedCard?.token === paymentCard.token && classes.selectedCard
      }`}
      key={paymentCard.token}
      onClick={() => handleOnClick(paymentCard)}>
      <div className={classes.cardInfo}>
        <Typography className={classes.name}>
          {`${STRINGS.generals.CARD} ${paymentCard.type}`}
        </Typography>
        <Typography className={classes.expirate}>
          {`${paymentCard.bin}-xxxx-xxxx-${paymentCard.number}`}
        </Typography>
      </div>
      {renderCardLogo(paymentCard.type || "")}
    </div>
  ) : (
    <Typography className={classes.name}>
      {STRINGS.payPlan.NOT_PAYMENT_CARD}
    </Typography>
  );
}
