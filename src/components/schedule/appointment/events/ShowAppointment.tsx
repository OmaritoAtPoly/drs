import { createStyles, makeStyles, Typography } from "@material-ui/core";
import React, { useMemo } from "react";
import { dateTimeObjectFormatter, formatDate } from "../../../../utils/date";
import STRINGS from "../../../../utils/strings";
import { fullName, mainPhonesOrDefault } from "../../../../utils/user";
import Avatar from "../../../Avatar";
import PrimaryButton from "../../../buttons/PrimaryButton";
import LoadingWrapper from "../../../LoadingWrapper";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: theme.spacing(2),
      marginTop: "70px",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "500px",
    },
    panel: {
      display: "flex",
      justifyContent: "center",
      padding: theme.spacing(1),
      borderRadius: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: "100%",
    },
    healthCenterPanel: {
      backgroundColor: theme.palette.primary.main,
    },
    appointmentStatePanel: {
      backgroundColor: theme.palette.success.main,
    },
    innerPanel: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      justifyContent: "flex-start",
    },
    boldFont: {
      fontWeight: "bold",
    },
    font: {
      color: "#fff",
    },
    avatarContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2),
      width: "100%",
    },
    avatar: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      marginRight: theme.spacing(2),
    },
    label: { marginRight: theme.spacing(1) },
    actionSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: theme.spacing(2),
    },
    leftActionSection: {
      display: "flex",
      alignItems: "center",
    },
    customerPanel: {
      padding: theme.spacing(1),
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: theme.spacing(1),
    },
    contactInfo: {
      display: "flex",
      alignItems: "center",
    },
  }),
);

interface Props {
  loadingProfessional: boolean;
  currentProfessional: Schemas.ProfessionalData;
  healthCenter: Schemas.ProfessionalHealthCenterResponse;
  customer: Schemas.CustomerData;
  appointmentDate: Schemas.DateTimeObject;
  appointmentState: string;
  firstTime: boolean;
  deleting: boolean;
  handleShow: () => void;
  deleteAppointment: () => void;
}

export default function ShowAppointment({
  loadingProfessional,
  currentProfessional,
  healthCenter,
  customer,
  appointmentDate,
  appointmentState,
  firstTime,
  deleting,
  handleShow,
  deleteAppointment,
}: Props) {
  const classes = useStyles();

  const convertState = useMemo(() => {
    switch (appointmentState) {
      case "PAID":
        return STRINGS.appointment.PAID;
      case "IN_PROGRESS":
        return STRINGS.appointment.SCHEDULE;
      default:
        return STRINGS.appointment.SCHEDULE;
    }
  }, [appointmentState]);

  return (
    <div className={classes.container}>
      <div className={classes.avatarContainer}>
        <Avatar
          src={currentProfessional.avatarUrl}
          loading={loadingProfessional}
          className={classes.avatar}
        />
        <Typography variant="h5">
          {`Dr. ${fullName(currentProfessional)}`}
        </Typography>
      </div>
      <div className={classes.content}>
        <div className={`${classes.panel} ${classes.appointmentStatePanel}`}>
          <Typography className={classes.font}>{convertState}</Typography>
        </div>

        <div className={`${classes.panel} ${classes.healthCenterPanel}`}>
          <Typography className={classes.font}>
            {`${healthCenter?.name || ""} | ${healthCenter?.address || ""}`}
          </Typography>
        </div>

        <div className={classes.panel}>
          <div className={classes.innerPanel}>
            <Typography>{STRINGS.generals.DATE}</Typography>
            <Typography className={classes.boldFont}>
              {dateTimeObjectFormatter(
                {
                  ...appointmentDate,
                  dateMonth: appointmentDate.dateMonth
                    ? appointmentDate.dateMonth - 1
                    : 0,
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatDate["dddd, D [de] MMMM [de] YYYY, h:mm a"] as any,
              )}
            </Typography>
          </div>
        </div>
        {firstTime && (
          <div className={classes.panel}>
            <div className={classes.innerPanel}>
              <Typography className={classes.boldFont}>
                {STRINGS.appointment.FIRST_TIME}
              </Typography>
            </div>
          </div>
        )}
        <div className={classes.panel}>
          <div className={classes.innerPanel}>
            <Typography className={classes.label}>
              {STRINGS.generals.PATIENT}
            </Typography>
            <div className={classes.customerPanel}>
              <Typography>
                {`${fullName(customer)} | ${STRINGS.generals.ID}:  ${
                  customer.legalID
                }`}
              </Typography>
            </div>
          </div>
        </div>
        <div className={classes.panel}>
          <div className={classes.innerPanel}>
            <div className={classes.contactInfo}>
              <Typography className={classes.label}>
                {STRINGS.patientInfo.PHONE}
              </Typography>
              <div>
                <Typography>
                  {mainPhonesOrDefault("MOBILE", customer)}
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.actionSection}>
          <PrimaryButton
            label={STRINGS.generals.BACK}
            variant="text"
            color="primary"
            onClick={handleShow}
          />
          <LoadingWrapper loading={deleting}>
            <PrimaryButton
              onClick={deleteAppointment}
              variant="contained"
              color="primary"
              label={STRINGS.appointment.DELETE_APPOINTMENT}
              disabled={deleting}
            />
          </LoadingWrapper>
        </div>
      </div>
    </div>
  );
}
