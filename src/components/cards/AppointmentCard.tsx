/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
import { Divider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import React, { useMemo } from "react";
import theme from "../../styles/theme";
import STRINGS from "../../utils/strings";
import { fullName } from "../../utils/user";
import CardLayout from "./CardLayout";

// TODO: Add the colors to the theme
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    cursor: "pointer",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  blue: {
    color: "#004AAD",
  },
  blueBackgroundColor: {
    backgroundColor: "#004AAD",
    minWidth: 10,
  },
  lightGreen: {
    color: "#7ED957",
  },
  lightGreenBackgroundColor: {
    backgroundColor: "#7ED957",
    minWidth: 10,
  },
  lightBlue: {
    color: "#00C2CB",
  },
  lightBlueBackgroundColor: {
    backgroundColor: "#00C2CB",
    minWidth: 10,
  },
  red: {
    color: "#F41616",
  },
  redBackgroundColor: {
    backgroundColor: "#F41616",
    minWidth: 10,
  },
  date: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  data: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    textAlign: "justify",
  },
  cont: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  time: {
    position: "absolute",
    top: 2,
    right: 5,
  },
  time2: {
    position: "absolute",
    top: 10,
    right: 5,
  },
  treatment: {
    marginTop: 15,
    marginBottom: 10,
  },
  historyHourStyle: {
    display: "flex",
    justifyContent: "flex-end",
    fontWeight: "bold",
    fontSize: 11,
    paddingRight: 10,
  },
  historyCardStyle: {
    display: "flex",
    flexDirection: "column",
    paddingInline: theme.spacing(2),
  },
  datePatientStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
    alignItems: "center",
  },
});

interface Props {
  onClick: () => void;
  appointment: Schemas.AppointmentData;
  actual?: boolean;
  selected?: boolean;
  classNameContainer?: string;
}

