import React, { useCallback } from "react";
import PatientAppointmentPanel from "../../../components/domains/customer/newConsult/treatmentPlan/PatientAppointmentPanel";
import { useCurrentAppointmentDetailsCacheSelector } from "../../../modules/customer/appointment/cacheSelector";
import { useCurrentAppointmentDetailsQuery } from "../../../modules/customer/appointment/query";

const PatientAppointmentPanelContainer = () => {
  const {
    saveCurrentAppointmentDetails,
  } = useCurrentAppointmentDetailsCacheSelector();
  const { appointmentId } = useCurrentAppointmentDetailsQuery();

  const onClickItem = useCallback(
    (patientId: string, codeAppointment: string) => () => {
      saveCurrentAppointmentDetails({ appointmentId: codeAppointment });
    },
    [saveCurrentAppointmentDetails],
  );

  return (
    <PatientAppointmentPanel
      selectedAppointmentId={appointmentId}
      onClickItem={onClickItem}
    />
  );
};

export default PatientAppointmentPanelContainer;
