import React, { useCallback, useEffect } from "react";
import { queryCache } from "react-query";
import PaymentCardPanel from "../../components/domains/plan/payment/PaymentCardPanel";
import { ReactQueryKeys } from "../../modules/apiTypes";
import {
  usePaymentCacheSelector,
  useSavePlanExpiredSelector,
} from "../../modules/payment/cacheSelector";
import {
  useDeletePayCardMutation,
  usePaySubscriptionMutation,
} from "../../modules/payment/mutation";
import { useAddLastAlerts } from "../../modules/utils/error/handleError";
import {
  AsyncStorageKeys,
  getStringItemAsyncStore,
  setStringItemAsyncStore,
} from "../../modules/utils/storage/AsyncStorageKeys";
import STRINGS from "../../utils/strings";

interface Props {
  plan: Schemas.SubscriptionData;
  handleShow: () => void;
}

export default function PaymentCardPanelContainer({ plan, handleShow }: Props) {
  const { loading, data } = usePaymentCacheSelector();
  const { addLastAlerts } = useAddLastAlerts();
  const { savePlanExpired } = useSavePlanExpiredSelector();

  useEffect(() => {
    const idInterval = setInterval(async () => {
      const shouldRefetchCards = await getStringItemAsyncStore(
        AsyncStorageKeys.REFETCH_CARDS_KEY_STORE,
      );
      if (shouldRefetchCards === "true") {
        setStringItemAsyncStore(
          AsyncStorageKeys.REFETCH_CARDS_KEY_STORE,
          "false",
        );
        queryCache.invalidateQueries([ReactQueryKeys["payment-card-key"]], {
          exact: true,
          refetchActive: true,
          refetchInactive: true,
        });
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, []);

  const handleOnAddPaymentCard = useCallback(() => {
    $("#hide-paymentez-dialog-id").removeClass("hide-paymentez-dialog");
  }, []);

  const onSuccess = useCallback(async () => {
    savePlanExpired({ planExpired: false });
    await setStringItemAsyncStore(AsyncStorageKeys.PLAN_EXPIRED_STORE, "");
    addLastAlerts({
      message: STRINGS.payment.SUCCESS_PAY,
      severity: "success",
      name: "",
    });
    queryCache.invalidateQueries(ReactQueryKeys["professional-me"]);
    handleShow();
  }, [addLastAlerts, handleShow, savePlanExpired]);

  const { mutate, loading: loadingPaying } = usePaySubscriptionMutation({
    showError: true,
    onSuccess,
  });

  const onDeleteSuccess = useCallback(() => {
    queryCache.invalidateQueries([ReactQueryKeys["payment-card-key"]], {
      exact: true,
      refetchActive: true,
      refetchInactive: true,
    });
  }, []);

  const { mutate: deleteMutate, loading: deleting } = useDeletePayCardMutation({
    showError: true,
    onSuccess: onDeleteSuccess,
  });

  const handleOnPay = useCallback(
    (paymentCard: Schemas.PaymentCardData) => {
      mutate({
        subscriptionCode: plan.code || "",
        ...paymentCard,
      });
    },
    [mutate, plan.code],
  );

  const handleOnDelete = useCallback(
    (token: string) => {
      deleteMutate({ token });
    },
    [deleteMutate],
  );

  return (
    <PaymentCardPanel
      loading={loading}
      paying={loadingPaying}
      deleting={deleting}
      paymentCards={data?.items}
      onAddPaymentCard={handleOnAddPaymentCard}
      onDeletePaymentCard={handleOnDelete}
      onPay={handleOnPay}
    />
  );
}
