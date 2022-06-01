/* eslint-disable react/jsx-one-expression-per-line */
import {
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useMemo, useState } from "react";
import STRINGS from "../../../../../utils/strings";
import ActionPanel from "../ActionPanel";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textAreaContainer: {
    display: "flex",
    padding: "5px",
  },
  diagnosisValueStyle: {
    width: "60%",
    paddingBlock: "10px",
  },
  counterList: {
    width: "25px",
    paddingLeft: "10px",
  },
  code: {
    marginRight: "16px",
  },
});
const styleTextArea = { height: "150px", width: "100%", borderRadius: "8px" };

interface Props {
  label: string;
  onDelete: (code: string) => void;
  onChangeDiagnosisType: (index: number, type: string) => void;
  onChangeNotes: (index: number, notes: string) => void;
  notes: string;
  definitive?: boolean;
  index?: number;
  code: string;
  readOnly?: boolean;
  withDefinitiveDiagnosis: boolean;
  withComment: boolean;
}

const ItemDiagnosis = ({
  index = 0,
  label,
  onDelete,
  onChangeDiagnosisType,
  onChangeNotes,
  notes,
  definitive,
  code,
  readOnly = false,
  withDefinitiveDiagnosis,
  withComment,
}: Props) => {
  const classes = useStyles();
  const [text, showText] = useState<boolean>(false);

  const handleOnText = useCallback(() => {
    showText(!text);
  }, [text]);

  const handleOnDelete = useCallback(() => {
    onDelete(code);
  }, [code, onDelete]);

  const handleOnTypeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeDiagnosisType(index, (event.target as HTMLInputElement).value);
    },
    [index, onChangeDiagnosisType],
  );

  const handleOnChangeNotes = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChangeNotes(index, (event.target as HTMLTextAreaElement).value);
    },
    [index, onChangeNotes],
  );

  const diagnosisType = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      definitive
        ? STRINGS.buttonGrid.DEFINITIVE
        : STRINGS.buttonGrid.PRESUMPTIVE,
    [definitive],
  );

  return (
    <div>
      <div className={classes.root}>
        <Typography className={classes.counterList}>{index + 1} - </Typography>
        {code && (
          <Typography className={classes.code}>{`(${code})`} </Typography>
        )}
        <Typography
          id="diagnosis-value"
          className={classes.diagnosisValueStyle}>
          {label}
        </Typography>

        <div className={classes.actionContainer}>
          {withDefinitiveDiagnosis &&
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={diagnosisType}
              defaultValue={diagnosisType}
              onChange={handleOnTypeChange}>
              <FormControlLabel
                control={<Radio color="primary" />}
                value={STRINGS.buttonGrid.PRESUMPTIVE}
                label={STRINGS.buttonGrid.PRESUMPTIVE}
                labelPlacement="start"
                disabled={readOnly}
              />
              <FormControlLabel
                control={<Radio color="primary" />}
                value={STRINGS.buttonGrid.DEFINITIVE}
                label={STRINGS.buttonGrid.DEFINITIVE}
                labelPlacement="start"
                disabled={readOnly}
              />
            </RadioGroup>
          </FormControl>}

          {!readOnly && (
            <ActionPanel
              onDelete={handleOnDelete}
              handleOnText={handleOnText}
              withComment={withComment}
            />
          )}
        </div>
      </div>
      {text && (
        <div className={classes.textAreaContainer}>
          <TextareaAutosize
            rowsMax={4}
            style={styleTextArea}
            onChange={handleOnChangeNotes}
            value={notes}
          />
        </div>
      )}
    </div>
  );
};

export default ItemDiagnosis;
