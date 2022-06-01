import { makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import STRINGS from "../../../../../../utils/strings";
import MenstruationItemEditMode from "./MenstruacionItemEditMode";

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
  menstruationInputFieldTypeValue: string;
  menstruationInputFieldInfoValue: string;
  menstruationInputFieldInfo: string;
  inputPlaceholder: string;
  label: string;
  editMode?: boolean;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean | undefined,
  ) => void;
}

export default function MenstruationItem({
  menstruationInputFieldInfo,
  menstruationInputFieldTypeValue,
  menstruationInputFieldInfoValue,
  setFieldValue,
  editMode = false,
  inputPlaceholder,
  label,
}: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(
      "gynecology.menstruationType",
      (event.target as HTMLInputElement).value,
    );
  };
  const classes = styles();

  const renderShowMode = useCallback(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      menstruationInputFieldInfoValue ? (
        <div className={classes.container}>
          <Typography className={classes.title}>
            {STRINGS.background.MENSTRUATION_CHARACTERISTIC}
          </Typography>
          <Typography className={classes.subtitle}>
            {menstruationInputFieldTypeValue}
          </Typography>
          <Typography className={classes.description}>
            {menstruationInputFieldInfoValue}
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
      menstruationInputFieldInfoValue,
      menstruationInputFieldTypeValue,
    ],
  );

  return editMode ? (
    <MenstruationItemEditMode
      label={label}
      inputFieldName={menstruationInputFieldInfo}
      onRadioChecked={handleChange}
      placeHolder={inputPlaceholder}
      radioValue={menstruationInputFieldTypeValue}
    />
  ) : (
    renderShowMode()
  );
}
