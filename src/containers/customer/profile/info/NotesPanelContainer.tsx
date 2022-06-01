import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import LoadingNotesPanel from "../../../../components/domains/customer/profile/info/LoadingNotePanel";
import NotesPanel from "../../../../components/domains/customer/profile/info/NotesPanel";
import { ReactQueryKeys } from "../../../../modules/apiTypes";
import { usePatientCacheSelector } from "../../../../modules/customer/profile/cacheSelector";
import { useUpdateCustomerNotesMutation } from "../../../../modules/customer/profile/mutation";

export default function NotesPanelContainer() {
  const { id: code } = useParams<{ id: string }>();
  const { currentPatient, loading: loadingPatient } = usePatientCacheSelector(
    {},
  );
  const [oldNotes, setOldNotes] = useState<string>("");

  const onSuccess = useCallback((_, variables) => {
    setOldNotes(variables.notes[0]);
    queryCache.invalidateQueries(ReactQueryKeys["current-patient"], {
      exact: false,
    });
  }, []);

  const { mutate, loading } = useUpdateCustomerNotesMutation({
    onSuccess,
    showError: true,
  });

  const handleUpdateNotes = useCallback(
    (notes: string) => {
      if (notes !== oldNotes) {
        mutate({
          code,
          notes: [notes],
        });
      }
    },
    [code, mutate, oldNotes],
  );

  return loadingPatient ? (
    <LoadingNotesPanel loading={loadingPatient} />
  ) : (
    <NotesPanel
      handleUpdateNotes={handleUpdateNotes}
      loading={loading}
      notes={(currentPatient?.notes && currentPatient.notes[0]) || ""}
    />
  );
}
