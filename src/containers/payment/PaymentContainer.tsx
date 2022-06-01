/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import PaymentezForm from "../../components/paymentez/Paymentez";
import { ReactQueryKeys } from "../../modules/apiTypes";
import { useAddCardMutation } from "../../modules/payment/mutation";
import useProfileCacheSelector from "../../modules/profile/cacheSelector";
import useHandlerError from "../../modules/utils/error/handleError";
import STRINGS from "../../utils/strings";

const PAYMENTEZ_CLIENT_APP_CODE = "TPP3-EC-CLIENT";
const PAYMENTEZ_CLIENT_APP_KEY = "ZfapAKOk4QFXheRNvndVib9XU3szzg";

export default function PaymentContainer() {
  const { currentProfessional } = useProfileCacheSelector();
  const [loading, setLoading] = useState<boolean>(false);
  const { handlerError } = useHandlerError();

  const onSuccess = useCallback(() => {
    setLoading(false);
    queryCache.invalidateQueries(ReactQueryKeys["payment-card-key"]);
  }, []);

  const { mutate } = useAddCardMutation({
    showError: true,
    onSuccess,
  });
  const [cardToSave, setCardToSave] = useState<Schemas.PaymentCardData>();

  const successHandler = useCallback(
    (res: any) => {
      if (res.card.status === "valid" || res.card.status === "review") {
        mutate({
          code: currentProfessional?.legalID,
          bin: res.card.bin,
          expiryMonth: res.card.expiry_month,
          expiryYear: res.card.expiry_year,
          holder: cardToSave?.holder,
          message: res.card.message,
          number: res.card.number,
          origin: res.card.origin,
          status: res.card.status,
          token: res.card.token,
          transactionReference: res.card.transaction_reference,
          type: res.card.type,
        });
      } else {
        setLoading(false);
        handlerError(STRINGS.payment.INVALID_CARD);
      }
    },
    [cardToSave?.holder, currentProfessional?.legalID, handlerError, mutate],
  );

  const errorHandler = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (error: any) => {
      setLoading(false);
      handlerError(STRINGS.payment.INSERTION_CARD_ERROR);
    },
    [handlerError],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAddCard = useCallback(
    (myCard: any) => {
      setLoading(true);
      (window as any).Payment.init(
        "stg",
        PAYMENTEZ_CLIENT_APP_CODE,
        PAYMENTEZ_CLIENT_APP_KEY,
      );
      const { card } = myCard.PaymentForm("card");
      if (card) {
        setCardToSave({
          expiryYear: card.expiry_year,
          expiryMonth: card.expiry_month,
          holder: card.holder_name,
          number: card.number,
          type: card.type,
        });
        (window as any).Payment.addCard(
          currentProfessional?.legalID,
          currentProfessional?.professionalEmail,
          { card: { ...card } },
          successHandler,
          errorHandler,
          myCard,
        );
      }
    },
    [
      currentProfessional?.legalID,
      currentProfessional?.professionalEmail,
      errorHandler,
      successHandler,
    ],
  );
  return <PaymentezForm onAddCard={handleAddCard} loading={loading} />;
}
