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
  code: {
    paddingBlock: "10px",
    marginRight: "16px",
    fontWeight: "bold",
  },
  label: {
    paddingBlock: "10px",
    marginRight: "32px",
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
  amount: number;
  index?: number;
  internCode?: string;
  notes?: string;
}

const ItemRequestShowMode = ({
  index = 0,
  label,
  amount,
  internCode = undefined,
  notes = "",
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Typography className={classes.counterList}>
          {`${index + 1} -`}
        </Typography>
        <Typography id="request-item-code" className={classes.code}>
          {internCode || ""}
        </Typography>
        <Typography id="request-item-value" className={classes.label}>
          {label}
        </Typography>
        <div className={classes.actionContainer}>
          <Typography>{amount}</Typography>
        </div>
      </div>
      {!!notes && (
        <div className={classes.note}>
          <Typography>{`${STRINGS.generals.NOTES}: `}</Typography>
          <Typography className={classes.labelNote}>{notes}</Typography>
        </div>
      )}
    </>
  );
};

export default ItemRequestShowMode;
