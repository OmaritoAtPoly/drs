import moment from "moment";
import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";

import { useHistory } from "react-router-dom";
import RecentAppointmentDialog from "../../../../components/domains/customer/appointment/recentAppoinmet/RecentAppointmentDialog";
import { ReactQueryKeys } from "../../../../modules/apiTypes";
import { useCurrentAppointmentIdCacheSelectorState } from "../../../../modules/appointment/cacheSelector";

import { useDeleteRecentAppointmentMutation } from "../../../../modules/appointment/mutation";
import useProfessionalAppointmentListQueryCacheSelector from "../../../../modules/appointment/queryCacheSelector";
import {
  useAppointmentCompleteMutation,
  useDeleteAppointmentMutation,
} from "../../../../modules/customer/appointment/mutation";

export default function RecentAppointmentDialogContainer() {
  const { push } = useHistory();
  const [showAppointmentItemDialog, setShowAppointmentItemDialog] = useState(
    false,
  );
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal]);
  const {
    from,
    to,
    loading,
    isFetchingMore,
    canFetchMore,
    setRangeDates,
    appointments,
    fetchMore,
  } = useProfessionalAppointmentListQueryCacheSelector({
    from: new Date(),
    to: moment(new Date()).add(1, "days").toDate(),
    alwaysEnabled: true,
  });
  const {
    saveCurrentAppointmentId,
  } = useCurrentAppointmentIdCacheSelectorState();
  const handleShowAppointmentItemDialog = useCallback(() => {
    setShowAppointmentItemDialog(!showAppointmentItemDialog);
  }, [showAppointmentItemDialog]);

  const onSuccessDeleteFromDialog = useCallback(() => {
    queryCache.invalidateQueries(
      ReactQueryKeys["professional-appointment-list-key"],
      {
        exact: false,
        refetchActive: true,
        refetchInactive: true,
      },
    );
    handleOpenModal();
  }, [handleOpenModal]);

  const onSuccessDelete = useCallback(() => {
    queryCache.invalidateQueries(
      ReactQueryKeys["professional-appointment-list-key"],
      {
        exact: false,
        refetchActive: true,
        refetchInactive: true,
      },
    );
  }, []);

  const { mutate } = useDeleteRecentAppointmentMutation({
    showError: true,
    onSuccess: onSuccessDelete,
  });

  const handleAddDay = useCallback(() => {
    setRangeDates(
      moment(from).add(1, "days").toDate(),
      moment(to).add(1, "days").toDate(),
    );
  }, [from, setRangeDates, to]);

  const handleToday = useCallback(() => {
    setRangeDates(new Date(), moment(new Date()).add(1, "days").toDate());
  }, [setRangeDates]);

  const handleRestDay = useCallback(() => {
    setRangeDates(
      moment(from).subtract(1, "days").toDate(),
      moment(to).subtract(1, "days").toDate(),
    );
  }, [from, setRangeDates, to]);

  const {
    mutate: mutateDelete,
    loading: loadingDelete,
  } = useDeleteAppointmentMutation({
    showError: true,
    onSuccess: onSuccessDeleteFromDialog,
  });

  const handleCancel = useCallback(
    (patientId: string, codeAppointment: string) => {
      mutateDelete({ code: codeAppointment });
    },
    [mutateDelete],
  );

  const onSuccessFinish = useCallback(() => {
    queryCache.invalidateQueries(
      ReactQueryKeys["professional-appointment-list-key"],
      {
        exact: false,
        refetchActive: true,
        refetchInactive: true,
      },
    );
    handleShowAppointmentItemDialog();
  }, [handleShowAppointmentItemDialog]);

  const {
    mutate: mutateFinish,
    loading: loadingFinish,
  } = useAppointmentCompleteMutation({
    showError: true,
    onSuccess: onSuccessFinish,
  });

  const handleFinish = useCallback(
    (patientId: string, codeAppointment: string) => {
      mutateFinish({ code: codeAppointment });
    },
    [mutateFinish],
  );

  const handleOnConfirmDelete = useCallback(
    (code: string) => {
      mutate({ code });
    },
    [mutate],
  );

  const handlePlayIn = useCallback(
    (patientId: string, codeAppointment: string) => {
      push(`/patient/${patientId}/new-consult/${codeAppointment}`);
    },
    [push],
  );
  const handleAddCallback = useCallback(
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

  return (
    <>
      <RecentAppointmentDialog
        handleCancel={handleCancel}
        handlePlayIn={handlePlayIn}
        handleReschedule={handleOnReschedule}
        handleShowAppointmentItemDialog={handleShowAppointmentItemDialog}
        loadingDelete={loadingDelete}
        showAppointmentItemDialog={showAppointmentItemDialog}
        appointments={appointments}
        handleAddDay={handleAddDay}
        handleRestDay={handleRestDay}
        handleToday={handleToday}
        selectedDate={from}
        fetchMore={fetchMore}
        handleOnConfirmDelete={handleOnConfirmDelete}
        canFetchMore={canFetchMore}
        loading={loading}
        isFetchingMore={!!isFetchingMore}
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        handleFinish={handleFinish}
        loadingFinish={loadingFinish}
        handleAddCallback={handleAddCallback}
      />
    </>
  );
}
