import { makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import STRINGS from "../../../../../../utils/strings";
import ContraceptiveItemEditMode from "./ContraceptiveItemEditMode";

const styles = makeStyles((theme: Theme) => ({
  container: {
    width: "232px",
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  title: { fontWeight: "bold" },
  subtitle: {
    textDecoration: "underline",
  },
  description: {
    textAlign: "justify",
  },
}));

interface Props {
  contraceptiveInputFieldInfoTypeValue: string;
  contraceptiveInputFieldInfo: string;
  contraceptiveInputFieldInfoValue: string;
  contraceptiveInputFieldType: string;
  inputPlaceholder: string;
  label: string;
  editMode?: boolean;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean | undefined,
  ) => void;
}

export default function ContraceptiveItem({
  contraceptiveInputFieldInfo,
  contraceptiveInputFieldInfoTypeValue,
  contraceptiveInputFieldType,
  contraceptiveInputFieldInfoValue,
  setFieldValue,
  editMode = false,
  inputPlaceholder,
  label,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(
      contraceptiveInputFieldType,
      (event.target as HTMLInputElement).value,
    );
  };
  const classes = styles();

  const renderShowMode = useCallback(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      contraceptiveInputFieldInfoValue ? (
        <div className={classes.container}>
          <Typography className={classes.title}>
            {STRINGS.background.CONTRACEPTIVE_METHOD}
          </Typography>
          <Typography className={classes.subtitle}>
            {contraceptiveInputFieldInfoTypeValue}
          </Typography>
          <Typography className={classes.description}>
            {contraceptiveInputFieldInfoValue}
          </Typography>
        </div>
      ) : (
        <div />
      ),
    [
      classes.container,
      classes.description,
      classes.subtitle,
      classes.title,
      contraceptiveInputFieldInfoTypeValue,
      contraceptiveInputFieldInfoValue,
    ],
  );

  return editMode ? (
    <ContraceptiveItemEditMode
      placeHolder={inputPlaceholder}
      label={label}
      checkedValue={contraceptiveInputFieldInfoTypeValue}
      inputFieldName={contraceptiveInputFieldInfo}
      onChecked={handleChange}
    />
  ) : (
    renderShowMode()
  );
}
