import { useCallback } from "react";
import { queryCache, useQuery } from "react-query";
import { ReactQueryKeys } from "../../apiTypes";
import TreatedError from "../../utils/error/TreatedError";

// eslint-disable-next-line import/prefer-default-export
export const useSignUpCustomerCacheSelector = () => {
  const { data: customerAvatarRequest } = useQuery<
    Paths.SetAvatar.RequestBody,
    TreatedError
  >([ReactQueryKeys["customer-avatar-request-key"]], {
    structuralSharing: false,
  } as Object);

  const saveCustomerAvatarRequest = useCallback(
    (data: Paths.SetAvatar.RequestBody) => {
      queryCache.setQueryData(
        [ReactQueryKeys["customer-avatar-request-key"]],
        data,
      );
    },
    [],
  );

  return { customerAvatarRequest, saveCustomerAvatarRequest };
};
