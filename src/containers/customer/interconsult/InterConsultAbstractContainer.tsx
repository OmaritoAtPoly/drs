/* eslint-disable react/destructuring-assignment */
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import InterConsultAbstract from "../../../components/domains/customer/interconsult/resume/InterConsultAbstract";
import {
  useInterConsultPdfMutation,
  useSendInterConsultMutation,
} from "../../../modules/customer/interconsult/mutation";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { showFile } from "../../../utils/document";
import STRINGS from "../../../utils/strings";

interface Props {
  open: boolean;
  interConsult: Schemas.InterConsultationResp;
  editAction?: boolean;
  handleShow: () => void;
  onCancel: () => void;
  handleDialogName: () => void;
  fromReceived?: boolean;
  handleCloseEditMode: () => void;
}

export default function InterConsultAbstractContainer({
  editAction = false,
  handleDialogName,
  handleShow,
  fromReceived,
  handleCloseEditMode,
  ...props
}: Props) {
  const { id: code } = useParams<{ id: string }>();
  const { addLastAlerts } = useAddLastAlerts();
  const { currentProfessional } = useProfileCacheSelector();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOnSendByCellSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_CELL_PATIENT_DOCTOR,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const handleOnSendByMailSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_EMAIL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const {
    mutate: sendInterConsultation,
    loading: loadingCellClicked,
  } = useSendInterConsultMutation({
    showError: true,
    onSuccess: handleOnSendByCellSuccess,
  });

  const {
    mutate: sendInterConsultationByEmail,
    loading: loadingMailClicked,
  } = useSendInterConsultMutation({
    showError: true,
    onSuccess: handleOnSendByMailSuccess,
  });

  const handleOnSend = useCallback(
    (
      sendByEmail: boolean,
      sendToCustomer: boolean,
      sendToProfessional: boolean,
    ) => {
      sendInterConsultation({
        code,
        requestCode: props.interConsult.code || "",
        sendByEmail,
        sendToCustomer,
        sendToProfessional,
      });
    },
    // eslint-disable-next-line react/destructuring-assignment
    [code, props.interConsult, sendInterConsultation],
  );

  const handleOnSendByEmail = useCallback(
    (
      sendByEmail: boolean,
      sendToCustomer: boolean,
      sendToProfessional: boolean,
    ) => {
      sendInterConsultationByEmail({
        code,
        requestCode: props.interConsult.code || "",
        sendByEmail,
        sendToCustomer,
        sendToProfessional,
      });
    },
    // eslint-disable-next-line react/destructuring-assignment
    [code, props.interConsult.code, sendInterConsultationByEmail],
  );

  const handleOnCellClicked = useCallback(() => {
    handleOnSend(false, true, true);
  }, [handleOnSend]);

  const handleOnMailClicked = useCallback(() => {
    handleOnSendByEmail(true, true, false);
  }, [handleOnSendByEmail]);

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

  const handleOnPrintClicked = useCallback(() => {
    mutateInterConsultPdf({
      code,
      requestCode: props.interConsult.code || "",
    });
  }, [code, mutateInterConsultPdf, props.interConsult.code]);

  return (
    <InterConsultAbstract
      {...props}
      editAction={editAction}
      handleCellClicked={
        currentProfessional?.legalID !==
        props.interConsult.fromProfessional?.legalID
          ? handleOnCellClicked
          : undefined
      }
      handleHistoryClicked={handleDialogName}
      handleMailClicked={
        currentProfessional?.legalID !==
        props.interConsult.fromProfessional?.legalID
          ? handleOnMailClicked
          : undefined
      }
      handlePrintClicked={
        currentProfessional?.legalID !==
        props.interConsult.fromProfessional?.legalID
          ? handleOnPrintClicked
          : undefined
      }
      loadingCellClicked={loadingCellClicked}
      loadingMailClicked={loadingMailClicked}
      loadingPrintClicked={loadingPrintClicked}
      handleShow={handleShow}
      handleEdit={handleShow}
      fromNotReceived={fromReceived}
      handleCloseEditMode={handleCloseEditMode}
    />
  );
}
