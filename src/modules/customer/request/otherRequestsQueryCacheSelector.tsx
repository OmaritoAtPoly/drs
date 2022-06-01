import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import shortid from "shortid";
import { REQUEST_DATA_TYPE } from "../../../utils/enums";
import { RequestHistory } from "../../../utils/types";
import { fullName } from "../../../utils/user";
import { usePatientCacheSelector } from "../profile/cacheSelector";
import { useCustomerOtherRequestQuery } from "./query";

const useOtherRequestQueryCacheSelector = () => {
  const { appointmentId } = useParams<{
    appointmentId: string;
  }>();
  const { patientLegalId: code, currentPatient } = usePatientCacheSelector({});
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, loading, refetch } = useCustomerOtherRequestQuery({
    code,
    showError: true,
    page,
    pageSize,
    appointment: appointmentId,
  });

  const getDiagnose = useCallback((diagnoses: Schemas.Diagnose[]) => {
    if (diagnoses) {
      return diagnoses.map((diagnose) => diagnose.description || "");
    }
    return [""];
  }, []);

  const getRequest = useCallback(
    (requests: Schemas.OtherRequestItemResponse[]) => {
      if (requests) {
        return requests.map((request) => request.description || "");
      }
      return [""];
    },
    [],
  );

  const otherRequests = useMemo<RequestHistory[] | undefined>(
    () =>
      data?.map((request, index: number) => ({
        index: index + 1,
        code: request.code || shortid(),
        date: `${request.createdAt?.dateYear}/${request.createdAt?.dateMonth}/${request.createdAt?.dateDay}`,
        time: `${request.createdAt?.timeHour}:${request.createdAt?.timeMinute}`,
        requestType: REQUEST_DATA_TYPE.REQUESTS.OTHER_REQUEST,
        diagnosis: getDiagnose(request.diagnoses || []),
        request: getRequest(request.items || []),
        patientName: fullName(currentPatient),
        data: request,
      })),
    [currentPatient, data, getDiagnose, getRequest],
  );

  const setPagination = useCallback(
    (pageNumber: number, pageNumberSize: number) => {
      setPage(pageNumber);
      setPageSize(pageNumberSize);
    },
    [],
  );

  useEffect(() => {
    refetch();
  }, [page, pageSize, refetch]);

  return { otherRequests, loading, page, pageSize, setPagination, refetch };
};
export default useOtherRequestQueryCacheSelector;
