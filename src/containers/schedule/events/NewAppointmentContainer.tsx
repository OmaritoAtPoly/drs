/* eslint-disable @typescript-eslint/no-shadow */
import React, { useCallback } from "react";
import { queryCache } from "react-query";
import NewAppointment from "../../../components/schedule/appointment/events/NewAppointment";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useCreateAppointmentMutation } from "../../../modules/appointment/mutation";
import { useCustomersCacheSelector } from "../../../modules/customer/profile/cacheSelector";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import STRINGS from "../../../utils/strings";

interface Props {
  loadingProfessional: boolean;
  currentProfessional: Schemas.ProfessionalData;
  center: Schemas.ProfessionalHealthCenterResponse;
  healthCenters: Schemas.ProfessionalHealthCenterResponse[];
  specialties: Schemas.SpecialtyResponse[];
  pickedDate: Date;
  handleShow: () => void;
}

export default function NewAppointmentContainer({
  loadingProfessional,
  currentProfessional,
  center,
  healthCenters,
  specialties,
  pickedDate,
  handleShow,
}: Props) {
  const {
    items,
    loading,
    setSearch,
    isFetchingMore,
  } = useCustomersCacheSelector({});
  const { addLastAlerts } = useAddLastAlerts();

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries(
      ReactQueryKeys["professional-appointment-list-key"],
    );
    queryCache.invalidateQueries([ReactQueryKeys["patient-appointment-key"]], {
      exact: false,
      refetchActive: true,
      refetchInactive: true,
    });
    addLastAlerts({
      message: STRINGS.appointment.CREATE_APPOINTMENT_SUCCESS,
      severity: "success",
      name: "",
    });
    handleShow();
  }, [addLastAlerts, handleShow]);

  const {
    mutate,
    loading: creatingAppointment,
  } = useCreateAppointmentMutation({ showError: true, onSuccess });

  const onSearch = useCallback(
    (searchQuery: string) => {
      setSearch(searchQuery);
    },
    [setSearch],
  );

  const handleOnCreate = useCallback(
    (request: Schemas.AppointmentProfessionalRequest) => {
      mutate(request);
    },
    [mutate],
  );

  return (
    <NewAppointment
      creatingAppointment={creatingAppointment}
      loadingProfessional={loadingProfessional}
      currentProfessional={currentProfessional}
      searching={loading || !!isFetchingMore}
      center={center}
      customersResult={items || []}
      appointmentDurationTime={
        currentProfessional?.appointmentDurationInMinutes || 30
      }
      healthCenters={healthCenters}
      specialties={specialties}
      pickedDate={pickedDate}
      onSearch={onSearch}
      handleShow={handleShow}
      handleOnCreate={handleOnCreate}
    />
  );
}
