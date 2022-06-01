import { useParams } from "react-router-dom";
import { useSearch } from "../../utils/route";
import { usePatientCacheSelector } from "../profile/cacheSelector";
import useProfessionalFilesQuery from "./query";

const useProfessionalFilesCacheSelector = () => {
  const { id: patientId } = useParams<{ id?: string }>();
  const { currentPatient } = usePatientCacheSelector({});

  const { pageSize: pageSizeInRoute, page: pageInRoute } = useSearch();

  const { data: files, loading: filesLoading } = useProfessionalFilesQuery({
    showError: true,
    retry: false,
    code: currentPatient?.legalID || "",
    page: pageInRoute,
    pageSize: pageSizeInRoute,
    enabled: patientId,
  });

  return {
    files,
    filesLoading,
    page: pageInRoute,
    pageSize: pageSizeInRoute,
    code: currentPatient?.legalID || "",
  };
};

export default useProfessionalFilesCacheSelector;
