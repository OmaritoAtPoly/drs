/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import OtherRequestHistoryPanel from "../../../../components/domains/customer/request/history/OtherRequestHistoryPanel";
import { useDeleteOtherRequestItemMutation } from "../../../../modules/customer/request/mutation";
import useOtherRequestQueryCacheSelector from "../../../../modules/customer/request/otherRequestsQueryCacheSelector";

export default function OtherRequestHistoryPanelContainer() {
  const { id } = useParams<{ id?: string }>();
  const {
    loading,
    page,
    pageSize,
    otherRequests,
    refetch,
  } = useOtherRequestQueryCacheSelector();

  const onSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const { mutate, loading: deleting } = useDeleteOtherRequestItemMutation({
    onSuccess,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDeleteRequest = useCallback(
    (requestCode: string) => {
      mutate({
        code: id || "",
        requestCode,
      });
    },
    [id, mutate],
  );

  return (
    <OtherRequestHistoryPanel
      otherRequests={otherRequests || []}
      deleteRequest={handleDeleteRequest}
      deleting={deleting}
      loadingOtherRequests={loading}
    />
  );
}
