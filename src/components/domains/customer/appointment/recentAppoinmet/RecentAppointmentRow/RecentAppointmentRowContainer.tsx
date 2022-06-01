import React from "react";
import RecentAppointmentRow from "./RecentAppointmentRow";

interface Props {
  appointment: Schemas.AppointmentData;
  handleOnConfirmDelete: (code: string) => void;
  loadingDelete?: boolean;
  handleEditCallBack: () => void;
  handleAdd: () => void;
}

const RecentAppointmentRowContainer = ({
  appointment,
  handleOnConfirmDelete,
  loadingDelete = false,
  handleEditCallBack,
  handleAdd,
}: Props) => (
  <RecentAppointmentRow
    id={appointment.code}
    appointment={appointment}
    onClick={() => {}}
    handleOnConfirmDelete={handleOnConfirmDelete}
    loadingDelete={loadingDelete}
    hideDeleteIcon={
      appointment.state === "CANCELED" || appointment.state === "COMPLETED"
    }
    handleEditCallBack={handleEditCallBack}
    handleAdd={handleAdd}
  />
);
export default RecentAppointmentRowContainer;
