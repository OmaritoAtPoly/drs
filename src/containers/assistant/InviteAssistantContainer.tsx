import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import InviteAssistantDialog from "../../components/domains/assistant/InviteAssistantDialog";
import { ReactQueryKeys } from "../../modules/apiTypes";
import {
  useProfessionalAssistantCacheSelector,
  useProfessionalAssistantQueryCacheSelector,
} from "../../modules/auth/signUp/assistant/cacheSelector";
import { useInviteAssistantMutation } from "../../modules/auth/signUp/assistant/mutation";

const InviteAssistantContainer = () => {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const { assistantsList } = useProfessionalAssistantQueryCacheSelector();
  const {
    handleDeleteAssistant,
    deletingAssistant,
  } = useProfessionalAssistantCacheSelector();

  const handleSetShowAdd = useCallback(() => setShowAdd(!showAdd), [showAdd]);

  const onSuccess = useCallback(() => {
    handleSetShowAdd();
    queryCache.invalidateQueries(
      ReactQueryKeys["professional-assistants-list"],
    );
  }, [handleSetShowAdd]);

  const { mutate, loading } = useInviteAssistantMutation({
    onSuccess,
    showError: true,
  });

  const handleAssistantInvitation = useCallback(
    (value: Schemas.EmailNameRequest) => {
      mutate(value);
    },
    [mutate],
  );

  return (
    <div>
      <InviteAssistantDialog
        handleSubmitForm={handleAssistantInvitation}
        handleSetShowAdd={handleSetShowAdd}
        showAdd={showAdd}
        loading={loading}
        assistantsList={assistantsList}
        handleDeleteAssistant={handleDeleteAssistant}
        deletingAssistant={deletingAssistant}
      />
    </div>
  );
};

export default InviteAssistantContainer;
