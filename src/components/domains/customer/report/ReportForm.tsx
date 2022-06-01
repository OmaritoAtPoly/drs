import { makeStyles } from "@material-ui/core";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useCallback } from "react";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";
import Editor from "../../../inputs/Editor";

interface Props {
  initialData: Schemas.ReportResponse;
  handleSubmit: (values: Schemas.ReportRequest) => void;
  handleShow: () => void;
  loadingReport?: boolean;
}

const styles = makeStyles({
  editorSection: {
    paddingBlock: theme.spacing(2),
  },
  formContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  actionSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  saveButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default function ReportForm({
  loadingReport,
  handleSubmit,
  handleShow,
  initialData: initialValues,
}: Props) {
  const classes = styles();
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true,
  });
  const { values, setFieldValue } = formik;

  const onEditorStateChange = useCallback(
    (value: string) => {
      setFieldValue("details[0]", value);
    },
    [setFieldValue],
  );

  return (
    <FormikProvider value={formik}>
      <Form className={classes.formContainer}>
        <div>
          <Editor
            minEditorHeight={theme.spacing(20)}
            onHtmlValueChange={onEditorStateChange}
            htmlValue={
              values.details && values.details.length
                ? values.details[0]
                : undefined
            }
          />
        </div>
        <div className={classes.actionSection}>
          <PrimaryButton
            label={STRINGS.generals.CANCEL}
            color="primary"
            variant="text"
            onClick={handleShow}
          />
          <PrimaryButton
            className={classes.saveButton}
            label={STRINGS.generals.FINISH}
            type="submit"
            color="primary"
            variant="text"
            loading={loadingReport}
          />
        </div>
      </Form>
    </FormikProvider>
  );
}
