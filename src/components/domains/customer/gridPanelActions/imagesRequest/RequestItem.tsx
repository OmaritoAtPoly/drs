import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import CardLayout from "../../../../cards/CardLayout";
import EditAndDelete from "./EditAndDelete";

interface Props {
  label: string;
  onDelete: () => void;
  index?: number;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "50%",
  },
  radioAndDeletewrapper: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  diagnosisValueStyle: {
    paddingBlock: "10px",
    width: "100%",
  },
  quantityCardStyle: {
    width: "30px",
    height: "30px",
    justifyContent: "center",
    alignItems: "center",
  },
  counterList: {
    width: "30px",
    paddingLeft: "10px",
  },
});

const RequestItem = ({ label, onDelete, index = 0 }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.counterList}>
        {index + 1}
        {" "}
        -
        {" "}
      </Typography>
      <Typography id="request-value" className={classes.diagnosisValueStyle}>{label}</Typography>
      <div className={classes.radioAndDeletewrapper}>
        <CardLayout id="quantityCardStyle" className={classes.quantityCardStyle}>{1}</CardLayout>
        <EditAndDelete onDelete={onDelete} />
      </div>
    </div>);
};

export default RequestItem;
