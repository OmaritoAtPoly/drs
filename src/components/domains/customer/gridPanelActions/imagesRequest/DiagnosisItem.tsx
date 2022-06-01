import { FormControl, FormControlLabel, makeStyles, Radio, RadioGroup, Typography } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../../utils/strings";
import EditAndDelete from "./EditAndDelete";

interface Props {
  label: string;
  onDelete: () => void;
  diagnosisType?: string;
  index?: number;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioAndDeletewrapper: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-around",
  },
  diagnosisValueStyle: {
    width: "60%",
    paddingBlock: "10px",
  },
  counterList: {
    width: "25px",
    paddingLeft: "10px",
  },
});

const DiagnosisItem = ({ index = 0, label, onDelete, diagnosisType = "" }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.counterList}>
        {index + 1}
        {" "}
        -
        {" "}
      </Typography>
      <Typography id="diagnosis-value" className={classes.diagnosisValueStyle}>{label}</Typography>
      <div className={classes.radioAndDeletewrapper}>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="position" name="position" defaultValue={diagnosisType}>
            <FormControlLabel
              value={STRINGS.buttonGrid.PRESUMPTIVE}
              control={<Radio color="primary" onClick={() => { }} />}
              label={STRINGS.buttonGrid.PRESUMPTIVE}
              labelPlacement="start"
            />
            <FormControlLabel
              value={STRINGS.buttonGrid.DEFINITIVE}
              control={<Radio color="primary" />}
              label={STRINGS.buttonGrid.DEFINITIVE}
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
        <EditAndDelete onDelete={onDelete} />
      </div>
    </div>);
};

export default DiagnosisItem;
