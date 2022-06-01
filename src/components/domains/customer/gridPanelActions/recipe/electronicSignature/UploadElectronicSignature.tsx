import { makeStyles, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";
import BadgedButton from "../../../../../buttons/BadgedButton";
import PrimaryButton from "../../../../../buttons/PrimaryButton";
import LoadingWrapper from "../../../../../LoadingWrapper";
import UploadElectronicSignatureFile from "./UploadElectronicSignatureFile";

interface Props {
  loading?: boolean;
  handleSubmitForm: (keyword:string) => void;
  onImportFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleShow: () => void;
  localBase64?: { base64: string, name: string };
  handleShowPassword: () => void;
  showPassword: boolean;
}

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
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
  submitButtonsStyle: {
    display: "flex",
  },
  textInputContainerStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  badgedButtonStyle: {
    display: "flex",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    marginLeft: "10px",
  },
});

const signupSchema = yup.object().shape({
    password: yup
    .string()
    .required(STRINGS.validation.FIELD_MANDATORY),
});

export default function UploadElectronicSignature({
  handleSubmitForm,
  loading = false,
  onImportFile,
  handleShow,
  localBase64,
  handleShowPassword,
  showPassword,
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
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: () => {
      handleSubmitForm(values.password);
    },
  });

  return (
    <div className={classes.container} id="add-assistant">
      <form className={classes.full} onSubmit={handleSubmit}>
        <div className={`${classes.formGroup}`} id="inputs-container">
          <div
            id="text-keyword-container"
            className={classes.textInputContainerStyle}>
            <TextField
              className={classes.full}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              label={
                errors.password && touched.password
                  ? STRINGS.error.ERROR
                  : STRINGS.recovery.SIGNATURE_KEYWORD
              }
              helperText={
                errors.password && touched.password
                  ? errors.password
                  : ""
              }
              placeholder={STRINGS.recovery.SIGNATURE_KEYWORD}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="outlined"
              margin="dense"
              autoComplete="new-password"
            />
            <BadgedButton
              iconName={showPassword ? "lock" : "openEye"}
              onClick={handleShowPassword}
              containerStyle={classes.badgedButtonStyle}
              iconWidth={
                showPassword ? theme.spacing(2.1) : theme.spacing(1.75)
              }
              iconHeight={
                showPassword ? theme.spacing(2.1) : theme.spacing(1.75)
              }
            />
          </div>
          <UploadElectronicSignatureFile
            loading={loading}
            onImportFile={onImportFile}
            localBase64={localBase64}
          />
        </div>
        <div className={classes.buttons}>
          <LoadingWrapper loading={loading}>
            <span id="button-container" className={classes.submitButtonsStyle}>
              <PrimaryButton
                label={STRINGS.generals.CLOSE}
                variant="text"
                color="primary"
                onClick={handleShow} />
              <PrimaryButton
                label={STRINGS.generals.SAVE}
                className={classes.primaryButton}
                variant="text"
                type="submit"
                color="primary" />
            </span>
          </LoadingWrapper>
        </div>
      </form>
    </div>
  );
}
