import {
  makeStyles,
  TextareaAutosize,
  TextField,
  Theme,
} from "@material-ui/core";
import { Field, FieldProps } from "formik";
import React, { useCallback } from "react";
import { defaultStyleTextArea } from "../../../../utils/defaultData";
import BadgedButton from "../../../buttons/BadgedButton";

const styles = makeStyles((theme: Theme) => ({
  content: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: theme.spacing(2),
  },
  leftColumn: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
  textArea: {
    height: theme.spacing(5),
    overflow: "hidden",
    border: "1px solid gray",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
  },
  input: {
    width: 200,
  },
}));

interface Props {
  key?: string | number;
  index: number;
  inputFieldNameFirst: string;
  inputFieldNameFirstPlaceholder?: string;
  inputFieldNameSecond: string;
  inputPlaceHolder: string;
  handleRemove: (index: number) => void;
  enabled: boolean;
}

export default function BackgroundEditModeTextItem({
  key,
  index,
  inputFieldNameFirst,
  inputFieldNameFirstPlaceholder,
  inputFieldNameSecond,
  inputPlaceHolder,
  handleRemove,
  enabled,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classes = styles();

  const onRemove = useCallback(() => {
    handleRemove(index);
  }, [handleRemove, index]);

  return (
    <div key={key} className={classes.content}>
      <div className={classes.leftColumn}>
        <BadgedButton onClick={onRemove} iconName="delete" />
        <Field name={`${inputFieldNameFirst}`}>
          {({ field }: FieldProps) => (
            <TextField
              placeholder={
                inputFieldNameFirstPlaceholder || "Escribe la patología aquí"
              }
              variant="outlined"
              margin="dense"
              {...field}
              disabled={enabled}
              className={classes.input}
            />
          )}
        </Field>
      </div>
      <Field name={`${inputFieldNameSecond}`}>
        {({ field }: FieldProps) => (
          <TextareaAutosize
            className={classes.textArea}
            rowsMax={4}
            style={defaultStyleTextArea}
            placeholder={inputPlaceHolder}
            {...field}
            disabled={enabled}
          />
        )}
      </Field>
    </div>
  );
}
