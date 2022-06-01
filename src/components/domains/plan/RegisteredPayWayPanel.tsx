import { createStyles, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useMemo } from "react";
import { queryCache } from "react-query";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { usePaymentCacheSelector } from "../../../modules/payment/cacheSelector";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import {
  AsyncStorageKeys,
  getStringItemAsyncStore,
  setStringItemAsyncStore,
} from "../../../modules/utils/storage/AsyncStorageKeys";
import STRINGS from "../../../utils/strings";
import PaymentCard from "./payment/PaymentCard";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = makeStyles((theme) =>
  createStyles({
    container: { margin: theme.spacing(1), maxWidth: "350px" },
    title: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      fontSize: "20px",
    },
    info: {
      display: "flex",
      alignItems: "start",
    },
    infoDate: {
      fontSize: "12px",
      marginTop: theme.spacing(-0.5),
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  }),
);

export default function RegisteredPayWayPanel() {
  const classes = styles();
  const { currentProfessional, loadingUserMe } = useProfileCacheSelector();
  const { loading, data } = usePaymentCacheSelector();

  const firstPayment = useMemo(
    () => (!loading && data && data.items ? data.items[0] : {}),
    [data, loading],
  );

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

  return (
    <div className={classes.container}>
      <Typography className={classes.title} color="primary">
        {STRINGS.payment.REGISTERED_PAY_WAY}
      </Typography>
      <div className={classes.info}>
        {!loadingUserMe &&
          !loading &&
          currentProfessional &&
          currentProfessional && (
            <PaymentCard
              paymentCard={
                currentProfessional?.subscriptionCard || firstPayment
              }
              handleOnClick={() => {}}
            />
          )}
      </div>
    </div>
  );
}
