import { createStyles, makeStyles } from "@material-ui/core/styles";
import React from "react";
import STRINGS from "../../../../utils/strings";
import AppointmentCard from "../../../cards/AppointmentCard";
import InfiniteScrollList from "../../../lists/InfiniteScrollList";

const useStyles = makeStyles(() =>
  createStyles({
    listContainer: {
      maxHeight: "400px",
      overflow: "auto",
    },
    spacer: {
      marginBottom: 7,
    },
    spacerLoading: {
      marginTop: 10,
    },
  }),
);

interface Props {
  showOnlyHistory?: boolean;
  hideTitle?: boolean;
  incomingAppointments: Schemas.AppointmentData[];
  incomingLoading?: boolean;
  onClickIncomingItem: (
    patientId: string,
    codeAppointment: string,
  ) => () => void;
  fetchMoreIncoming: () => void;
  hasNextPageIncoming?: boolean;
  historyAppointments: Schemas.AppointmentData[];
  historyLoading?: boolean;
  onClickHistoryItem: (
    patientId: string,
    codeAppointment: string,
  ) => () => void;
  fetchMoreHistory: () => void;
  hasNextPageHistory?: boolean;
  selectedAppointmentId?: string;
}

function PatientAppointment({
  showOnlyHistory = false,
  hideTitle = false,
  incomingAppointments,
  incomingLoading,
  onClickIncomingItem,
  fetchMoreIncoming,
  hasNextPageIncoming,
  historyAppointments,
  historyLoading,
  onClickHistoryItem,
  fetchMoreHistory,
  hasNextPageHistory,
  selectedAppointmentId,
}: Props) {
  const classes = useStyles();

  return (
    <div>
      {!showOnlyHistory && !!incomingAppointments.length && (
        <div>
          {!hideTitle && <p>{STRINGS.appointment.APPOINTMENT_SCHEDULE}</p>}
          <div className={classes.listContainer}>
            <div>
              <InfiniteScrollList
                data={incomingAppointments || []}
                loading={incomingLoading}
                fetchMore={fetchMoreIncoming}
                hasNextPage={hasNextPageIncoming}
                renderRow={(appointment: Schemas.AppointmentData) => (
                  <AppointmentCard
                    classNameContainer={classes.spacer}
                    selected={selectedAppointmentId === appointment.code}
                    actual
                    onClick={onClickIncomingItem(
                      appointment.customerData?.legalID || "",
                      appointment.code || "",
                    )}
                    appointment={appointment}
                  />
                )}
              />
            </div>
          </div>
        </div>
      )}
      {!!historyAppointments.length && (
        <div>
          {!hideTitle && <p>{STRINGS.appointment.APPOINTMENT_HISTORY}</p>}
          <div className={classes.listContainer}>
            <div>
              <InfiniteScrollList
                data={historyAppointments || []}
                loading={historyLoading}
                fetchMore={fetchMoreHistory}
                hasNextPage={hasNextPageHistory}
                renderRow={(appointment: Schemas.AppointmentData) => (
                  <AppointmentCard
                    classNameContainer={classes.spacer}
                    selected={selectedAppointmentId === appointment.code}
                    onClick={onClickHistoryItem(
                      appointment.customerData?.legalID || "",
                      appointment.code || "",
                    )}
                    appointment={appointment}
                  />
                )}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientAppointment;
