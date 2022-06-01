import {
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { oneLowerLetter, oneUpperLetter, onNumber, passwordLength } from "../../../../modules/utils/regExpCheker/RegExpChecker";
import STRINGS from "../../../../utils/strings";
import CheckBox from "../../../CheckBox";

const styles = makeStyles({
  container: {
    paddingBlock: "20px",
  },
  checkBoxLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

interface Props {
  password: string;
}

export default function PasswordRequirement({
  password,
}: Props) {
  const classes = styles();

  return (
    <div className={classes.container}>
      <div className={classes.checkBoxLabel} id="check-box-div">
        <CheckBox checked={oneLowerLetter(password)} />
        <Typography>{STRINGS.recovery.AT_LEAST_LOWERCASE}</Typography>
      </div>
      <div className={classes.checkBoxLabel}>
        <CheckBox checked={oneUpperLetter(password)} />
        <Typography>{STRINGS.recovery.AT_LEAST_UPPERCASE}</Typography>
      </div>
      <div className={classes.checkBoxLabel}>
        <CheckBox checked={!!onNumber(password)} />
        <Typography>{STRINGS.recovery.AT_LEAST_NUMBER}</Typography>
      </div>
      <div className={classes.checkBoxLabel}>
        <CheckBox checked={passwordLength(password)} />
        <Typography>{STRINGS.recovery.MIN_LENGTH}</Typography>
      </div>
    </div>
  );
}
