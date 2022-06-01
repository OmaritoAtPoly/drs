import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { ReactQueryKeys } from "../../modules/apiTypes";
import { useCurrentAppointmentIdCacheSelectorState } from "../../modules/appointment/cacheSelector";
import {
  useAppointmentCompleteMutation,
  useDeleteAppointmentMutation,
  useNewAppointmentMutation,
} from "../../modules/customer/appointment/mutation";
import PatientPage from "./PatientPage";

export default function PatientPageContainer() {
  const { push } = useHistory();
  const { id } = useParams<{ id: string }>();
  const [showAppointmentItemDialog, setShowAppointmentItemDialog] = useState(
    false,
  );

  const handleShowAppointmentItemDialog = useCallback(() => {
    setShowAppointmentItemDialog(!showAppointmentItemDialog);
  }, [showAppointmentItemDialog]);

  const {
    saveCurrentAppointmentId,
  } = useCurrentAppointmentIdCacheSelectorState();

  const onSuccess = useCallback(
    (data: Schemas.AppointmentData) => {
      queryCache.setQueryData(
        ReactQueryKeys["professional-last-new-appointment-key"],
        data,
      );
      queryCache.invalidateQueries([ReactQueryKeys["professional-me"]], {
        exact: true,
      });
      push(`/patient/${id}/new-consult/${data.code}`);
    },
    [id, push],
  );

  const { mutate: newAppointmentMutate } = useNewAppointmentMutation({
    showError: true,
    onSuccess,
  });

  const newConsult = useCallback(
    (reason: string[]) => {
      newAppointmentMutate({
        reason,
        customerLegalID: id,
      });
    },
    [id, newAppointmentMutate],
  );

  const onPlayIn = useCallback(
    (patientId: string, codeAppointment: string) => {
      push(`/patient/${patientId}/new-consult/${codeAppointment}`);
    },
    [push],
  );

  const handleOnReschedule = useCallback(
    (appointmentCode: string) => {
      saveCurrentAppointmentId(appointmentCode);
      push("/schedule");
    },
    [push, saveCurrentAppointmentId],
  );

  const onSuccessFinish = useCallback(() => {
    queryCache.invalidateQueries([ReactQueryKeys["patient-appointment-key"]], {
      exact: false,
      refetchActive: true,
      refetchInactive: true,
    });
    handleShowAppointmentItemDialog();
  }, [handleShowAppointmentItemDialog]);

  const {
    mutate: mutateFinish,
    loading: loadingFinish,
  } = useAppointmentCompleteMutation({
    showError: true,
    onSuccess: onSuccessFinish,
  });

  const onFinish = useCallback(
    (patientId: string, codeAppointment: string) => {
      mutateFinish({ code: codeAppointment });
    },
    [mutateFinish],
  );

  const onSuccessMutateDelete = useCallback(() => {
    queryCache.invalidateQueries([ReactQueryKeys["patient-appointment-key"]], {
      exact: false,
      refetchActive: true,
      refetchInactive: true,
    });
    handleShowAppointmentItemDialog();
  }, [handleShowAppointmentItemDialog]);

  const {
    mutate: mutateDelete,
    loading: loadingDelete,
  } = useDeleteAppointmentMutation({
    showError: true,
    onSuccess: onSuccessMutateDelete,
  });

  const onCancel = useCallback(
    (patientId: string, codeAppointment: string) => {
      mutateDelete({ code: codeAppointment });
    },
    [mutateDelete],
  );

  return (
    <PatientPage
      newConsult={newConsult}
      onPlayIn={onPlayIn}
      onFinish={onFinish}
      onCancel={onCancel}
      onReschedule={handleOnReschedule}
      loadingFinish={loadingFinish}
      loadingDelete={loadingDelete}
      showAppointmentItemDialog={showAppointmentItemDialog}
      handleShowAppointmentItemDialog={handleShowAppointmentItemDialog}
    />
  );
}
