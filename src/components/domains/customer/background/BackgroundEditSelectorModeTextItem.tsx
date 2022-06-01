import { makeStyles, TextareaAutosize, Theme } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab";
import { Field, FieldProps } from "formik";
import React, { useCallback } from "react";
import { defaultStyleTextArea } from "../../../../utils/defaultData";
import BadgedButton from "../../../buttons/BadgedButton";
import Autocomplete from "../../../inputs/Search/Autocomplete";

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
    minWidth: "200px",
  },
  selector: { width: "100%" },
  textArea: {
    height: theme.spacing(5),
    overflow: "hidden",
    border: "1px solid gray",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
  },
}));

interface Props {
  key?: string | number;
  index: number;
  selectorFieldName: string;
  inputFieldName: string;
  inputPlaceHolder: string;
  selectorPlaceHolder: string;

  handleRemove: (index: number) => void;
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  options: string[];
  enabled: boolean;
}

export default function BackgroundEditSelectorModeTextItem({
  key,
  index,
  selectorFieldName,
  inputFieldName,
  inputPlaceHolder,
  selectorPlaceHolder,
  setFieldValue,
  handleRemove,
  options,
  enabled,
}: Props) {
  const classes = styles();

  const handlePicked = (value: string) => {
    setFieldValue(`${selectorFieldName}`, value);
  };

  const onRemove = useCallback(() => {
    handleRemove(index);
  }, [handleRemove, index]);

  const pathologiesFilterOptions = createFilterOptions({
    stringify: (option: string) => option,
  });

  return (
    <div key={key} className={classes.content}>
      <div className={classes.leftColumn}>
        <BadgedButton onClick={onRemove} iconName="delete" />
        <Field name={`${selectorFieldName}`}>
          {({ field }: FieldProps) => (
            <Autocomplete
              className={classes.selector}
              options={options}
              getOptionLabel={(option: string) => option}
              filterOptions={pathologiesFilterOptions}
              freeSolo={false}
              autoComplete={false}
              notIcon
              value={field.value}
              onChange={handlePicked}
              inputProps={{
                autoComplete: "off",
                placeholder: selectorPlaceHolder,
              }}
            />
          )}
        </Field>
      </div>
      <Field name={`${inputFieldName}`} disable={enabled}>
        {({ field }: FieldProps) => (
          <TextareaAutosize
            className={classes.textArea}
            rowsMax={4}
            placeholder={inputPlaceHolder}
            style={defaultStyleTextArea}
            {...field}
            disabled={enabled}
          />
        )}
      </Field>
    </div>
  );
}
