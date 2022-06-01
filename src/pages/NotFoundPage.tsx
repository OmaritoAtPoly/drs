import { makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import drRoundLogo from "../assert/dr_round_logo.png";
import PrimaryButton from "../components/buttons/PrimaryButton";
import STRINGS from "../utils/strings";

const styles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
    },
  },
  content: {
    display: "flex",
    flexDirection: "column",
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  formGroup: {
    display: "flex",
    justifyContent: "center",
    marginTop: 50,
  },
  logo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginLeft: 2,
      marginRight: 2,
    },
  },
  roundIconStyle: {
    width: theme.spacing(12),
    paddingBottom: theme.spacing(3),
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    width: 150,
  },
  label: {
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
  },
}));

export default function NotFoundPage() {
  const classes = styles();
  const { push } = useHistory();

  const goToHome = useCallback(() => {
    push("/");
  }, [push]);

  const goToLogin = useCallback(() => {
    push("/login");
  }, [push]);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.logo}>
          <img
            src={drRoundLogo}
            alt="magenta-logo"
            className={classes.roundIconStyle}
          />
        </div>
        <Typography className={classes.label}>
          {STRINGS.generals.NOT_FOUND_PAGE}
        </Typography>
        <div className={classes.formGroup}>
          <PrimaryButton
            variant="contained"
            className={classes.button}
            label={STRINGS.generals.LOGIN}
            onClick={goToLogin}
          />
          <PrimaryButton
            variant="contained"
            className={classes.button}
            label={STRINGS.generals.HOME}
            onClick={goToHome}
          />
        </div>
      </div>
    </div>
  );
}
