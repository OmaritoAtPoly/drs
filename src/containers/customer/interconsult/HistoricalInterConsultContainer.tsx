/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import HistoricalInterConsult from "../../../components/domains/customer/interconsult/history/HistoricalInterConsult";
import InterConsultReportShowMode from "../../../components/domains/customer/interconsult/report/InterConsultReportShowMode";
import { useReceivedInterConsultQuery } from "../../../modules/customer/interconsult/query";
import useSendInterConsultReportMutation from "../../../modules/customer/interconsult/received/mutation";
import useInterConsultReportPdfMutation from "../../../modules/customer/interconsult/received/query";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { showFile } from "../../../utils/document";
import STRINGS from "../../../utils/strings";
import InterConsultAbstractContainer from "./InterConsultAbstractContainer";
import InterConsultReportContainer from "./InterConsultReportContainer";

interface Props {
  open: boolean;
  handleShow: () => void;
  onAddNewInterConsult: () => void;
}

export default function HistoricalInterConsultContainer({
  open,
  handleShow,
  onAddNewInterConsult,
}: Props) {
  const [makeReport, openMakeReportDialogToMakeReport] = useState<boolean>(
    false,
  );
  const [abstract, openAbstract] = useState<boolean>(false);
  const [report, openReport] = useState<boolean>(false);
  const { id: code } = useParams<{ id: string }>();
  const { addLastAlerts } = useAddLastAlerts();
  const { data: receivedFrom } = useReceivedInterConsultQuery();

  const [
    currentInterConsultResp,
    setCurrentInterConsultResp,
  ] = useState<Schemas.InterConsultationResp>();

  const handleOnOpenReportDialogToMakeReport = useCallback(() => {
    openMakeReportDialogToMakeReport(!makeReport);
  }, [makeReport]);

  const handleOnOpenReportDialog = useCallback(() => {
    openReport(!report);
  }, [report]);

  const handleOnOpenAbstractDialog = useCallback(() => {
    openAbstract(!abstract);
  }, [abstract]);

  const handleOnInterConsultSheetClicked = useCallback(
    (interConsultResp: Schemas.InterConsultationResp) => {
      setCurrentInterConsultResp(interConsultResp);
      handleOnOpenAbstractDialog();
    },
    [handleOnOpenAbstractDialog],
  );

  const openReportDialogToMakeReport = useCallback(
    (interConsultResp: Schemas.InterConsultationResp | undefined) => {
      setCurrentInterConsultResp(interConsultResp);
      handleOnOpenReportDialogToMakeReport();
    },
    [handleOnOpenReportDialogToMakeReport],
  );

  const openReportDialog = useCallback(
    (interConsultResp: Schemas.InterConsultationResp | undefined) => {
      setCurrentInterConsultResp(interConsultResp);
      handleOnOpenReportDialog();
    },
    [handleOnOpenReportDialog],
  );

  const handleOnReceivedByMeReportClicked = useCallback(
    (interConsultResp: Schemas.InterConsultationResp) => {
      interConsultResp?.report
        ? openReportDialog(interConsultResp)
        : openReportDialogToMakeReport(interConsultResp);
    },
    [openReportDialog, openReportDialogToMakeReport],
  );

  const handleOnMadeByMeReportClicked = useCallback(
    (interConsultResp: Schemas.InterConsultationResp) => {
      if (interConsultResp?.report) {
        openReportDialog(interConsultResp);
      }
    },
    [openReportDialog],
  );

  const handleHistoryOnClick = useCallback(() => {
    openAbstract(false);
  }, []);

  const handleOnSendByMailSuccess = useCallback(
    (data) => {
      addLastAlerts({
        message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_CELL,
        severity: "success",
        name: "",
      });
    },
    [addLastAlerts],
  );

  const onSuccessPdf = useCallback((blob: Blob) => {
    showFile(blob);
  }, []);

  const {
    mutate: sendInterConsultationReportByEmail,
    loading: loadingMailClicked,
  } = useSendInterConsultReportMutation({
    showError: true,
    onSuccess: handleOnSendByMailSuccess,
  });

  const {
    mutate: sendInterConsultationReportByCell,
    loading: loadingCellClicked,
  } = useSendInterConsultReportMutation({
    showError: true,
    onSuccess: handleOnSendByMailSuccess,
  });

  const {
    loading: loadingPrintClicked,
    mutate: mutateInterConsultPdf,
  } = useInterConsultReportPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const handleMailClicked = useCallback(() => {
    sendInterConsultationReportByEmail({
      code,
      requestCode: currentInterConsultResp?.code || "",
      sendByEmail: true,
      sendToCustomer: false,
      sendToProfessional: true,
    });
  }, [sendInterConsultationReportByEmail, code, currentInterConsultResp?.code]);

  const handleCellClicked = useCallback(() => {
    sendInterConsultationReportByCell({
      code,
      requestCode: currentInterConsultResp?.code || "",
      sendByEmail: false,
      sendToCustomer: true,
      sendToProfessional: true,
    });
  }, [sendInterConsultationReportByCell, code, currentInterConsultResp?.code]);

  const handlePrintClicked = useCallback(() => {
    mutateInterConsultPdf({
      code,
      requestCode: currentInterConsultResp?.code || "",
    });
  }, [code, currentInterConsultResp?.code, mutateInterConsultPdf]);

  const handleCloseEditMode = useCallback(() => {
    openAbstract(!abstract);
    handleShow();
  }, [abstract, handleShow]);
  return (
    <>
      <HistoricalInterConsult
        open={open}
        onAdd={onAddNewInterConsult}
        handleShow={handleShow}
        onInterConsultSheetClicked={handleOnInterConsultSheetClicked}
        onMakeReportClicked={handleOnReceivedByMeReportClicked}
        handleOnMadeByMeReportClicked={handleOnMadeByMeReportClicked}
      />
      {abstract && (
        <InterConsultAbstractContainer
          handleShow={handleOnOpenAbstractDialog}
          onCancel={handleOnOpenAbstractDialog}
          open={abstract}
          interConsult={currentInterConsultResp || {}}
          handleDialogName={handleHistoryOnClick}
          fromReceived={receivedFrom?.receivedFrom}
          handleCloseEditMode={handleCloseEditMode}
        />
      )}
      {makeReport && (
        <InterConsultReportContainer
          open={makeReport}
          clinicalProfile="Clinical Profile"
          handleShow={handleOnOpenReportDialogToMakeReport}
          currentInterConsult={currentInterConsultResp || {}}
        />
      )}
      {report && (
        <InterConsultReportShowMode
          open={report}
          handleShow={handleOnOpenReportDialog}
          interConsult={currentInterConsultResp || {}}
          loadingMailClicked={loadingMailClicked}
          loadingPrintClicked={loadingPrintClicked}
          loadingCellClicked={loadingCellClicked}
          handleMailClicked={handleMailClicked}
          handlePrintClicked={handlePrintClicked}
          handleCellClicked={handleCellClicked}
          fromNotReceived={receivedFrom?.receivedFrom}
        />
      )}
    </>
  );
}
