import { makeStyles, Typography } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import useAvailabilityGridViewUtils from "../../../../modules/utils/gridViewUitls";
import theme from "../../../../styles/theme";
import { getDayName } from "../../../../utils/date";
import STRINGS from "../../../../utils/strings";
import { AvailabilityGridItem } from "../../../../utils/types";
import Avatar from "../../../Avatar";
import PrimaryButton from "../../../buttons/PrimaryButton";
import DatePicker from "../../../inputs/DatePicker";
import LoadingWrapper from "../../../LoadingWrapper";
import UnlockGrid from "./UnlockGrid";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  scroll: {
    width: "100%",
    maxHeight: "300px",
    overflowX: "scroll",
    marginBottom: theme.spacing(2),
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
  healthCenterPanel: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  scheduleInfo: {
    textAlign: "center",
    maxWidth: "400px",
    margin: theme.spacing(2),
  },
  formContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  formItem: {
    width: "50%",
    margin: theme.spacing(1),
    alignSelf: "center",
  },
  label: {
    marginTop: theme.spacing(1),
  },
  gridHead: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  dayInfo: {
    fontWeight: "bold",
    width: "50%",
  },
  actionSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
});

interface Props {
  healthCenter: Schemas.ProfessionalHealthCenterResponse;
  currentProfessional: Schemas.ProfessionalData;
  loadingProfessional: boolean;
  enablingSchedule: boolean;
  pickedDate: Date;
  preparedWeekGrid: AvailabilityGridItem[][];
  loadingConfiguration: boolean;
  handleOnEnableSchedule: (
    startIntervalTime: AvailabilityGridItem,
    endIntervalTime?: AvailabilityGridItem,
  ) => void;
  handleOnPickedDate: (date?: Date) => void;
  handleShow: () => void;
}

export default function UnlockSchedule({
  currentProfessional,
  healthCenter,
  loadingProfessional,
  enablingSchedule,
  pickedDate,
  preparedWeekGrid,
  loadingConfiguration,
  handleOnEnableSchedule,
  handleOnPickedDate,
  handleShow,
}: Props) {
  const classes = useStyles();
  const {
    grid,
    startIntervalTime,
    endIntervalTime,
    handleInitGrid,
    handleOnCellClicked,
  } = useAvailabilityGridViewUtils([]);

  const handleOnSubmit = useCallback(() => {
    startIntervalTime &&
      handleOnEnableSchedule(startIntervalTime, endIntervalTime);
  }, [endIntervalTime, handleOnEnableSchedule, startIntervalTime]);

  useEffect(() => {
    handleInitGrid(preparedWeekGrid);
  }, [handleInitGrid, preparedWeekGrid]);

  return (
    <div className={classes.container}>
      <div className={classes.avatarContainer}>
        <Avatar
          src={currentProfessional.avatarUrl}
          loading={loadingProfessional}
          className={classes.avatar}
        />
        <Typography variant="h5">
          {`Dr. ${currentProfessional.firstName} ${currentProfessional.firstFamilyName}`}
        </Typography>
      </div>
      <Typography className={classes.scheduleInfo}>
        {STRINGS.appointment.AVAILABILITY_SCHEDULE_INFO}
      </Typography>
      <div className={classes.healthCenterPanel}>
        <Typography className={classes.font}>
          {`${healthCenter?.name || ""} | ${healthCenter?.address || ""}`}
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.formItem}>
          <Typography className={classes.label}>
            {STRINGS.appointment.DATE_TO_AVAILABLE}
          </Typography>
          <DatePicker date={pickedDate} handleDateChange={handleOnPickedDate} />
        </div>
        <div className={classes.gridHead}>
          <Typography className={classes.dayInfo}>
            {STRINGS.appointment.TIME_TO_AVAILABLE}
          </Typography>
          <Typography className={classes.dayInfo}>
            {getDayName(pickedDate)}
          </Typography>
        </div>
        <UnlockGrid
          loading={loadingConfiguration}
          unlockGrid={grid}
          handleOnCellClicked={handleOnCellClicked}
        />
        <div className={classes.actionSection}>
          <PrimaryButton
            label={STRINGS.generals.CANCEL}
            variant="text"
            color="primary"
            onClick={handleShow}
          />
          <LoadingWrapper loading={enablingSchedule}>
            <PrimaryButton
              variant="contained"
              color="primary"
              label={STRINGS.generals.SAVE}
              onClick={handleOnSubmit}
              disabled={enablingSchedule || !startIntervalTime}
            />
          </LoadingWrapper>
        </div>
      </div>
    </div>
  );
}
