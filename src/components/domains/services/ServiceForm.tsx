import {
  createStyles,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { Field, FieldProps, Form, FormikProvider, useFormik } from "formik";
import React, { useMemo } from "react";
import * as Yup from "yup";
import { defaultIVAPercents } from "../../../utils/defaultData";
import STRINGS from "../../../utils/strings";
import PrimaryButton from "../../buttons/PrimaryButton";
import LoadingWrapper from "../../LoadingWrapper";

const serviceScheme = Yup.object().shape({
  name: Yup.string().required(STRINGS.error.NAME_REQUIRED),
  description: Yup.string().max(255, STRINGS.error.MAX_255_CHARACTERS),
});

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    },
    content: {
      display: "flex",
      flexWrap: "wrap",
    },
    actionSection: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      marginTop: theme.spacing(2),
      width: "100%",
    },
    textField: {
      minWidth: "290px",
    },

    textAreaField: {
      minWidth: "100%",
    },
    formInput: {
      margin: theme.spacing(1),
      maxWidth: "290px",
    },
    formInputMultiline: {
      margin: theme.spacing(1),
      maxWidth: "100%",
    },
    row: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    switch: {
      display: "flex",
      alignItems: "flex-start",
      margin: theme.spacing(1),
    },
  }),
);

interface Props {
  addingService: boolean;
  initialValues: Schemas.ProfessionalProductRequest;
  handleOnConfirm: (request: Schemas.ProfessionalProductRequest) => void;
  handleOnOpenModal: () => void;
}

export default function ServiceForm({
  addingService,
  initialValues,
  handleOnConfirm,
  handleOnOpenModal,
}: Props) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues,
    validationSchema: serviceScheme,
    onSubmit: (values) => {
      handleOnConfirm(values);
    },
  });
  const ivaPercents = useMemo(
    () => defaultIVAPercents.filter((iva) => iva.value !== "-1"),
    [],
  );
  const { errors, touched } = formik;
  return (
    <FormikProvider value={formik}>
      <Form className={classes.container}>
        <div className={classes.content}>
          <div>
            <div className={classes.row}>
              <div className={classes.formInput}>
                <Field name="name">
                  {({ field }: FieldProps) => (
                    <TextField
                      className={classes.textField}
                      variant="outlined"
                      size="small"
                      margin="dense"
                      placeholder={STRINGS.service.NAME}
                      {...field}
                      error={!!(errors.name && touched.name)}
                      label={
                        errors.name && touched.name
                          ? STRINGS.error.ERROR
                          : STRINGS.service.NAME
                      }
                      helperText={
                        errors.name && touched.name ? errors.name : ""
                      }
                    />
                  )}
                </Field>
              </div>
              <div className={classes.formInput}>
                <Field name="code">
                  {({ field }: FieldProps) => (
                    <TextField
                      className={classes.textField}
                      variant="outlined"
                      size="small"
                      margin="dense"
                      label={STRINGS.service.CODE}
                      placeholder={STRINGS.service.CODE}
                      {...field}
                    />
                  )}
                </Field>
              </div>
            </div>
            <div className={classes.row}>
              <div className={classes.formInput}>
                <Field name="basePrice">
                  {({ field }: FieldProps) => (
                    <TextField
                      className={classes.textField}
                      variant="outlined"
                      size="small"
                      margin="dense"
                      label={STRINGS.service.PRICE}
                      placeholder={STRINGS.service.PRICE}
                      {...field}
                    />
                  )}
                </Field>
              </div>
              <div className={classes.formInput}>
                <Field name="taxPercent">
                  {({ field }: FieldProps) => (
                    <TextField
                      id="percent"
                      className={classes.textField}
                      placeholder={STRINGS.service.PERCENT}
                      select
                      variant="outlined"
                      size="small"
                      margin="dense"
                      {...field}>
                      {ivaPercents.map((option, index) => (
                        <MenuItem
                          // eslint-disable-next-line react/no-array-index-key
                          key={index}
                          value={option.value}>
                          <Typography>{option.label}</Typography>
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Field>
              </div>
            </div>
            <div className={classes.formInputMultiline}>
              <Field name="description">
                {({ field }: FieldProps) => (
                  <TextField
                    className={classes.textAreaField}
                    variant="outlined"
                    size="small"
                    margin="dense"
                    placeholder={STRINGS.service.DESCRIPTION}
                    multiline
                    rows={4}
                    {...field}
                    error={!!(errors.description && touched.description)}
                    label={
                      errors.description && touched.description
                        ? STRINGS.error.ERROR
                        : STRINGS.service.DESCRIPTION
                    }
                    helperText={
                      errors.description && touched.description
                        ? errors.description
                        : ""
                    }
                  />
                )}
              </Field>
            </div>
            <div className={classes.actionSection}>
              <PrimaryButton
                label={STRINGS.generals.CANCEL}
                variant="text"
                color="primary"
                onClick={handleOnOpenModal}
              />
              <LoadingWrapper loading={addingService}>
                <PrimaryButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  label={STRINGS.generals.SAVE}
                  disabled={addingService}
                />
              </LoadingWrapper>
            </div>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
}