const AppointmentCard = ({
  onClick,
  appointment,
  actual = false,
  selected = false,
  classNameContainer = "",
}: Props) => {
  const classes = useStyles();

  const classNameColor = useMemo(() => {
    if (appointment.state === "IN_PROGRESS") {
      return {
        // aqui va en rojo
        background: classes.redBackgroundColor,
        color: classes.red,
      };
    }

    if (appointment.state === "PAID" || appointment.state === "PENDENT") {
      switch (appointment.serviceCode) {
        case "FACE_TO_FACE":
          return {
            background: classes.blueBackgroundColor,
            color: classes.blue,
          };
        case "REMOTE":
          return {
            background: classes.lightGreenBackgroundColor,
            color: classes.lightGreen,
          };
        case "REMOTE_EMERGENCY":
          return {
            background: classes.lightGreenBackgroundColor,
            color: classes.lightGreen,
          };
        default:
          return {
            background: classes.lightGreenBackgroundColor,
            color: classes.lightGreen,
          };
      }
    }

    return {
      background: classes.lightGreenBackgroundColor,
      color: classes.lightGreen,
    };
  }, [
    appointment.serviceCode,
    appointment.state,
    classes.blue,
    classes.blueBackgroundColor,
    classes.lightGreen,
    classes.lightGreenBackgroundColor,
    classes.red,
    classes.redBackgroundColor,
  ]);

  const diagnosesMemo = useMemo(
    () => appointment.record?.diagnoses?.map((a) => a).slice(0, 2) || [],
    [appointment.record?.diagnoses],
  );

  const prescriptionMemo = useMemo(
    () =>
      appointment?.prescriptions
        ?.map((p) => p.items)
        .flat()
        .slice(0, 3) || [],
    [appointment?.prescriptions],
  );

  return (
    <CardLayout
      selected={selected}
      className={`${classNameContainer} ${classes.root}`}
      onClick={onClick}>
      {actual ? (
        <div className={classes.cont}>
          <div className={classes.container}>
            <div className={classNameColor.background} />
            <div className={classes.date}>
              <Typography className={classes.bold} variant="h6">
                {appointment.from?.dateDay}
              </Typography>
              <Typography className={classes.bold} variant="h6">
                {moment(
                  `${appointment.from?.dateDay}/${
                    appointment.from?.dateMonth || 0
                  }/${appointment.from?.dateYear}`,
                  "DD/MM/yyyy",
                ).format("MMM")}
              </Typography>
              <Typography variant="subtitle2">
                {appointment.from?.dateYear}
              </Typography>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.data}>
              <Typography variant="subtitle2">
                {`Pac: ${fullName(appointment.customerData)}`}
              </Typography>
              <Typography className={classes.bold} variant="subtitle2">
                {appointment.preAppointmentData?.reason}
              </Typography>
              <div className={classes.row}>
                <Typography variant="subtitle2">
                  {`${STRINGS.generals.FIRST_CONSULT}: ${
                    appointment.isFirstTimeWithProfessional
                      ? STRINGS.generals.YES
                      : STRINGS.generals.NO
                  }`}
                </Typography>
              </div>
              <div className={classes.row}>
                <Typography variant="subtitle2">
                  {`${STRINGS.generals.HEALTH_CENTER}: ${
                    appointment.healthCenterData?.name
                      ? appointment.healthCenterData?.name
                      : ""
                  }`}
                </Typography>
              </div>
              <div className={classes.row}>
                <Typography variant="subtitle2">
                  {`${STRINGS.appointment.APPOINTMENT_REASON_PLACEHOLDER}: ${
                    appointment.record?.reason ? appointment.record?.reason : ""
                  }`}
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.time}>
            <Typography variant="subtitle2" className={classNameColor.color}>
              {moment(
                `${appointment.from?.timeHour}:${
                  appointment.from?.timeMinute || 0
                }`,
                "hh:mm",
              ).format("hh:mm A")}
              -
              {moment(
                `${appointment.to?.timeHour}:${
                  appointment.to?.timeMinute || 0
                }`,
                "hh:mm",
              ).format("hh:mm A")}
            </Typography>
          </div>
        </div>
      ) : (
        <div>
          <div className={classes.cont}>
            <div className={classes.container}>
              <div className={classes.date}>
                <Typography className={classes.bold} variant="h6">
                  {appointment.from?.dateDay}
                </Typography>
                <Typography className={classes.bold} variant="h6">
                  {moment()
                    .month(appointment.from?.dateMonth || 0)
                    .format("MMM")}
                </Typography>
                <Typography variant="subtitle2">
                  {appointment.from?.dateYear}
                </Typography>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className={classes.historyCardStyle} id="appointment-info">
                <span
                  id="date-patient-container"
                  className={classes.datePatientStyle}>
                  <Typography variant="subtitle2">
                    {`Pac: ${fullName(appointment.customerData)}`}
                  </Typography>
                  <Typography
                    id="appointment-time"
                    variant="subtitle2"
                    className={classes.historyHourStyle}>
                    {moment(
                      `${appointment.from?.timeHour}:${
                        appointment.from?.timeMinute || 0
                      }`,
                      "hh:mm",
                    ).format("hh:mm A")}
                  </Typography>
                </span>
                {appointment.record?.diagnoses && (
                  <Typography className={classes.bold} variant="subtitle2">
                    {`${STRINGS.appointment.DG}:`}
                  </Typography>
                )}
                {diagnosesMemo &&
                  diagnosesMemo.map((diagnostic, index) => (
                    <Typography
                      key={index.toString()}
                      variant="subtitle2"
                      id="diagnosis-text-wrapper">
                      {diagnostic.description}
                    </Typography>
                  ))}
                <div className={classes.treatment}>
                  {appointment?.prescriptions && (
                    <Typography className={classes.bold} variant="subtitle2">
                      {`${STRINGS.appointment.TTO}: `}
                    </Typography>
                  )}
                  {prescriptionMemo &&
                    prescriptionMemo?.map((a) => (
                      <Typography variant="subtitle2">
                        {a &&
                          `${a?.medicine ? `${a?.medicine},` : ""} ${
                            a?.doseMg ? `${a?.doseMg},` : ""
                          } ${a.presentation ? `${a.presentation},` : ""} ${
                            a.via ? `${a.via} ` : ""
                          } `}
                      </Typography>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </CardLayout>
  );
};

export default AppointmentCard;
