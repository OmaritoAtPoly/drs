import { useParams } from "react-router-dom";
import { useSearch } from "../../utils/route";
import { usePatientCacheSelector } from "../profile/cacheSelector";
import useConsentsQuery from "./query";

const useConsentCacheSelector = () => {
  const { id: patientId } = useParams<{ id?: string }>();
  const { currentPatient } = usePatientCacheSelector({});

  const { pageSize: pageSizeInRoute, page: pageInRoute } = useSearch();

  const { data: consents, loading: consentsLoading } = useConsentsQuery({
    showError: true,
    retry: false,
    code: currentPatient?.legalID || "",
    page: pageInRoute,
    pageSize: pageSizeInRoute,
    enabled: patientId,
  });

  return {
    consents,
    consentsLoading,
    page: pageInRoute,
    pageSize: pageSizeInRoute,
    code: currentPatient?.legalID || "",
  };
};

export default useConsentCacheSelector;
