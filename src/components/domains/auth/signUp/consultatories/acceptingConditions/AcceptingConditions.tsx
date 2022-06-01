/* eslint-disable react/jsx-curly-newline */
import { Link, Checkbox, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";

interface Props {
  acceptedTerms: boolean;
  declareTruth: boolean;
  setFieldValue: (name: string, value: boolean) => void;
}

const styles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  divGroup: {
    display: "flex",
    alignItems: "center",
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  labelStyle: {
    color: theme.palette.primary.main,
  },
  infoStyle: {
    color: theme.palette.primary.main,
    textAlign: "justify",
    fontSize: 12,
    marginRight: 2.5,
  },
  link: {
    textDecorationLine: "underline",
    color: theme.palette.primary.main,
    textAlign: "justify",
    fontSize: 12,
    marginRight: 2.5,
  },
  term: {
    display: "flex",
    alignItems: "center",
    width: 400,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
});

const AcceptingConditions = ({
  acceptedTerms,
  declareTruth,
  setFieldValue,
}: Props) => {
  const classes = styles();

  const handleChange = useCallback(
    (name, value) => {
      setFieldValue(name, !value);
    },
    [setFieldValue],
  );

  return (
    <div className={classes.root} id="check-conditions-container">
      <div className={classes.divGroup}>
        <Checkbox
          color="primary"
          checked={acceptedTerms}
          onChange={() => handleChange("acceptedTerms", acceptedTerms)}
          name="acceptedTerms"
        />
        <span className={classes.term}>
          <Typography className={classes.infoStyle}>
            {STRINGS.signUp.ACCEPTED_TERMS_ONE}
          </Typography>
          <Link
            className={classes.link}
            target="_blank"
            href="https://ecliniq.com/terminos-y-condiciones/">
            {STRINGS.signUp.ACCEPTED_TERMS_TWO}
          </Link>
          <Typography className={classes.infoStyle}>
            {STRINGS.signUp.ACCEPTED_TERMS_THREE}
          </Typography>
        </span>
      </div>
      <div className={classes.divGroup}>
        <Checkbox
          color="primary"
          checked={declareTruth}
          onChange={() => handleChange("declareTruth", declareTruth)}
          name="declareTruth"
        />
        <span>
          <Typography className={classes.infoStyle}>
            {STRINGS.signUp.DECLARE_TRUTH}
          </Typography>
        </span>
      </div>
    </div>
  );
};

export default AcceptingConditions;
