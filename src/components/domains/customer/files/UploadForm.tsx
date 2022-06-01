import { Button, makeStyles, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import LoadingWrapper from "../../../LoadingWrapper";
import UploadFile from "./UploadFile";

interface Props {
  loading?: boolean;
  handleSubmitForm: (value: string) => void;
  onImportFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShow: () => void;
  localBase64?: Schemas.ResultFileRequest;
}

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  formGroup: {
    display: "flex",
  },
  full: {
    width: "100%",
  },
  primaryButton: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: theme.spacing(0.5),
  },
});

const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required(STRINGS.validation.NAME_MANDATORY)
    .min(3, STRINGS.signUp.MIN_LENGTH),
});

export default function UploadForm({
  handleSubmitForm,
  loading = false,
  onImportFile,
  handleShow,
  localBase64,
}: Props) {
  const classes = styles();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: signupSchema,
    onSubmit: (val, action) => {
      handleSubmitForm(values.name);
      action.resetForm();
    },
  });

  return (
    <div className={classes.container} id="add-assistant">
      <form className={classes.full} onSubmit={handleSubmit}>
        <div className={`${classes.formGroup} ${classes.full}`}>
          <TextField
            type="text"
            id="name"
            error={!!(errors.name && touched.name)}
            name="name"
            label={
              errors.name && touched.name
                ? STRINGS.error.ERROR
                : STRINGS.signupCustomer.NAME
            }
            helperText={errors.name && touched.name ? errors.name : ""}
            placeholder={STRINGS.signupCustomer.NAME}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="outlined"
            margin="dense"
          />
          <UploadFile
            loading={loading}
            onImportFile={onImportFile}
            localBase64={localBase64}
          />
        </div>
        <div className={classes.buttons}>
          <Button variant="text" color="primary" onClick={handleShow}>
            {STRINGS.generals.CLOSE}
          </Button>
          <LoadingWrapper loading={loading}>
            <Button
              className={classes.primaryButton}
              variant="text"
              type="submit"
              color="primary">
              {STRINGS.generals.SAVE}
            </Button>
          </LoadingWrapper>
        </div>
      </form>
    </div>
  );
}
