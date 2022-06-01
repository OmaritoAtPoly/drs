import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import LabRequestHistoryPanel from "../../../../components/domains/customer/request/history/LabRequestHistoryPanel";
import { useLabRequestHistoryCacheSelector } from "../../../../modules/customer/request/history/labHistoryCacheSelector";
import { useDeleteRequestHistoryLaboratoryMutation } from "../../../../modules/customer/request/history/mutation";

export default function LabRequestHistoryPanelContainer() {
  const { id } = useParams<{ id?: string }>();

  const {
    labRequestHistoryData,
    refetch,
    loading: labRequestLoading,
  } = useLabRequestHistoryCacheSelector();

  const onSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const { mutate, loading } = useDeleteRequestHistoryLaboratoryMutation({
    onSuccess,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeleteRequest = useCallback(
    (requestCode: string) => {
      mutate({ code: id || "", requestCode });
    },
    [id, mutate],
  );
  return (
    <LabRequestHistoryPanel
      historicalLabs={labRequestHistoryData || []}
      deleteRequest={handleDeleteRequest}
      loading={loading}
      loadingLabRequestHistory={labRequestLoading}
    />
  );
}
