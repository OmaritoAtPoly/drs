import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { showFile } from "../../../utils/document";
import STRINGS from "../../../utils/strings";
import useHandlerError, {
  useAddLastAlerts,
} from "../../utils/error/handleError";
import {
  useAddCustomerOtherRequestMutation,
  useEditCustomerOtherRequestMutation,
  useExportOtherRequestPdfMutation,
  useSendRequestMutation,
} from "./mutation";
import { useOtherRequestCacheQuery } from "./query";

const useOtherRequestCacheSelector = () => {
  const { id: code, appointmentId } = useParams<{
    id: string;
    appointmentId: string;
  }>();

  const { handlerError } = useHandlerError();
  const { addLastAlerts } = useAddLastAlerts();

  const { data: cachedOtherRequestResponse } = useOtherRequestCacheQuery({
    showError: true,
  });

  const {
    mutate: mutateAdd,
    loading: creatingRequest,
  } = useAddCustomerOtherRequestMutation({
    showError: true,
  });

  const {
    mutate: mutateEdit,
    loading: editingRequest,
  } = useEditCustomerOtherRequestMutation({
    showError: true,
  });

  const onExportPdfSuccess = useCallback((file: Blob) => {
    showFile(file);
  }, []);

  const {
    mutate: exportPdfMutate,
    loading: exportingPdf,
  } = useExportOtherRequestPdfMutation({
    showError: true,
    onSuccess: onExportPdfSuccess,
  });

  const onSendSuccess = useCallback(() => {
    addLastAlerts({
      name: "",
      severity: "success",
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_EMAIL,
    });
  }, [addLastAlerts]);

  const {
    mutate: sendMutate,
    loading: sendingRequest,
  } = useSendRequestMutation({
    showError: true,
    onSuccess: onSendSuccess,
  });

  const onSendSuccessByCell = useCallback(() => {
    addLastAlerts({
      name: "",
      severity: "success",
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_CELL,
    });
  }, [addLastAlerts]);
  const {
    mutate: sendMutateByCell,
    loading: sendingRequestByCell,
  } = useSendRequestMutation({
    showError: true,
    onSuccess: onSendSuccessByCell,
  });

  const handleOnAddRequest = useCallback(
    (
      otherRequest: Schemas.OtherRequestRequest,
      callback: (data: Schemas.OtherRequestResponse) => void,
    ) => {
      if (
        otherRequest &&
        otherRequest.diagnoses &&
        otherRequest.items &&
        otherRequest.diagnoses?.length > 0 &&
        otherRequest.items?.length > 0
      ) {
        mutateAdd({
          code,
          diagnoses: otherRequest.diagnoses,
          items: otherRequest.items,
          appointment: appointmentId,
        }).then((res) => {
          callback(res);
        });
      } else {
        handlerError(STRINGS.error.REQUEST_VALIDATE_MESSAGE);
      }
    },
    [appointmentId, code, handlerError, mutateAdd],
  );

  const handleOnEditRequest = useCallback(
    (
      requestCode: string,
      otherRequest: Schemas.OtherRequestRequest,
      callback: (data: Schemas.OtherRequestResponse) => void,
    ) => {
      if (
        otherRequest &&
        otherRequest.diagnoses &&
        otherRequest.items &&
        otherRequest.diagnoses?.length > 0 &&
        otherRequest.items?.length > 0
      ) {
        mutateEdit({
          code,
          requestCode,
          ...otherRequest,
        }).then((res) => callback(res));
      } else {
        handlerError(STRINGS.error.REQUEST_VALIDATE_MESSAGE);
      }
    },
    [code, handlerError, mutateEdit],
  );

  const handleOnSendByEmail = useCallback(() => {
    if (cachedOtherRequestResponse) {
      sendMutate({
        code,
        requestCode: cachedOtherRequestResponse.code || "",
        sendByEmail: true,
        sendToCustomer: false,
        sendToProfessional: false,
      });
    } else {
      handlerError(STRINGS.error.REQUEST_CODE_REQUIRED);
    }
  }, [cachedOtherRequestResponse, code, handlerError, sendMutate]);

  const handleOnSendByClientCell = useCallback(() => {
    if (cachedOtherRequestResponse) {
      sendMutateByCell({
        code,
        requestCode: cachedOtherRequestResponse.code || "",
        sendByEmail: false,
        sendToCustomer: true,
        sendToProfessional: false,
      });
    } else {
      handlerError(STRINGS.error.REQUEST_CODE_REQUIRED);
    }
  }, [cachedOtherRequestResponse, code, handlerError, sendMutateByCell]);

  const handleOnExportPdf = useCallback(() => {
    if (cachedOtherRequestResponse) {
      exportPdfMutate({
        code,
        requestCode: cachedOtherRequestResponse.code || "",
      });
    } else {
      handlerError(STRINGS.error.REQUEST_CODE_REQUIRED);
    }
  }, [cachedOtherRequestResponse, code, exportPdfMutate, handlerError]);

  return {
    creatingRequest,
    editingRequest,
    sendingRequest,
    sendingRequestByCell,
    exportingPdf,
    handleOnAddRequest,
    handleOnEditRequest,
    handleOnSendByEmail,
    handleOnSendByClientCell,
    handleOnExportPdf,
  };
};
export default useOtherRequestCacheSelector;
