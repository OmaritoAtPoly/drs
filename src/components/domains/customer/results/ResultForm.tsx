import { makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import { useAddLastAlerts } from "../../../../modules/utils/error/handleError";
import theme from "../../../../styles/theme";
import { RequestType } from "../../../../utils/enums";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";
import PrimaryButton from "../../../buttons/PrimaryButton";
import LabeledDialog from "../../../dialogs/LabeledDialog";
import Editor from "../../../inputs/Editor";
import DiagnosisPanelContainer from "../request/diagnosisPanel/DiagnosisPanelContainer";

// eslint-disable-next-line @typescript-eslint/no-shadow
const styles = makeStyles((theme: Theme) => ({
  requestPanelContainer: {
    width: "90%",
    marginRight: theme.spacing(1),
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
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
  row: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(0.5),
  },
  column: {
    maxWidth: "50%",
  },
  editorContainer: {
    margin: theme.spacing(0.5),
    width: "100%",
  },
  typography: {
    paddingBlock: theme.spacing(1),
    fontWeight: "bold",
  },
}));

interface Props {
  openAddResult?: boolean;
  loadingNewResult?: boolean;
  handleAddResult: (
    value: {
      requestType: RequestType;
    } & Schemas.ResultFileRequest,
  ) => void;
  historyResult: () => void;
  initialData: Schemas.ResultResponse;
  handleOpenAddResult: () => void;
  handleCloseForm: () => void;
}

export default function ResultForm({
  openAddResult,
  loadingNewResult,
  handleAddResult,
  historyResult,
  initialData,
  handleCloseForm,
  handleOpenAddResult,
}: Props) {
  const classes = styles();
  const { addLastAlerts } = useAddLastAlerts();

  const handleShowAlert = useCallback(
    (alertMessage: string) => {
      addLastAlerts({ name: "", message: alertMessage, severity: "error" });
    },
    [addLastAlerts],
  );

  const validateForm = useCallback(
    (
      title: string,
      description: string,
      observation: string,
      analysis: string,
    ) => {
      if (title === "") {
        handleShowAlert(STRINGS.validation.TITLE_RESULT_REQUIRED);
        return false;
      }
      if (description === "") {
        handleShowAlert(STRINGS.validation.DESCRIPTION_RESULT_REQUIRED);
        return false;
      }
      if (analysis === "") {
        handleShowAlert(STRINGS.validation.ANALYSIS_RESULT_REQUIRED);
        return false;
      }
      if (observation === "") {
        handleShowAlert(STRINGS.validation.OBSERVATION_RESULT_REQUIRED);
        return false;
      }
      return true;
    },
    [handleShowAlert],
  );

  const {
    values,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      analysis: (initialData.items && initialData.items[0].analysis) || "",
      base64: "",
      description:
        (initialData.items && initialData.items[0].description) || "",
      diagnoses: (initialData.items && initialData.items[0].diagnoses) || [],
      name: "",
      observations:
        (initialData.items && initialData.items[0].observations) || "",
      requestName: "",
      requestType: undefined as RequestType,
      title: (initialData.items && initialData.items[0].title) || "",
    },
    onSubmit: (val) => {
      if (
        validateForm(val.title, val.description, val.observations, val.analysis)
      ) {
        handleAddResult(val);
        resetForm();
      }
    },
  });

  const handleAddDiagnoses = useCallback(
    (diagnose: Schemas.Diagnose) => {
      const diagnosisList = values.diagnoses ? [...values.diagnoses] : [];
      if (diagnose) {
        diagnosisList.push({
          code: diagnose.code || "",
          definitive: diagnose.definitive,
          description: diagnose.description,
          notes: diagnose.notes,
        });
        setFieldValue("diagnoses", diagnosisList);
      }
    },
    [setFieldValue, values.diagnoses],
  );

  const handleDeleteDiagnosis = useCallback(
    (index: number) => {
      const newDiagnosisList = [...(values.diagnoses || [])];
      newDiagnosisList?.splice(index, 1);
      setFieldValue("diagnoses", newDiagnosisList);
    },
    [setFieldValue, values.diagnoses],
  );

  const handleOnChangeDiagnosesType = useCallback(
    (index: number, value: string) => {
      const definitive = value === "Definitivo";
      setFieldValue(`diagnoses[${index}].definitive`, definitive);
    },
    [setFieldValue],
  );

  const handleOnNotesChange = useCallback(
    (index: number, value: string) => {
      setFieldValue(`diagnoses[${index}].notes`, value);
    },
    [setFieldValue],
  );

  const onEditorChange = useCallback(
    (field: string, value: string) => {
      setFieldValue(field, value);
    },
    [setFieldValue],
  );

  return (
    <>
      {openAddResult && (
        <LabeledDialog
          label={STRINGS.result.ADD_RESULT}
          open={openAddResult || false}
          handleShow={handleOpenAddResult}
          actionPanel={
            <div>
              <BadgedButton
                onClick={historyResult}
                iconName="timeBack"
                fill={theme.palette.primary.main}
                iconWidth={15}
                iconHeight={15}
              />
              <BadgedButton
                onClick={handleCloseForm}
                iconName="closeIcon"
                iconWidth={15}
                iconHeight={15}
              />
            </div>
          }>
          <form onSubmit={handleSubmit}>
            <div className={classes.formGroup}>
              <TextField
                id="title"
                name="title"
                label={STRINGS.result.RESULT_TYPE}
                placeholder={STRINGS.result.RESULT_TYPE}
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                margin="dense"
              />
            </div>
            <DiagnosisPanelContainer
              diagnosisList={values.diagnoses}
              onAddDiagnosis={handleAddDiagnoses}
              onDeleteDiagnosis={handleDeleteDiagnosis}
              onChangeDiagnosisType={handleOnChangeDiagnosesType}
              onChangeNotes={handleOnNotesChange}
            />
            <div className={classes.row}>
              <div className={classes.editorContainer}>
                <Typography className={classes.typography}>
                  {STRINGS.result.DESCRIPTION}
                </Typography>
                <Editor
                  minEditorHeight={376}
                  htmlValue={values.description}
                  onHtmlValueChange={(value) => {
                    onEditorChange("description", value);
                  }}
                />
              </div>
              <div>
                <div className={classes.editorContainer}>
                  <Typography className={classes.typography}>
                    {STRINGS.result.ANALISYS}
                  </Typography>
                  <Editor
                    minEditorHeight={100}
                    htmlValue={values.analysis}
                    onHtmlValueChange={(value) => {
                      onEditorChange("analysis", value);
                    }}
                  />
                </div>
                <div className={classes.editorContainer}>
                  <Typography className={classes.typography}>
                    {STRINGS.result.OBSERVATIONS}
                  </Typography>
                  <Editor
                    minEditorHeight={100}
                    htmlValue={values.observations}
                    onHtmlValueChange={(value) => {
                      onEditorChange("observations", value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={classes.actionSection}>
              <PrimaryButton
                label={STRINGS.generals.CANCEL}
                className={classes.saveButton}
                onClick={handleCloseForm}
              />
              <PrimaryButton
                label={STRINGS.generals.SAVE}
                className={classes.saveButton}
                type="submit"
                loading={loadingNewResult}
                disabled={loadingNewResult}
              />
            </div>
          </form>
        </LabeledDialog>
      )}
    </>
  );
}
