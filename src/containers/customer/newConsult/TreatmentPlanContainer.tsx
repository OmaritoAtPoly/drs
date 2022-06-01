import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import TreatmentPlan from "../../../components/domains/customer/newConsult/treatmentPlan/TreatmentPlan";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useProfessionalLastAppointmentRecordCacheSelector } from "../../../modules/customer/appointment/cacheSelector";
import { useNewRecipeMutation } from "../../../modules/customer/newRecipe/mutation";
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
  usePrescriptionsPdfMutation,
  useSendImagesRequestMutation,
  useSendLabsRequestPdfMutation,
  useSendPrescriptionsMutation,
} from "../../../modules/customer/request/history/mutation";
import { useSaveCurrentPrescriptionCacheSelector } from "../../../modules/customer/request/history/prescriptionsHistoryCacheSelector";
import { useCustomerCurrentPrescriptionQuery } from "../../../modules/customer/request/history/query";
import {
  useAddCustomerImageRequestMutation,
  useAddCustomerLabRequestMutation,
} from "../../../modules/customer/request/mutation";
import useHandlerError, {
  useAddLastAlerts,
} from "../../../modules/utils/error/handleError";
import { defaultRecord } from "../../../utils/defaultData";
import { showFile } from "../../../utils/document";
import { REQUEST_DATA_TYPE } from "../../../utils/enums";
import STRINGS from "../../../utils/strings";

interface Props {
  appointmentId?: string;
  readOnly?: boolean;
}

