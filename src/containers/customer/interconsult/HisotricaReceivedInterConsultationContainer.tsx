/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from "react";
import { queryCache } from "react-query";
import ReceivedInterConsult from "../../../components/domains/customer/interconsult/history/ReceivedInterConsult";
import RequestHistoryItemSkeleton from "../../../components/skeletons/RequestHistoryItemSkeleton";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useReceivedInterConsultationCacheSelector } from "../../../modules/customer/interconsult/receivedInterConsultationCacheSelector";

interface Props {
  handleOnInterConsultSheetClicked: (
    interConsultResp: Schemas.InterConsultationResp,
  ) => void;
  onMakeReportClicked: (interConsult: Schemas.InterConsultationResp) => void;
}

export default function HistoricalReceivedInterConsultationContainer({
  handleOnInterConsultSheetClicked,
  onMakeReportClicked,
}: Props) {
  const {
    loading,
    deleting,
    receivedInterConsultation,
    getCurrentInterConsultResp,
    deleteInterConsultation,
  } = useReceivedInterConsultationCacheSelector();

  const handleOnSheetClicked = useCallback(
    (code: string) => {
      const interConsultationResp = getCurrentInterConsultResp(code);
      queryCache.setQueryData([ReactQueryKeys["received-interConsult-key"]], {
        receivedFrom: false,
      });
      handleOnInterConsultSheetClicked(interConsultationResp || {});
    },
    [getCurrentInterConsultResp, handleOnInterConsultSheetClicked],
  );

  const handleOnMakeReportClicked = useCallback(
    (code: string) => {
      queryCache.setQueryData([ReactQueryKeys["received-interConsult-key"]], {
        receivedFrom: false,
      });
      const interConsultationResp = getCurrentInterConsultResp(code);
      onMakeReportClicked(interConsultationResp || {});
    },
    [getCurrentInterConsultResp, onMakeReportClicked],
  );

  const handleOnDelete = useCallback(
    (code: string) => {
      deleteInterConsultation(code);
    },
    [deleteInterConsultation],
  );

  return loading ? (
    <RequestHistoryItemSkeleton />
  ) : (
    <ReceivedInterConsult
      interConsults={receivedInterConsultation}
      attachmentLoading={false}
      deleteLoading={deleting}
      onDeleteClicked={handleOnDelete}
      onInterConsultSheetClicked={handleOnSheetClicked}
      onReportClicked={handleOnMakeReportClicked}
    />
  );
}
