import { makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import useProfileCacheSelector from "../../../../modules/profile/cacheSelector";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";
import CardLayout from "../../../cards/CardLayout";
import LabeledDialog from "../../../dialogs/LabeledDialog";

interface Props {
  open: boolean;
  handleShow: () => void;
  onBegin: (reason: string[]) => void;
  lastAppointmentsReasons: { label: string; checked: boolean; id: number }[];
}

const styles = makeStyles((theme: Theme) => ({
  flex: { display: "flex" },
  container: {
    justifyContent: "space-between",
  },
  containerCard: {
    justifyContent: "flex-start",
    marginTop: 5,
  },
  card: {
    minWidth: 150,
    justifyContent: "center",
    padding: 15,
  },
  checked: {
    backgroundColor: "#7ED957",
    width: "23%",
    marginLeft: 2.5,
    marginRight: 2.5,
  },
  unchecked: {
    backgroundColor: theme.palette.common.white,
    width: "23%",
    marginLeft: 2.5,
    marginRight: 2.5,
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  cancelButton: {
    color: theme.palette.primary.main,
    textDecoration: "underline",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  full: {
    width: "100%",
  },
}));

export default function NewConsultDialog({
  open,
  handleShow,
  onBegin,
  lastAppointmentsReasons,
}: Props) {
  const classes = styles();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      reasonTexField: "",
      reasonShortcut: lastAppointmentsReasons,
    },
    enableReinitialize: true,
    onSubmit: () => {},
  });

  const { isAssistant } = useProfileCacheSelector();
  const onReasonClick = useCallback(
    ({ id }) => () => {
      values.reasonShortcut.forEach((e, i) => {
        if (e.id === id) {
          setFieldValue(
            `reasonShortcut[${i}].checked`,
            !values.reasonShortcut[i].checked,
            true,
          );
        }
      });
    },
    [setFieldValue, values.reasonShortcut],
  );

  const renderReasonShortcut = useCallback(
    ({ label, checked, id }) => (
      <CardLayout
        key={id}
        onClick={onReasonClick({ label, checked, id })}
        className={`${checked ? classes.checked : classes.unchecked} ${
          classes.card
        }`}>
        <Typography>{label}</Typography>
      </CardLayout>
    ),
    [classes.card, classes.checked, classes.unchecked, onReasonClick],
  );

  const onBeginCallBack = useCallback(() => {
    const args = values.reasonTexField
      ? [
          ...values.reasonShortcut,
          { label: values.reasonTexField, checked: true },
        ]
      : values.reasonShortcut;
    onBegin(args.filter((e) => e.checked === true).map((e) => e.label));
  }, [onBegin, values.reasonShortcut, values.reasonTexField]);

  return (
    <LabeledDialog
      label={STRINGS.interconsult.NEW_CONSULT}
      actionPanel={<></>}
      open={open}
      contentClassName={classes.container}
      handleShow={handleShow}>
      <TextField
        type="text"
        id="reason"
        name="reasonTexField"
        className={classes.full}
        error={!!(errors.reasonTexField && touched.reasonTexField)}
        helperText={
          errors.reasonTexField && touched.reasonTexField
            ? errors.reasonTexField
            : ""
        }
        placeholder={STRINGS.newConsult.WRITE_CONSULT_REASON}
        value={values.reasonTexField}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        margin="dense"
      />
      <div className={`${classes.flex} ${classes.containerCard}`}>
        {values.reasonShortcut.map((r) => renderReasonShortcut(r))}
      </div>
      <div className={classes.buttonContainer}>
        <PrimaryButton
          variant="text"
          className={classes.cancelButton}
          label={STRINGS.generals.CANCEL}
          onClick={handleShow}
          disabled={isAssistant()}
        />
        <PrimaryButton
          variant="contained"
          className={classes.button}
          label={STRINGS.generals.BEGIN}
          onClick={onBeginCallBack}
          disabled={isAssistant()}
        />
      </div>
    </LabeledDialog>
  );
}
