import { useCallback } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import { ReactQueryKeys, ReactQueryStaleTime } from "../../apiTypes";
import { useSearch } from "../../utils/route";
import { useProceduresQuery } from "./query";

const useCurrentProcedureToEditCacheSelector = () => {
  const saveCurrentProcedureToEdit = useCallback(
    (data?: Schemas.ProcedureResponse) => {
      queryCache.setQueryData(
        [ReactQueryKeys["current-procedure-to-edit"]],
        data,
        { staleTime: ReactQueryStaleTime.NEVER },
      );
    },
    [],
  );
  return { saveCurrentProcedureToEdit };
};

export default useCurrentProcedureToEditCacheSelector;

export const useCustomerProceduresList = (patientId: string) => {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const { pageSize: pageSizeInRoute, page: pageInRoute } = useSearch();

  const { data: procedures, loading: loadingProcedures } = useProceduresQuery({
    showError: true,
    retry: false,
    code: patientId,
    page: pageInRoute,
    pageSize: pageSizeInRoute,
    enabled: patientId,
    appointment: appointmentId,
  });
  return { procedures, loadingProcedures };
};
