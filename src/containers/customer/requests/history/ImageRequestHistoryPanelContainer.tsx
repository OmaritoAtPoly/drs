import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import ImageRequestHistoryPanel from "../../../../components/domains/customer/request/history/ImageRequestHistoryPanel";
import { useImageRequestHistoryCacheSelector } from "../../../../modules/customer/request/history/imageHistoryCacheSelector";
import { useDeleteRequestHistoryImageMutation } from "../../../../modules/customer/request/history/mutation";

export default function ImageRequestHistoryPanelContainer() {
  const { id } = useParams<{ id?: string }>();

  const {
    imageRequestHistoryData,
    refetch,
    loading: loadingImageRequestHistory,
  } = useImageRequestHistoryCacheSelector();

  const onSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const { mutate, loading } = useDeleteRequestHistoryImageMutation({
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
    <ImageRequestHistoryPanel
      historicalImages={imageRequestHistoryData || []}
      deleteRequest={handleDeleteRequest}
      loading={loading}
      loadingImageRequestHistory={loadingImageRequestHistory}
    />
  );
}
