import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { useCallback } from "react";
import InfiniteScrollList from "../../../../lists/InfiniteScrollList";
import RecentAppointmentFilter from "./RecentAppointmentFilter";
import RecentAppointmentRowContainer from "./RecentAppointmentRow/RecentAppointmentRowContainer";
import SimpleHeaderRecent from "./SimpleHeaderRecent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    filterContainer: {
      zIndex: 100,
      position: "fixed",
      top: window.innerHeight - 300,
      right: 0,
      left: 55,
      height: 60,
      display: "flex",
      backgroundColor: theme.palette.common.white,
      justifyContent: "space-between",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
      width: "100%",
    },
    appointmentContainer: {
      marginTop: window.innerHeight - 360,
      height: 360,
    },
  }),
);

interface Props {
  appointments: Schemas.AppointmentData[];
  loading?: boolean;
  fetchMore?: () => void;
  hasNextPage?: boolean;
  handleAddDay: () => void;
  handleRestDay: () => void;
  handleToday: () => void;
  selectedDate: Date;
  handleOnConfirmDelete: (code: string) => void;
  loadingDelete?: boolean;
  handleEditCallBack: (patientId: string, appointment: string) => void;
  handleAddCallback: (patientId: string, appointment: string) => void;
}

const RecentAppointment = ({
  appointments,
  loading,
  fetchMore = () => {},
  hasNextPage,
  handleAddDay,
  handleRestDay,
  handleToday,
  selectedDate,
  handleOnConfirmDelete,
  loadingDelete,
  handleEditCallBack,
  handleAddCallback,
}: Props) => {
  const classes = useStyles();

  const handleOnEditCallBack = useCallback(
    (patientId: string, appointment: string) => () => {
      handleEditCallBack(patientId, appointment);
    },
    [handleEditCallBack],
  );
  const handleOnAdd = useCallback(
    (patientId: string, appointment: string) => () => {
      handleAddCallback(patientId, appointment);
    },
    [handleAddCallback],
  );
  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <RecentAppointmentFilter
          handleToday={handleToday}
          handleAddDay={handleAddDay}
          handleRestDay={handleRestDay}
          today={selectedDate}
        />
      </div>
      <div className={classes.appointmentContainer}>
        <InfiniteScrollList
          height={window.innerHeight - 360}
          data={appointments}
          loading={loading}
          fetchMore={fetchMore}
          hasNextPage={hasNextPage}
          renderRow={(appointment: Schemas.AppointmentData) => (
            <RecentAppointmentRowContainer
              appointment={appointment}
              loadingDelete={loadingDelete}
              handleOnConfirmDelete={handleOnConfirmDelete}
              handleEditCallBack={handleOnEditCallBack(
                appointment.customerData?.legalID || "",
                appointment.code || "",
              )}
              handleAdd={handleOnAdd(
                appointment.customerData?.legalID || "",
                appointment.code || "",
              )}
            />
          )}
          renderHeader={() => <SimpleHeaderRecent />}
        />
      </div>
    </div>
  );
};

export default RecentAppointment;
