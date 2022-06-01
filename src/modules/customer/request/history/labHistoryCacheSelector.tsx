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
import { useSendLabsRequestPdfMutation } from "./mutation";
import {
  useLaboratoryRequestQuery,
  useCustomerLastLaboratoriesRequestQuery,
} from "./query";

// eslint-disable-next-line import/prefer-default-export
export const useLabRequestHistoryCacheSelector = () => {
  const { appointmentId } = useParams<{
    appointmentId: string;
  }>();

  const { patientLegalId, currentPatient } = usePatientCacheSelector({});

  const { data, loading, refetch } = useLaboratoryRequestQuery({
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

  const labRequestHistoryData: RequestHistory[] | undefined = useMemo<
    RequestHistory[] | undefined
  >(
    () =>
      data?.map((labRequest, index) => ({
        index: index + 1,
        code: labRequest.code || shortid(),
        date: `${labRequest.createdAt?.dateYear}/${labRequest.createdAt?.dateMonth}/${labRequest.createdAt?.dateDay}`,
        time: `${labRequest.createdAt?.timeHour}:${labRequest.createdAt?.timeMinute}`,
        requestType: REQUEST_DATA_TYPE.REQUESTS.LAB_REQUEST,
        diagnosis: getDiagnose(labRequest.diagnoses || []),
        request: getRequest(labRequest.items || []),
        patientName: fullName(currentPatient),
        data: labRequest,
      })),
    [currentPatient, data, getDiagnose, getRequest],
  );

  return { loading, refetch, labRequestHistoryData };
};

export const useLastLaboratoriesRequestCacheSelector = () => {
  const { data, loading, refetch } = useCustomerLastLaboratoriesRequestQuery({
    showError: true,
  });

  return { loading, refetch, data };
};

export const useLabsRequestMailSender = () => {
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
    mutate: sentLabsRequestPdf,
    loading: sendingLabEmail,
  } = useSendLabsRequestPdfMutation({
    showError: true,
    onSuccess,
  });

  const handleSentLabPdfByMail = useCallback(
    (requestCode?: string) => {
      if (patientLegalId && requestCode) {
        sentLabsRequestPdf({
          code: patientLegalId,
          requestCode,
          sendByEmail: true,
          sendToCustomer: false,
          sendToProfessional: false,
        });
      }
    },
    [patientLegalId, sentLabsRequestPdf],
  );

  return {
    handleSentLabPdfByMail,
    sendingLabEmail,
  };
};
