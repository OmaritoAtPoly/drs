import React from "react";
import DetailsAppointment from "../../../components/domains/customer/appointment/DetailsAppointment";
import { useCurrentAppointmentDetailsQuery } from "../../../modules/customer/appointment/query";

const DetailsAppointmentContainer = () => {
  const { appointmentId } = useCurrentAppointmentDetailsQuery();
  return <DetailsAppointment appointmentId={appointmentId} />;
};

export default DetailsAppointmentContainer;
