import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import ReportHistoryDialog from "../../../components/domains/customer/report/reportHistory/ReportHistoryDialog";
import ReportResumeDialog from "../../../components/domains/customer/report/ReportResumeDialog";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { usePatientCacheSelector } from "../../../modules/customer/profile/cacheSelector";
import {
  useCurrentReportToEditCacheSelector,
  useReportCacheSelector,
} from "../../../modules/customer/report/cacheSelector";
import {
  useCustomerReportPdfMutation,
  useDeleteReportMutation,
  useSendReportByEmailMutation,
} from "../../../modules/customer/report/mutation";
import { useCurrentReportToEditQuery } from "../../../modules/customer/report/query";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { defaultCertificate } from "../../../utils/defaultData";
import { showFile } from "../../../utils/document";
import STRINGS from "../../../utils/strings";

interface Props {
  open: boolean;
  handleShow: () => void;
  handleDialogName: (labelName: string) => void;
}

export default function ReportHistoryContainer({
  handleShow,
  open,
  handleDialogName,
}: Props) {
  const { currentPatient } = usePatientCacheSelector({});
  const { id: patientId } = useParams<{ id: string }>();
  const { saveCurrentReportToEdit } = useCurrentReportToEditCacheSelector();
  const onSuccessPdf = useCallback((blob: Blob) => {
    showFile(blob);
  }, []);
  const { addLastAlerts } = useAddLastAlerts();
  const {
    mutate: mutatePrintPdf,
    loading: loadingPrintPdf,
  } = useCustomerReportPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });
  const { data: initialData } = useCurrentReportToEditQuery();
  const [showResume, setShowResume] = useState<boolean>(false);

  const onPrintPdf = useCallback(
    (requestCode?: string) => {
      if (initialData?.code) {
        mutatePrintPdf({
          code: patientId,
          requestCode: initialData?.code,
        });
        return;
      }
      if (requestCode && patientId) {
        mutatePrintPdf({
          code: patientId,
          requestCode,
        });
      }
    },
    [mutatePrintPdf, patientId, initialData?.code],
  );

  const { reportsData, loadingData } = useReportCacheSelector();

  const onSuccessDelete = useCallback(() => {
    queryCache.invalidateQueries([ReactQueryKeys["patient-reports-list"]], {
      exact: false,
      refetchActive: true,
      refetchInactive: true,
    });
  }, []);

  const { mutate, loading: deleteLoading } = useDeleteReportMutation({
    showError: true,
    onSuccess: onSuccessDelete,
  });

  const handleDeleteReport = useCallback(
    (requestCode?: string) => {
      if (!patientId || !requestCode) return;
      mutate({
        code: patientId,
        requestCode,
      });
    },
    [patientId, mutate],
  );

  const handleNewReport = useCallback(() => {
    saveCurrentReportToEdit(undefined);
    handleDialogName(STRINGS.reports.NEW_REPORT);
  }, [handleDialogName, saveCurrentReportToEdit]);

  const handleEditReport = useCallback(
    (value: Schemas.ReportResponse) => {
      handleDialogName(STRINGS.reports.NEW_REPORT);
      saveCurrentReportToEdit(value);
    },
    [handleDialogName, saveCurrentReportToEdit],
  );

  const handleOnSendByCellSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_CELL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const {
    mutate: mutateCellAction,
    loading: loadingSendingCell,
  } = useSendReportByEmailMutation({
    showError: true,
    onSuccess: handleOnSendByCellSuccess,
  });
  const handlePatientByCell = useCallback(
    (requestCode?: string) => {
      if (initialData?.code) {
        mutateCellAction({
          code: patientId,
          requestCode: initialData.code,
          sendByEmail: false,
          sendToCustomer: true,
          sendToProfessional: false,
        });
        return;
      }
      if (patientId && requestCode) {
        mutateCellAction({
          code: patientId,
          requestCode,
          sendByEmail: false,
          sendToCustomer: true,
          sendToProfessional: false,
        });
      }
    },
    [mutateCellAction, patientId, initialData?.code],
  );
  const handleOnSendByEmailSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_EMAIL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);
  const {
    mutate: mutateSendEmail,
    loading: loadingSendingByEmail,
  } = useSendReportByEmailMutation({
    showError: true,
    onSuccess: handleOnSendByEmailSuccess,
  });

  const handleMailClicked = useCallback(
    (requestCode?: string) => {
      if (initialData?.code) {
        mutateSendEmail({
          code: patientId,
          requestCode: initialData.code,
          sendByEmail: true,
          sendToCustomer: false,
          sendToProfessional: false,
        });
        return;
      }
      if (patientId && requestCode) {
        mutateSendEmail({
          code: patientId,
          requestCode,
          sendByEmail: true,
          sendToCustomer: false,
          sendToProfessional: false,
        });
      }
    },
    [mutateSendEmail, patientId, initialData?.code],
  );

  const handleSetShowResume = useCallback(() => setShowResume(!showResume), [showResume]);

  const handleRequestClicked = useCallback(
    (value: Schemas.ReportResponse) => {
      handleSetShowResume();
      saveCurrentReportToEdit(value);
    }, [handleSetShowResume, saveCurrentReportToEdit]);

  const handleReportResumeDialog = useCallback(() => (
    <ReportResumeDialog
      handleCellAction={handlePatientByCell}
      handleClose={handleSetShowResume}
      handleHistoryClicked={handleSetShowResume}
      handlePrintPdf={onPrintPdf}
      handleSendEmail={handleMailClicked}
      handleShow={handleSetShowResume}
      initialData={initialData || defaultCertificate}
      open={showResume}
      loadingCellAction={loadingSendingCell}
      loadingPrintPdf={loadingPrintPdf}
      loadingSendEmail={loadingSendingByEmail}
      showEditLabel={false}
    />), [
    handleMailClicked,
    handlePatientByCell,
    handleSetShowResume,
    initialData,
    loadingPrintPdf,
    loadingSendingByEmail,
    loadingSendingCell,
    onPrintPdf,
    showResume,
  ]);

  return (
    <>
      <ReportHistoryDialog
        handleShow={handleShow}
        open={open}
        reportData={reportsData}
        currentPatient={currentPatient}
        loadingData={loadingData}
        handleDeleteReport={handleDeleteReport}
        deleteLoading={deleteLoading}
        handlePrintPdf={onPrintPdf}
        loadingPrintPdf={loadingPrintPdf}
        handleNewReport={handleNewReport}
        handleEditReport={handleEditReport}
        handlePatientByCell={handlePatientByCell}
        loadingSendingCell={loadingSendingCell}
        handlePatientByEmail={handleMailClicked}
        loadingSendingByEmail={loadingSendingByEmail}
        handleRequestClicked={handleRequestClicked}
      />
      {showResume && handleReportResumeDialog()}
    </>
  );
}
