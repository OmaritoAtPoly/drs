import {
  CircularProgress,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      zIndex: 1,
      width: "100%",
      height: "70px",
      backgroundColor: theme.palette.common.white,
    },
    whiteFont: {
      color: theme.palette.text.primary,
    },
    boldFont: { fontWeight: "bold" },
    infoContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
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
  loading: boolean;
  label: string;
  editMode: boolean;
  handleOnClose: () => void;
  handleOnEdit: () => void;
}

export default function HeaderAppointmentDialog({
  loading,
  label,
  editMode,
  handleOnClose,
  handleOnEdit,
}: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {loading ? (
        <CircularProgress color="secondary" size={35} />
      ) : (
        <div className={classes.infoContainer}>
          <Typography className={classes.whiteFont} variant="h5">
            {STRINGS.appointment.ABSTRACT_APPOINTMENT}
          </Typography>
          <Typography className={`${classes.whiteFont} ${classes.boldFont}`}>
            {label}
          </Typography>
        </div>
      )}
      <div className={classes.action}>
        {!editMode && (
          <BadgedButton
            onClick={handleOnEdit}
            fill={theme.palette.primary.main}
            iconName="edit"
            iconWidth={15}
            iconHeight={15}
          />
        )}
        <BadgedButton
          onClick={handleOnClose}
          fill={theme.palette.error.dark}
          iconName="closeIcon"
          iconWidth={15}
          iconHeight={15}
        />
      </div>
    </div>
  );
}
