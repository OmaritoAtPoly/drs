/* eslint-disable @typescript-eslint/no-unused-vars */
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import DetailsAppointmentContainer from "../../../../../containers/customer/appointment/DetailsAppointmentContainer";
import PatientAppointmentContainer from "../../../../../containers/customer/appointment/PatientAppointmentContainer";
import STRINGS from "../../../../../utils/strings";
import TitleCard from "../../../../cards/TitleCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardStyle: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    cardContent: {
      display: "flex",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    appointmentsContainer: {
      width: "30%",
    },
    detailsContainer: {
      marginTop: 15,
    },
  }),
);

interface Props {
  onClickItem: (patientId: string, codeAppointment: string) => () => void;
  selectedAppointmentId?: string;
}

const PatientAppointmentPanel = ({
  onClickItem,
  selectedAppointmentId,
}: Props) => {
  const classes = useStyles();
  return (
    <TitleCard
      title={STRINGS.appointment.APPOINTMENT_HISTORY}
      onClick={() => {}}
      classNameContent={classes.cardContent}
      classTitle={classes.cardStyle}>
      <div className={classes.appointmentsContainer}>
        <PatientAppointmentContainer
          selectedAppointmentId={selectedAppointmentId}
          onClickHistoryItem={onClickItem}
          onClickIncomingItem={onClickItem}
          showOnlyHistory
          hideTitle
        />
      </div>
      <div className={classes.detailsContainer}>
        <DetailsAppointmentContainer />
      </div>
    </TitleCard>
  );
};

export default PatientAppointmentPanel;
