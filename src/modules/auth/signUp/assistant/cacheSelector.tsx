import { useCallback, useMemo } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import { ReactQueryKeys, ReactQueryStaleTime } from "../../../apiTypes";
import useProfileCacheSelector from "../../../profile/cacheSelector";
import { useDeleteProfessionalAssistantMutation } from "./mutation";
import useProfessionalAssistantQuery, {
  useEditableAssistantQuery,
  useProfessionalAssistantToActivateQuery,
  useSelectedProfessionalAssistantQuery,
} from "./query";

export const useProfessionalAssistantCacheSelector = () => {
  const { id: currentAssistantId } = useParams<{ id: string }>();

  const {
    data: editableAssistantId,
    loading: loadingEditableAssistantId,
  } = useEditableAssistantQuery({
    staleTime: ReactQueryStaleTime.NEVER,
    retry: false,
    exact: true,
    showError: true,
    enabled: currentAssistantId,
  });

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries(
      ReactQueryKeys["professional-assistants-list"],
    );
  }, []);

  const {
    mutate,
    loading: deletingAssistant,
  } = useDeleteProfessionalAssistantMutation({
    onSuccess,
    showError: true,
  });

  const handleDeleteAssistant = useCallback(
    (assistantId: string) => mutate({ code: assistantId }),
    [mutate],
  );

  const {
    data: assistantToActivate,
    loading: loadingAssistantToActivate,
  } = useProfessionalAssistantToActivateQuery({
    staleTime: ReactQueryStaleTime.NEVER,
    retry: false,
    exact: true,
    showError: true,
    code: currentAssistantId,
    enabled: currentAssistantId,
  });

  const { data: selectedAssistant } = useSelectedProfessionalAssistantQuery({
    staleTime: ReactQueryStaleTime.NEVER,
    retry: false,
    exact: true,
    showError: true,
    code: currentAssistantId,
    enabled: currentAssistantId,
  });

  return {
    deletingAssistant,
    editableAssistantId,
    selectedAssistant,
    assistantToActivate,
    loadingAssistantToActivate,
    loadingEditableAssistantId,
    handleDeleteAssistant,
  };
};

export const useProfessionalAssistantQueryCacheSelector = () => {
  const { currentProfessional, isAssistant } = useProfileCacheSelector();
  const professionalId = useMemo(
    () => (currentProfessional?.legalID ? currentProfessional.legalID : ""),
    [currentProfessional?.legalID],
  );

  const {
    data: assistantsList,
    loading: assistantLoading,
  } = useProfessionalAssistantQuery({
    staleTime: ReactQueryStaleTime.NEVER,
    retry: false,
    exact: true,
    showError: true,
    code: professionalId,
    page: 0,
    pageSize: 50,
    enabled: !isAssistant(),
  });

  return { assistantsList, assistantLoading };
};
