import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React, { useCallback } from "react";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";
import PaymentCardList from "./PaymentCardList";

interface Props {
  paymentCards?: Schemas.PaymentCardData[];
  loading: boolean;
  paying: boolean;
  deleting: boolean;
  onAddPaymentCard: () => void;
  onDeletePaymentCard: (token: string) => void;
  onPay: (paymentCard: Schemas.PaymentCardData) => void;
}

export default function PaymentCardPanel({
  paymentCards,
  loading,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  paying,
  deleting,
  onAddPaymentCard,
  onDeletePaymentCard,
  onPay,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderComponent = useCallback(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      paymentCards && paymentCards.length > 0 ? (
        <PaymentCardList
          paymentCards={paymentCards}
          paying={paying}
          deleting={deleting}
          onAddPaymentCard={onAddPaymentCard}
          onDeletePaymentCard={onDeletePaymentCard}
          onPay={onPay}
        />
      ) : (
        <>
          <Typography variant="h6" color="primary">
            {STRINGS.payPlan.NOT_PAYMENT_CARD}
          </Typography>
          <PrimaryButton
            label={STRINGS.payPlan.ADD_PAYMENT_CARD}
            onClick={onAddPaymentCard}
            variant="contained"
          />
        </>
      ),
    [
      deleting,
      onAddPaymentCard,
      onDeletePaymentCard,
      onPay,
      paying,
      paymentCards,
    ],
  );

  return loading ? (
    <Skeleton width="100%" height={100} variant="rect" />
  ) : (
    renderComponent()
  );
}