export default function TreatmentPlanContainer({
  appointmentId,
  readOnly,
}: Props) {
  const { addLastAlerts } = useAddLastAlerts();
  const { handlerError } = useHandlerError();
  const { appointmentId: appointmentIdParam, id: code } = useParams<{
    appointmentId: string;
    id: string;
  }>();

  const { data } = useProfessionalLastAppointmentRecordCacheSelector({
    appointmentId,
  });
  const [optionToSend, setOptionToSend] = useState<string | undefined>();
  const [openedHistory, setOpenHistory] = useState<boolean>(false);
  const [
    openedHistoryPrescription,
    setOpenHistoryPrescription,
  ] = useState<boolean>(false);
  const { data: lastImageRequest } = useLastImageRequestCacheSelector();
  const {
    data: lastLaboratoriesRequest,
  } = useLastLaboratoriesRequestCacheSelector();
  const { data: lastPrescriptionRequest } = useCustomerCurrentPrescriptionQuery(
    {
      showError: true,
    },
  );
  const { currentPatient } = usePatientCacheSelector({});
  const { handleSentByMail, sendingEmail } = useImagesRequestMailSender();
  const {
    handleSentLabPdfByMail,
    sendingLabEmail,
  } = useLabsRequestMailSender();
  const handleSendSuccess = useCallback(() => {
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
    onSuccess: handleSendSuccess,
  });

  const {
    mutate: sendLabByCell,
    loading: sendingLabByCell,
  } = useSendLabsRequestPdfMutation({
    showError: true,
    onSuccess: handleSendSuccess,
  });

  const handleSendByEmailSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_EMAIL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const {
    mutate: mutateSendPrescriptionByEmail,
    loading: loadingSendingEmail,
  } = useSendPrescriptionsMutation({
    showError: true,
    onSuccess: handleSendByEmailSuccess,
  });

  const handlePatientCellClicked = useCallback(
    (option: string) => {
      setOptionToSend("cell");
      switch (option) {
        case REQUEST_DATA_TYPE.REQUESTS.IMAGE:
          sendImageByCell({
            code,
            requestCode:
              (lastImageRequest?.code && lastImageRequest.code) || "",
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
        case "prescription":
          mutateSendPrescriptionByEmail({
            code: currentPatient?.legalID || "",
            requestCode: lastPrescriptionRequest?.code || "",
            sendToCustomer: true,
          });
          break;
        default:
          break;
      }
    },
    [
      code,
      currentPatient?.legalID,
      lastImageRequest?.code,
      lastLaboratoriesRequest?.code,
      lastPrescriptionRequest?.code,
      mutateSendPrescriptionByEmail,
      sendImageByCell,
      sendLabByCell,
    ],
  );

  const onCloseHistory = useCallback(() => {
    setOpenHistory(false);
  }, []);

  const handlePrescriptionHistory = useCallback(() => {
    setOpenHistoryPrescription(!openedHistoryPrescription);
  }, [openedHistoryPrescription]);

  const onHistoryClicked = useCallback(
    (option: string) => {
      queryCache.setQueryData([ReactQueryKeys["default-history-order"]], {
        value: option,
      });
      setOpenHistory(!openedHistory);
    },
    [openedHistory],
  );

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

  const {
    loading: loadingLaboratoriesPdf,
    mutate: mutateLaboratoriesPdf,
  } = useCustomerLaboratoriesPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const {
    loading: loadingPrescriptionPdf,
    mutate: mutatePrescriptionPdf,
  } = usePrescriptionsPdfMutation({
    showError: true,
    onSuccess: onSuccessPdf,
  });

  const handlePrintClicked = useCallback(
    (option: string) => {
      switch (option) {
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
        case "prescription":
          mutatePrescriptionPdf({
            code: currentPatient?.legalID || "",
            requestCode: lastPrescriptionRequest?.code || "",
          });
          break;
        default:
      }
    },
    [
      mutateImagePdf,
      currentPatient?.legalID,
      lastImageRequest?.code,
      mutateLaboratoriesPdf,
      lastLaboratoriesRequest?.code,
      mutatePrescriptionPdf,
      lastPrescriptionRequest?.code,
    ],
  );

  const handleMailClicked = useCallback(
    (option: string) => {
      setOptionToSend("email");
      switch (option) {
        case REQUEST_DATA_TYPE.REQUESTS.IMAGE:
          lastImageRequest?.code &&
            handleSentByMail(lastImageRequest?.code || "");
          break;
        case REQUEST_DATA_TYPE.REQUESTS.LAB:
          lastLaboratoriesRequest?.code &&
            handleSentLabPdfByMail(lastLaboratoriesRequest?.code || "");
          break;
        case "prescription":
          mutateSendPrescriptionByEmail({
            code: currentPatient?.legalID || "",
            requestCode: lastPrescriptionRequest?.code || "",
            sendByEmail: true,
          });
          break;
        default:
          break;
      }
    },
    [
      lastImageRequest?.code,
      handleSentByMail,
      lastLaboratoriesRequest?.code,
      handleSentLabPdfByMail,
      mutateSendPrescriptionByEmail,
      currentPatient?.legalID,
      lastPrescriptionRequest?.code,
    ],
  );

  const onSuccessAddLabRequest = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (data: Schemas.LaboratoryRequestResponse) => {
      queryCache.setQueryData(
        ReactQueryKeys["customer-last-lab-request-key"],
        data,
      );
      queryCache.invalidateQueries(ReactQueryKeys["customer-lab-request-key"]);
    },
    [],
  );

  const {
    mutate: mutateAdd,
    loading: loadingAddLab,
  } = useAddCustomerLabRequestMutation({
    onSuccess: onSuccessAddLabRequest,
    showError: true,
  });

  const handleAddLabRequest = useCallback(
    (labRequest: Schemas.LaboratoryRequestRequest) => {
      if (!data || !data.diagnoses || data.diagnoses.length <= 0) {
        handlerError(STRINGS.error.REQUEST_VALIDATE_ANALYSIS_MESSAGE);
      } else if (
        labRequest &&
        labRequest.items &&
        labRequest.items?.length > 0
      ) {
        mutateAdd({
          code,
          ...labRequest,
          diagnoses: data.diagnoses,
          appointment: appointmentId || appointmentIdParam,
        });
      } else {
        handlerError(STRINGS.error.REQUEST_VALIDATE_LAB);
      }
    },
    [appointmentId, appointmentIdParam, code, data, handlerError, mutateAdd],
  );

  const onSuccessAddImage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (data: Schemas.ImageRequestResponse) => {
      queryCache.setQueryData(
        ReactQueryKeys["customer-last-image-request-key"],
        data,
      );
      queryCache.invalidateQueries(
        ReactQueryKeys["customer-image-request-key"],
      );
    },
    [],
  );

  const {
    mutate: mutateAddImage,
    loading: loadingAddImage,
  } = useAddCustomerImageRequestMutation({
    onSuccess: onSuccessAddImage,
    showError: true,
  });

  const handleAddImageRequest = useCallback(
    (imageRequest: Schemas.ImageRequestRequest) => {
      if (!data || !data.diagnoses || data.diagnoses.length <= 0) {
        handlerError(STRINGS.error.REQUEST_VALIDATE_ANALYSIS_MESSAGE);
      } else if (
        imageRequest &&
        imageRequest.items &&
        imageRequest.items?.length > 0
      ) {
        mutateAddImage({
          code,
          ...imageRequest,
          diagnoses: data.diagnoses,
          appointment: appointmentId || appointmentIdParam,
        });
      } else {
        handlerError(STRINGS.error.REQUEST_VALIDATE_IMAGE);
      }
    },
    [
      appointmentId,
      appointmentIdParam,
      code,
      data,
      handlerError,
      mutateAddImage,
    ],
  );

  const { saveCurrentPrescription } = useSaveCurrentPrescriptionCacheSelector();

  const onSuccess = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (data: Schemas.PrescriptionResponse) => {
      saveCurrentPrescription(data);
      queryCache.invalidateQueries(
        ReactQueryKeys["customer-prescriptions-key"],
      );
    },
    [saveCurrentPrescription],
  );

  const {
    mutate: mutateAddRecipe,
    loading: loadingAddRecipe,
  } = useNewRecipeMutation({
    onSuccess,
    showError: true,
  });

  const handleAddRecipe = useCallback(
    (recipe: Schemas.PrescriptionRequest) => {
      if (recipe && recipe.items && recipe.items.length > 0) {
        mutateAddRecipe({
          code,
          ...recipe,
          appointment: appointmentId || appointmentIdParam,
        });
      } else {
        addLastAlerts({
          message: STRINGS.error.MISSING_FIELD,
          severity: "error",
          name: "",
        });
      }
    },
    [addLastAlerts, appointmentId, appointmentIdParam, code, mutateAddRecipe],
  );

  return (
    <TreatmentPlan
      readOnly={readOnly}
      data={data || defaultRecord}
      handlePatientCellClicked={handlePatientCellClicked}
      sendingCell={
        sendingImageByCell ||
        sendingLabByCell ||
        (optionToSend === "cell" && loadingSendingEmail)
      }
      openedHistory={openedHistory}
      onHistoryClicked={onHistoryClicked}
      openedHistoryPrescription={openedHistoryPrescription}
      handlePrescriptionHistory={handlePrescriptionHistory}
      handlePrintClicked={handlePrintClicked}
      loadingPdf={
        loadingImagePdf || loadingLaboratoriesPdf || loadingPrescriptionPdf
      }
      handleMailClicked={handleMailClicked}
      sendingEmail={
        sendingEmail ||
        sendingLabEmail ||
        (optionToSend === "email" && loadingSendingEmail)
      }
      handleAddLabRequest={handleAddLabRequest}
      loadingAddLab={loadingAddLab}
      lastLaboratoriesRequest={lastLaboratoriesRequest}
      lastImageRequest={lastImageRequest}
      handleAddImageRequest={handleAddImageRequest}
      loadingAddImage={loadingAddImage}
      onCloseHistory={onCloseHistory}
      lastPrescriptionRequest={lastPrescriptionRequest}
      handleAddRecipe={handleAddRecipe}
      loadingAddRecipe={loadingAddRecipe}
    />
  );
}
