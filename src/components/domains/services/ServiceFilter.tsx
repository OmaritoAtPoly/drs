import {
  createStyles,
  FormControlLabel,
  makeStyles,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { defaultIVAPercents } from "../../../utils/defaultData";
import STRINGS from "../../../utils/strings";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
    },
    formInput: {
      margin: theme.spacing(1),
      maxWidth: "200px",
    },
    textField: {
      minWidth: "200px",
    },
    switch: {
      display: "flex",
      alignItems: "flex-start",
      margin: theme.spacing(1),
    },
  }),
);

interface Props {
  active: boolean;
  taxPercent: string;
  handleOnActiveStatusChange: (value: boolean) => void;
  handleOnTaxChange: (value: string) => void;
  handleOnFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ServiceFilter({
  active,
  taxPercent,
  handleOnActiveStatusChange,
  handleOnTaxChange,
  handleOnFilterChange,
}: Props) {
  const [enabled, setEnabled] = useState<boolean>(active);
  const [tax, setTax] = useState<string>(taxPercent);

  const handleOnActive = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEnabled(event.target.checked);
      handleOnActiveStatusChange(event.target.checked);
    },
    [handleOnActiveStatusChange],
  );

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTax(event.target.value);
      handleOnTaxChange(event.target.value);
    },
    [handleOnTaxChange],
  );

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.formInput}>
        <TextField
          className={classes.textField}
          variant="outlined"
          size="small"
          margin="dense"
          onChange={handleOnFilterChange}
          label={STRINGS.service.FILTER_BY_NAME}
          placeholder={STRINGS.service.FILTER_BY_NAME}
        />
      </div>
      <div className={classes.formInput}>
        <TextField
          id="percent"
          className={classes.textField}
          placeholder={STRINGS.service.PERCENT}
          select
          variant="outlined"
          size="small"
          margin="dense"
          value={tax}
          onChange={handleOnChange}
          label={STRINGS.service.PERCENT}>
          {defaultIVAPercents.map((option, index) => (
            <MenuItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              value={option.value}>
              <Typography>{option.label}</Typography>
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className={classes.switch}>
        <FormControlLabel
          control={
            <Switch
              checked={enabled}
              onChange={handleOnActive}
              name="enabled"
              color="primary"
            />
          }
          label={STRINGS.service.ACTIVE}
        />
      </div>
    </div>
  );
}
