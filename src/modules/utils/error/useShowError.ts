import { useEffect } from "react";
import { useHandlerError } from "./handleError";
import TreatedError from "./TreatedError";

// eslint-disable-next-line import/prefer-default-export
export const useShowError = ({
  error,
  action,
  showError = false,
}: {
  error?: TreatedError;
  action?: Function;
  showError?: boolean;
}) => {
  const { handlerError } = useHandlerError();
  useEffect(() => {
    if (showError && error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      action && action();
      handlerError(error);
    }
  }, [error, action, showError, handlerError]);
};
