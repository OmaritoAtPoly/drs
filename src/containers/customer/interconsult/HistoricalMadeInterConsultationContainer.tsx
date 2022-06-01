import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import MadeInterConsult from "../../../components/domains/customer/interconsult/history/MadeInterConsult";
import RequestHistoryItemSkeleton from "../../../components/skeletons/RequestHistoryItemSkeleton";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import {
  useCurrentInterconsultationToEditCacheSelector,
  useMadeInterConsultationCacheSelector,
} from "../../../modules/customer/interconsult/madeInterConsultationCacheSelector";
import {
  useDeleteInterConsultMutation,
  useInterConsultPdfMutation,
  useSendInterConsultMutation,
} from "../../../modules/customer/interconsult/mutation";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { showFile } from "../../../utils/document";
import STRINGS from "../../../utils/strings";

interface Props {
  handleOnInterConsultSheetClicked: (
    interConsultResp: Schemas.InterConsultationResp,
  ) => void;
  handleOnMadeByMeReportClicked: (
    interConsultResp: Schemas.InterConsultationResp,
  ) => void;
  onAdd: () => void;
}

export default function HistoricalMadeInterConsultationContainer({
  handleOnInterConsultSheetClicked,
  handleOnMadeByMeReportClicked,
  onAdd,
}: Props) {
  const {
    loading,
    madeInterConsultation,
    getCurrentInterConsultResp,
  } = useMadeInterConsultationCacheSelector();
  const { addLastAlerts } = useAddLastAlerts();
  const [action, setAction] = useState<{ action: "EMAIL" | "CELL" }>();
  const { id } = useParams<{ id?: string }>();
  const {
    saveCurrentInterconsultationToEdit,
  } = useCurrentInterconsultationToEditCacheSelector();
  const deleteInterConsultSuccess = useCallback(() => {
    queryCache.invalidateQueries(
      [ReactQueryKeys["my-inter-consultation"], { code: id }],
      {
        exact: true,
      },
    );
  }, [id]);

  const { loading: deleting, mutate } = useDeleteInterConsultMutation({
    showError: true,
    onSuccess: deleteInterConsultSuccess,
  });

  const onSendSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_DOCUMENT_SUCCESS,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const {
    mutate: sendInterConsultation,
    loading: sending,
  } = useSendInterConsultMutation({
    showError: true,
    onSuccess: onSendSuccess,
  });

  const handleOnSheetClicked = useCallback(
    (code: string) => {
      const interConsultationResp = getCurrentInterConsultResp(code);
      handleOnInterConsultSheetClicked(interConsultationResp || {});
      queryCache.setQueryData([ReactQueryKeys["received-interConsult-key"]], {
        receivedFrom: true,
      });
    },
    [getCurrentInterConsultResp, handleOnInterConsultSheetClicked],
  );

  const handleOnReportClicked = useCallback(
    (code: string) => {
      const interConsultationResp = getCurrentInterConsultResp(code);
      handleOnMadeByMeReportClicked(interConsultationResp || {});
    },
    [getCurrentInterConsultResp, handleOnMadeByMeReportClicked],
  );

  const onSuccessPdf = useCallback((blob: Blob) => {
    showFile(blob);
  }, []);

  const {
    loading: loadingPrintClicked,
    mutate: mutateInterConsultPdf,
  } = useInterConsultPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const handleOnDelete = useCallback(
    (code: string) => {
      mutate({
        code: id || "",
        requestCode: code,
      });
    },
    [id, mutate],
  );

  const handleEditCallBack = useCallback(
    (interConsult: Schemas.InterConsultationResp) => {
      saveCurrentInterconsultationToEdit(interConsult);
      onAdd();
    },
    [onAdd, saveCurrentInterconsultationToEdit],
  );
  const handleCellClicked = useCallback(
    (requestCode: string) => {
      setAction({ action: "CELL" });
      sendInterConsultation({
        code: id || "",
        requestCode,
        sendByEmail: false,
        sendToCustomer: true,
        sendToProfessional: true,
      });
    },
    [id, sendInterConsultation],
  );

  const handleMailClicked = useCallback(
    (requestCode: string) => {
      setAction({ action: "EMAIL" });
      sendInterConsultation({
        code: id || "",
        requestCode,
        sendByEmail: true,
        sendToCustomer: false,
        sendToProfessional: false,
      });
    },
    [id, sendInterConsultation],
  );

  const handlePrintClicked = useCallback(
    (requestCode: string) => {
      mutateInterConsultPdf({
        code: id || "",
        requestCode,
      });
    },
    [id, mutateInterConsultPdf],
  );

  return loading ? (
    <RequestHistoryItemSkeleton />
  ) : (
    <MadeInterConsult
      interConsults={madeInterConsultation}
      deleteLoading={deleting}
      loadingCellClicked={sending && action?.action === "CELL"}
      loadingMailClicked={sending && action?.action === "EMAIL"}
      loadingPrintClicked={loadingPrintClicked}
      onDeleteClicked={handleOnDelete}
      onInterConsultSheetClicked={handleOnSheetClicked}
      onReportClicked={handleOnReportClicked}
      handleEdit={handleEditCallBack}
      handleCellClicked={handleCellClicked}
      handleMailClicked={handleMailClicked}
      handlePrintClicked={handlePrintClicked}
    />
  );
}
