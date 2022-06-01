/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  createStyles,
  InputBase,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../../utils/strings";
import CardLayout from "../../../../cards/CardLayout";
import LoadingWrapper from "../../../../LoadingWrapper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      padding: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    infoSection: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    textArea: {
      width: "100%",
      backgroundAttachment: "local",
      backgroundImage:
        "repeating-linear-gradient(white, white 31px, #D6E3F3 31px, #D6E3F3 31px, white 32px)",
      lineHeight: "31px",
    },
    subtitle: {
      fontSize: "12px",
      color: "#828282",
    },
    actionButtonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
    },
  }),
);

interface Props {
  loading: boolean;
}

export default function LoadingNotesPanel({ loading }: Props) {
  const classes = useStyles();

  return (
    <CardLayout className={classes.container}>
      <div className={classes.infoSection}>
        <Typography>{STRINGS.generals.NOTES}</Typography>
        <Typography className={classes.subtitle}>
          {STRINGS.generals.PATIENT_INFO_VISIBILITY_SCOPE}
        </Typography>
      </div>
      <div className={classes.form}>
        <InputBase
          className={classes.textArea}
          multiline
          rows={6}
          disabled={loading}
        />
        <div className={classes.actionButtonContainer}>
          <LoadingWrapper loading={loading}>
            <Button
              variant="text"
              color="primary"
              type="submit"
              disabled={loading}>
              {STRINGS.generals.SAVE}
            </Button>
          </LoadingWrapper>
        </div>
      </div>
    </CardLayout>
  );
}
