/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  createStyles,
  InputBase,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Field, FieldProps, Form, FormikProvider, useFormik } from "formik";
import { debounce as debounceLodash } from "lodash";
import React, { ChangeEvent, useCallback, useEffect, useMemo } from "react";
import STRINGS from "../../../../../utils/strings";
import CardLayout from "../../../../cards/CardLayout";
import LoadingWrapper from "../../../../LoadingWrapper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
      padding: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    infoSection: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    textArea: {
      width: "100%",
      backgroundAttachment: "local",
      backgroundImage:
        "repeating-linear-gradient(white, white 31px, #D6E3F3 31px, #D6E3F3 31px, white 32px)",
      lineHeight: "31px",
    },
    subtitle: {
      fontSize: "12px",
      color: "#828282",
    },
    actionButtonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      width: "100%",
    },
  }),
);

interface Props {
  loading: boolean;
  notes: string;
  handleUpdateNotes: (notes: string) => void;
}

export default function NotesPanel({
  loading,
  notes,
  handleUpdateNotes,
}: Props) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      notes,
    },
    onSubmit: () => {
      handleUpdateNotes(formik.values.notes);
    },
  });

  const handleMutate = useCallback(() => {
    handleUpdateNotes(formik.values.notes);
  }, [formik.values.notes, handleUpdateNotes]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedUpdate = useCallback(debounceLodash(handleMutate, 500), [
    handleMutate,
  ]);

  useEffect(() => {
    delayedUpdate();

    return delayedUpdate.cancel;
  }, [delayedUpdate, formik.values.notes]);

  return (
    <CardLayout className={classes.container}>
      <div className={classes.infoSection}>
        <Typography>{STRINGS.generals.NOTES}</Typography>
        <Typography className={classes.subtitle}>
          {STRINGS.generals.PATIENT_INFO_VISIBILITY_SCOPE}
        </Typography>
      </div>
      <FormikProvider value={formik}>
        <Form className={classes.form}>
          <Field name="notes">
            {({ field }: FieldProps) => (
              <InputBase
                className={classes.textArea}
                {...field}
                multiline
                rows={6}
              />
            )}
          </Field>
          <div className={classes.actionButtonContainer}>
            <LoadingWrapper loading={loading}>
              <Button
                variant="text"
                color="primary"
                type="submit"
                disabled={loading}>
                {STRINGS.generals.SAVE}
              </Button>
            </LoadingWrapper>
          </div>
        </Form>
      </FormikProvider>
    </CardLayout>
  );
}
