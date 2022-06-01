import React, { useCallback } from "react";
import { queryCache } from "react-query";
import ResultFileForm from "../../../components/domains/customer/results/ResultFileForm";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { usePatientCacheSelector } from "../../../modules/customer/profile/cacheSelector";
import { useCreateFileResultMutation } from "../../../modules/customer/result/mutation";
import { defaultResultRequest } from "../../../utils/defaultData";
import { RequestType } from "../../../utils/enums";

interface Props {
  handleShowResultFileDialog: () => void;
}

export default function ResultFileContainer({
  handleShowResultFileDialog,
}: Props) {
  const { currentPatient } = usePatientCacheSelector({});

  const onSuccess = useCallback(() => {
    handleShowResultFileDialog();
    queryCache.invalidateQueries([ReactQueryKeys["customer-results-key"]], {
      exact: false,
      refetchActive: true,
      refetchInactive: true,
    });
  }, [handleShowResultFileDialog]);

  const { loading, mutate } = useCreateFileResultMutation({
    showError: true,
    onSuccess,
  });

  const addResult = useCallback(
    (
      value: {
        requestType?: RequestType;
        requestCode?: string;
        itemCode?: string;
      } & Omit<Schemas.ResultFileRequest, "requestType">,
    ) => {
      mutate({
        ...value,
        code: currentPatient?.legalID || "",
      });
    },
    [currentPatient?.legalID, mutate],
  );

  return (
    <ResultFileForm
      initialValues={defaultResultRequest}
      currentPatient={currentPatient}
      loadingNewResult={loading}
      handleShowAddResult={handleShowResultFileDialog}
      handleAddResult={addResult}
    />
  );
}
