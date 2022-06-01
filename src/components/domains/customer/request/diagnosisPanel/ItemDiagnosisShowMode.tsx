/* eslint-disable react/jsx-one-expression-per-line */
import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../../utils/strings";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  diagnosisValueStyle: {
    marginRight: "32px",
    paddingBlock: "10px",
    fontWeight: "bold",
  },
  label: {
    marginRight: "32px",
    paddingBlock: "10px",
  },
  counterList: {
    width: "25px",
    paddingLeft: "10px",
  },
  note: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "37px",
  },
  labelNote: {
    fontSize: "0.9rem",
    marginLeft: "5px",
  },
});

interface Props {
  label: string;
  definitive?: boolean;
  index?: number;
  internCode?: string;
  notes?: string;
  withDefinitiveDiagnosis?: boolean;
}

const ItemDiagnosisShowMode = ({
  index = 0,
  label,
  definitive = false,
  internCode = undefined,
  notes = "",
  withDefinitiveDiagnosis = true,
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Typography className={classes.counterList}>
          {`${index + 1} -`}
        </Typography>
        {internCode && (
          <Typography
            id="diagnosis-code"
            className={classes.diagnosisValueStyle}>
            {`(${internCode})`}
          </Typography>
        )}
        <Typography id="diagnosis-value" className={classes.label}>
          {label}
        </Typography>
        <div className={classes.actionContainer}>
          {withDefinitiveDiagnosis && (
            <Typography>
              {definitive
                ? `Dg ${STRINGS.buttonGrid.DEFINITIVE}`
                : `Dg ${STRINGS.buttonGrid.PRESUMPTIVE}`}
            </Typography>
          )}
        </div>
      </div>
      {!!notes && (
        <div className={classes.note}>
          <Typography>{`${STRINGS.generals.NOTES}:`}</Typography>
          <Typography className={classes.labelNote}>{notes}</Typography>
        </div>
      )}
    </>
  );
};

export default ItemDiagnosisShowMode;
