import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import BadgedButton from "../../../components/buttons/BadgedButton";
import EventDialog from "../../../components/schedule/appointment/events/EventDialog";
import BasicTabs from "../../../components/tabs/BasicTabs";
import theme from "../../../styles/theme";
import STRINGS from "../../../utils/strings";
import AvailabilityScheduleContainer from "../AvailabilityScheduleContainer";
import LockSchedulePanelContainer from "../LockSchedulePanelContainer";
import NewAppointmentContainer from "./NewAppointmentContainer";

const useStyles = makeStyles(() =>
  createStyles({
    action: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      top: 0,
      right: 0,
      zIndex: 2,
    },
  }),
);

interface Props {
  loadingProfessional: boolean;
  currentProfessional: Schemas.ProfessionalData;
  open: boolean;
  center: Schemas.ProfessionalHealthCenterResponse;
  healthCenters: Schemas.ProfessionalHealthCenterResponse[];
  specialties: Schemas.SpecialtyResponse[];
  pickedDate: Date;
  handleShow: () => void;
}

export default function EventContainer({
  loadingProfessional,
  currentProfessional,
  open,
  center,
  healthCenters,
  specialties,
  pickedDate,
  handleShow,
}: Props) {
  const classes = useStyles();

  const tabs = [
    {
      label: STRINGS.appointment.NEW_APPOINTMENT,
      panel: (
        <NewAppointmentContainer
          loadingProfessional={loadingProfessional}
          currentProfessional={currentProfessional}
          center={center}
          healthCenters={healthCenters}
          specialties={specialties}
          pickedDate={pickedDate || new Date()}
          handleShow={handleShow}
        />
      ),
    },
    {
      label: STRINGS.appointment.LOCK_SCHEDULE,
      panel: (
        <LockSchedulePanelContainer
          loadingProfessional={loadingProfessional}
          currentProfessional={currentProfessional}
          pickedDate={pickedDate}
          handleShow={handleShow}
          healthCenter={center}
        />
      ),
    },
    {
      label: STRINGS.appointment.UNLOCK_SCHEDULE,
      panel: (
        <AvailabilityScheduleContainer
          loadingProfessional={loadingProfessional}
          currentProfessional={currentProfessional}
          healthCenter={center}
          selectedDate={pickedDate}
          handleShow={handleShow}
        />
      ),
    },
  ];

  return (
    <EventDialog open={open} handleShow={handleShow}>
      <BasicTabs tabs={tabs} />
      <div className={classes.action}>
        <BadgedButton
          onClick={handleShow}
          fill={theme.palette.error.dark}
          iconName="closeIcon"
          iconWidth={15}
          iconHeight={15}
        />
      </div>
    </EventDialog>
  );
}
