import { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import shortid from "shortid";
import { DEFAULT_PAGE_SIZE_LARGER } from "../../../../utils/constants";
import { REQUEST_DATA_TYPE } from "../../../../utils/enums";
import STRINGS from "../../../../utils/strings";
import { RequestHistory } from "../../../../utils/types";
import { fullName } from "../../../../utils/user";
import { useAddLastAlerts } from "../../../utils/error/handleError";
import { usePatientCacheSelector } from "../../profile/cacheSelector";
import { useSendImagesRequestMutation } from "./mutation";
import {
  useImageRequestQuery,
  useCustomerLastImageRequestQuery,
} from "./query";

export const useImageRequestHistoryCacheSelector = () => {
  const { appointmentId } = useParams<{
    appointmentId: string;
  }>();
  const { patientLegalId, currentPatient } = usePatientCacheSelector({});

  const { data, loading, refetch } = useImageRequestQuery({
    code: patientLegalId,
    showError: true,
    page: 0,
    pageSize: DEFAULT_PAGE_SIZE_LARGER,
    appointment: appointmentId,
  });

  const getDiagnose = useCallback((diagnoses: Schemas.Diagnose[]) => {
    if (diagnoses) {
      return diagnoses.map((diagnose) => diagnose.description || "");
    }
    return [""];
  }, []);

  const getRequest = useCallback(
    (requests: Schemas.ImageRequestItemRequest[]) => {
      if (requests) {
        return requests.map((request) => request.description || "");
      }
      return [""];
    },
    [],
  );

  const imageRequestHistoryData: RequestHistory[] | undefined = useMemo<
    RequestHistory[] | undefined
  >(
    () =>
      data?.map((imageRequest, index) => ({
        index: index + 1,
        code: imageRequest.code || shortid(),
        date: `${imageRequest.createdAt?.dateYear}/${imageRequest.createdAt?.dateMonth}/${imageRequest.createdAt?.dateDay}`,
        time: `${imageRequest.createdAt?.timeHour}:${imageRequest.createdAt?.timeMinute}`,
        requestType: REQUEST_DATA_TYPE.REQUESTS.IMAGE_REQUEST,
        diagnosis: getDiagnose(imageRequest.diagnoses || []),
        request: getRequest(imageRequest.items || []),
        patientName: fullName(currentPatient),
        data: imageRequest,
      })),
    [currentPatient, data, getDiagnose, getRequest],
  );
  return { loading, refetch, imageRequestHistoryData };
};

export const useLastImageRequestCacheSelector = () => {
  const { data, loading, refetch } = useCustomerLastImageRequestQuery({
    showError: true,
  });

  return { loading, refetch, data };
};

export const useImagesRequestMailSender = () => {
  const { patientLegalId } = usePatientCacheSelector({});
  const { addLastAlerts } = useAddLastAlerts();

  const onSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.REQUEST_SEND_SUCCESS_BY_EMAIL,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const {
    mutate: sentImagesRequest,
    loading: sendingEmail,
  } = useSendImagesRequestMutation({
    showError: true,
    onSuccess,
  });

  const handleSentByMail = useCallback(
    (requestCode?: string) => {
      if (patientLegalId && requestCode) {
        sentImagesRequest({
          code: patientLegalId,
          requestCode,
          sendByEmail: true,
          sendToCustomer: false,
          sendToProfessional: false,
        });
      }
    },
    [patientLegalId, sentImagesRequest],
  );

  return {
    handleSentByMail,
    sendingEmail,
  };
};
