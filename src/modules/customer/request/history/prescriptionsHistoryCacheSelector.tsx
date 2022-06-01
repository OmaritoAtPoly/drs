import { useCallback } from "react";
import { queryCache } from "react-query";
import { ReactQueryKeys } from "../../../apiTypes";

// eslint-disable-next-line import/prefer-default-export
export const useSaveCurrentPrescriptionCacheSelector = () => {
  const saveCurrentPrescription = useCallback(
    (data?: Schemas.PrescriptionResponse) => {
      queryCache.setQueryData<Schemas.PrescriptionResponse | undefined>(
        [ReactQueryKeys["customer-current-prescription-key"]],
        data,
      );
    },
    [],
  );
  return { saveCurrentPrescription };
};
