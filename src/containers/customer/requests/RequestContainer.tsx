/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Request from "../../../components/domains/customer/request/Request";
import { useCustomerActionCacheSelector } from "../../../modules/customer/customerActionCacheSelector";
import { usePatientCacheSelector } from "../../../modules/customer/profile/cacheSelector";
import {
  useImagesRequestMailSender,
  useLastImageRequestCacheSelector,
} from "../../../modules/customer/request/history/imageHistoryCacheSelector";
import {
  useLabsRequestMailSender,
  useLastLaboratoriesRequestCacheSelector,
} from "../../../modules/customer/request/history/labHistoryCacheSelector";
import {
  useCustomerImagePdfMutation,
  useCustomerLaboratoriesPdfMutation,
  useSendImagesRequestMutation,
  useSendLabsRequestPdfMutation,
} from "../../../modules/customer/request/history/mutation";
import { useDefaultHistoryOrderQuery } from "../../../modules/customer/request/history/query";
import useOtherRequestCacheSelector from "../../../modules/customer/request/otherRequestCacheSelector";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { showFile } from "../../../utils/document";
import { REQUEST_DATA_TYPE } from "../../../utils/enums";
import STRINGS from "../../../utils/strings";

interface Props {
  open: boolean;
  handleShow: () => void;
}

export default function RequestContainer({ open, handleShow }: Props) {
  const { id: code } = useParams<{ id: string }>();
  const { currentPatient } = usePatientCacheSelector({});
  const { setActionPanelName } = useCustomerActionCacheSelector();
  const [sendWay, setSendWay] = useState<string>("");
  const { data: defaultHistoryOrder } = useDefaultHistoryOrderQuery();

  const [viewMode, setViewMode] = useState<boolean>(false);
  const { data: lastImageRequest } = useLastImageRequestCacheSelector();
  const {
    sendingRequest,
    sendingRequestByCell,
    exportingPdf,
    handleOnSendByClientCell,
    handleOnSendByEmail,
    handleOnExportPdf,
  } = useOtherRequestCacheSelector();

  const selectedOption = useMemo(() => defaultHistoryOrder?.value, [
    defaultHistoryOrder?.value,
  ]);

  const { addLastAlerts } = useAddLastAlerts();

  const onSuccessPdf = useCallback((blob: Blob) => {
    showFile(blob);
  }, []);

  const {
    loading: loadingImagePdf,
    mutate: mutateImagePdf,
  } = useCustomerImagePdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const handleOnSendSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_CELL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const {
    mutate: sendImageByCell,
    loading: sendingImageByCell,
  } = useSendImagesRequestMutation({
    showError: true,
    onSuccess: handleOnSendSuccess,
  });

  const {
    mutate: sendLabByCell,
    loading: sendingLabByCell,
  } = useSendLabsRequestPdfMutation({
    showError: true,
    onSuccess: handleOnSendSuccess,
  });

  const {
    loading: loadingLaboratoriesPdf,
    mutate: mutateLaboratoriesPdf,
  } = useCustomerLaboratoriesPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });
  const {
    data: lastLaboratoriesRequest,
  } = useLastLaboratoriesRequestCacheSelector();

  const handleViewMode = useCallback(() => {
    setViewMode(!viewMode);
  }, [viewMode]);

  const handleHistoryClicked = useCallback(() => {
    setActionPanelName(STRINGS.buttonGrid.HISTORY_REQUESTS);
  }, [setActionPanelName]);

  const handleClose = useCallback(() => {
    handleShow();
  }, [handleShow]);

  // eslint-disable-next-line consistent-return
  const handleOnPrintClicked = useCallback(() => {
    switch (selectedOption) {
      case REQUEST_DATA_TYPE.REQUESTS.IMAGE:
        mutateImagePdf({
          code: currentPatient?.legalID || "",
          requestCode: lastImageRequest?.code || "",
        });
        break;
      case REQUEST_DATA_TYPE.REQUESTS.LAB:
        mutateLaboratoriesPdf({
          code: currentPatient?.legalID || "",
          requestCode: lastLaboratoriesRequest?.code || "",
        });
        break;
      default:
        handleOnExportPdf();
        break;
    }
  }, [
    selectedOption,
    mutateImagePdf,
    currentPatient?.legalID,
    lastImageRequest?.code,
    mutateLaboratoriesPdf,
    lastLaboratoriesRequest?.code,
    handleOnExportPdf,
  ]);

  const { handleSentByMail, sendingEmail } = useImagesRequestMailSender();
  const {
    handleSentLabPdfByMail,
    sendingLabEmail,
  } = useLabsRequestMailSender();

  const handleOnPatientCellClicked = useCallback(() => {
    switch (selectedOption) {
      case REQUEST_DATA_TYPE.REQUESTS.IMAGE:
        sendImageByCell({
          code,
          requestCode: (lastImageRequest?.code && lastImageRequest.code) || "",
          sendToCustomer: true,
          sendByEmail: false,
          sendToProfessional: false,
        });
        break;
      case REQUEST_DATA_TYPE.REQUESTS.LAB:
        sendLabByCell({
          code,
          requestCode:
            (lastLaboratoriesRequest?.code && lastLaboratoriesRequest.code) ||
            "",
          sendToCustomer: true,
          sendByEmail: false,
          sendToProfessional: false,
        });
        break;
      case REQUEST_DATA_TYPE.REQUESTS.OTHER:
        setSendWay("CELL");
        handleOnSendByClientCell();
        break;
      default:
        break;
    }
  }, [
    code,
    handleOnSendByClientCell,
    lastImageRequest,
    lastLaboratoriesRequest,
    selectedOption,
    sendImageByCell,
    sendLabByCell,
  ]);

  const handleOnMailClicked = useCallback(() => {
    switch (selectedOption) {
      case REQUEST_DATA_TYPE.REQUESTS.IMAGE:
        lastImageRequest?.code &&
          handleSentByMail(lastImageRequest?.code || "");
        break;
      case REQUEST_DATA_TYPE.REQUESTS.LAB:
        lastLaboratoriesRequest?.code &&
          handleSentLabPdfByMail(lastLaboratoriesRequest?.code || "");
        break;
      case REQUEST_DATA_TYPE.REQUESTS.OTHER:
        setSendWay("EMAIL");
        handleOnSendByEmail();
        break;
      default:
        break;
    }
  }, [
    selectedOption,
    lastImageRequest?.code,
    handleSentByMail,
    lastLaboratoriesRequest?.code,
    handleSentLabPdfByMail,
    handleOnSendByEmail,
  ]);

  return (
    <Request
      handleShow={handleShow}
      open={open}
      options={REQUEST_DATA_TYPE.REQUESTS.SELECTABLE_OPTIONS}
      onHistoryClicked={handleHistoryClicked}
      handleViewMode={handleViewMode}
      onPatientCellClicked={handleOnPatientCellClicked}
      onPrintClicked={handleOnPrintClicked}
      onViewModeHistoryClicked={handleHistoryClicked}
      onMailClicked={handleOnMailClicked}
      viewMode={viewMode}
      loadingPdf={loadingImagePdf || loadingLaboratoriesPdf || exportingPdf}
      sendingEmail={
        sendingEmail ||
        sendingLabEmail ||
        (sendingRequest && sendWay === "EMAIL")
      }
      sendingCell={
        sendingLabByCell ||
        sendingImageByCell ||
        (sendingRequestByCell && sendWay === "CELL")
      }
      handleClose={handleClose}
    />
  );
}
