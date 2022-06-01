// import { useAlertSelector } from "../hooks";
import { useCallback } from "react";
import { queryCache, useQuery } from "react-query";
import STRINGS from "../../../utils/strings";
import { ReactQueryKeys, ReactQueryStaleTime } from "../../apiTypes";
import TreatedError from "./TreatedError";

export const getMessage = (error: Error | TreatedError | string) => {
  const treatedError = error as TreatedError;

  if (treatedError.status === 403) {
    return STRINGS.error.NOT_AUTHORIZED;
  }

  let message = STRINGS.error.UNKNOWN_ERROR;
  if (typeof error === "string") {
    message = error;
  }

  if (treatedError.treatedError) {
    message = (error as TreatedError).message;
  }

  if ((error as Error).message) {
    message = (error as Error).message;
  }

  // eslint-disable-next-line consistent-return
  return message;
};

export const useHandlerError = () => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { addLastAlerts } = useAddLastAlerts();
  const handlerError = (error: Error | TreatedError | string) => {
    // eslint-disable-next-line no-console
    console.log("Real error: ", error);
    // eslint-disable-next-line no-console
    console.log("Internal code error: ", (error as TreatedError).internalCode);

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const message = getMessage(error);

    addLastAlerts(message);
  };

  return { handlerError };
};

export const useAlertSelector = () => {
  // eslint-disable-next-line no-spaced-func
  const { data, isLoading: loading } = useQuery<
    (Error | TreatedError | string)[],
    TreatedError
  >([ReactQueryKeys["errors-key"]], { staleTime: ReactQueryStaleTime.NEVER });

  return { alerts: data || [], loading };
};

export const useAddLastAlerts = () => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const { popFirstAlerts } = useShiftFirstAlerts();
  const addLastAlerts = useCallback(
    (alert: Error | TreatedError | string) => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const alerts =
        (queryCache.getQueryData([ReactQueryKeys["errors-key"]]) as (
          | Error
          | TreatedError
          | string
        )[]) || [];
      // get if message already exist
      if (alerts.some((a) => getMessage(a) === getMessage(alert))) {
        return;
      }

      setTimeout(() => {
        popFirstAlerts();
      }, 3000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newData = [...alerts, alert];
      queryCache.setQueryData<(Error | TreatedError | string)[]>(
        [ReactQueryKeys["errors-key"]],
        newData,
      );
    },
    [popFirstAlerts],
  );

  return { addLastAlerts };
};

export const useShiftFirstAlerts = () => {
  const shiftFirstAlerts = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const alerts =
      (queryCache.getQueryData([ReactQueryKeys["errors-key"]]) as (
        | Error
        | TreatedError
        | string
      )[]) || [];
    const newData = [...alerts];
    newData.shift();
    queryCache.setQueryData<(Error | TreatedError | string)[]>(
      [ReactQueryKeys["errors-key"]],
      newData,
    );
  }, []);

  return { popFirstAlerts: shiftFirstAlerts };
};

export default useHandlerError;

export enum InternalCode {
  "CODE_1000" = 1000,
  "CODE_1001" = 1001,
  "CODE_1002" = 1002,
  "CODE_402" = 402,
  "CODE_417" = 417,
}
