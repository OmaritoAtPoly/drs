import React, { useEffect } from "react";
import { useCurrentAppointmentDetailsCacheSelector } from "../../modules/customer/appointment/cacheSelector";
import NewConsultPage from "./NewConsultPage";

export default function NewConsultPageContainer() {
  const {
    saveCurrentAppointmentDetails,
  } = useCurrentAppointmentDetailsCacheSelector();

  useEffect(() => {
    saveCurrentAppointmentDetails({ appointmentId: undefined });
  }, [saveCurrentAppointmentDetails]);
  return <NewConsultPage />;
}
