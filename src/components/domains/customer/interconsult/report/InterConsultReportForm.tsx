import { Button, makeStyles, Typography } from "@material-ui/core";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useCallback } from "react";
import shortid from "shortid";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";
import BadgedButton from "../../../../buttons/BadgedButton";
import Editor from "../../../../inputs/Editor";
import LoadingWrapper from "../../../../LoadingWrapper";
import UploadFile from "../../files/UploadFile";
import DiagnosisPanelContainer from "../../request/diagnosisPanel/DiagnosisPanelContainer";
import Attachment from "../Attachment";

const styles = makeStyles(() => ({
  headRow: {
    display: "flex",
    flexWrap: "wrap",
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  headCol: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  row: {
    display: "flex",
    alignItems: "flex-start",
    flexWrap: "wrap",
    margin: theme.spacing(1),
    width: "100%",
  },
  col: {
    width: "49%",
    marginRight: theme.spacing(0.25),
    marginLeft: theme.spacing(0.25),
  },
  box: {
    border: "1px solid #D6E3F3",
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(1),
    minHeight: theme.spacing(15),
  },
  title: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  actionSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  saveButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  headerText: {
    color: "#82828",
  },
  uploadContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "center",
  },
  deleteButtonWrapperStyle: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));

interface Props {
  loading: boolean;
  initialValues: Schemas.InterConsultationReport;
  currentInterConsult: Schemas.InterConsultationResp;
  handleShow: () => void;
  handleOnMakeReport: (requestBody: Schemas.InterConsultationReport) => void;
  attachingFiles: boolean;
  uploadLocalProfessionalFile: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
  handleResetUpload: () => void;
  localBase64: Schemas.ResultFileRequest[];
  deleteAttachmentItem: (name: string) => void;
}

export default function InterConsultReportForm({
  loading,
  initialValues,
  currentInterConsult,
  handleShow,
  handleOnMakeReport,
  attachingFiles,
  handleResetUpload,
  uploadLocalProfessionalFile,
  localBase64,
  deleteAttachmentItem,
}: Props) {
  const classes = styles();

  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    onSubmit: (values) => {
      handleOnMakeReport(values);
    },
  });

  const { values, setFieldValue } = formik;

  const onEditorChange = useCallback(
    (field: string, value: string) => {
      setFieldValue(field, value);
    },
    [setFieldValue],
  );

  const handleAddDiagnosis = useCallback(
    (diagnose: Schemas.Diagnose) => {
      const diagnosisList = values.diagnoses ? [...values.diagnoses] : [];
      if (diagnose) {
        diagnosisList.push({
          code: diagnose.code,
          definitive: diagnose.definitive,
          description: diagnose.description || "",
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

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className={classes.headRow}>
          <div className={classes.headCol}>
            <Typography className={classes.headerText} color="textSecondary">
              {STRINGS.interconsult.FROM_PROFESSIONAL}
            </Typography>
            <Typography>
              {`${currentInterConsult.fromProfessional?.firstName || ""} ${
                currentInterConsult.fromProfessional?.firstFamilyName || ""
              } `}
            </Typography>
          </div>
          <div className={classes.headCol}>
            <Typography className={classes.headerText} color="textSecondary">
              {STRINGS.interconsult.REASON}
            </Typography>
            <Typography>{currentInterConsult.reason || ""}</Typography>
          </div>
          <div className={classes.headCol}>
            <div>
              <Typography className={classes.headerText} color="textSecondary">
                {STRINGS.generals.SPECIALTY}
              </Typography>
              <Typography>
                {currentInterConsult.toSpecialty?.name || ""}
              </Typography>
            </div>
          </div>
          <div className={classes.headCol}>
            <Typography className={classes.headerText} color="textSecondary">
              {STRINGS.interconsult.TO_PROFESSIONAL}
            </Typography>
            <Typography>
              {currentInterConsult.targetProfessionalName}
            </Typography>
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.col}>
            <Typography className={classes.title}>
              {STRINGS.interconsult.CLINIC_PROFILE}
            </Typography>
            <div className={classes.box}>
              <Editor
                minEditorHeight={theme.spacing(20)}
                htmlValue={
                  currentInterConsult.clinicalProfile &&
                  currentInterConsult.clinicalProfile.length
                    ? currentInterConsult.clinicalProfile[0]
                    : ""
                }
                readOnly
              />
            </div>
          </div>
          <div className={classes.col}>
            <Typography className={classes.title}>
              {STRINGS.interconsult.CLINICAL_CRITERIAL}
            </Typography>
            <Editor
              minEditorHeight={150}
              htmlValue={values.clinicalCriteria && values.clinicalCriteria[0]}
              onHtmlValueChange={(value) => {
                onEditorChange("clinicalCriteria[0]", value);
              }}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.col}>
            <Typography className={classes.title}>
              {STRINGS.interconsult.EXAM_PROCEDURE}
            </Typography>
            <Editor
              minEditorHeight={150}
              htmlValue={values.examsProcedures && values.examsProcedures[0]}
              onHtmlValueChange={(value) => {
                onEditorChange("examsProcedures[0]", value);
              }}
            />
          </div>
          <div className={classes.col}>
            <Typography className={classes.title}>
              {STRINGS.interconsult.ANALISYS}
            </Typography>
            <Editor
              minEditorHeight={150}
              htmlValue={values.analysis && values.analysis[0]}
              onHtmlValueChange={(value) => {
                onEditorChange("analysis[0]", value);
              }}
            />
          </div>
        </div>
        <DiagnosisPanelContainer
          diagnosisList={values.diagnoses}
          onAddDiagnosis={handleAddDiagnosis}
          onDeleteDiagnosis={handleDeleteDiagnosis}
          onChangeDiagnosisType={handleOnChangeDiagnosesType}
          onChangeNotes={handleOnNotesChange}
        />
        <div className={classes.row}>
          <div className={classes.col}>
            <Typography className={classes.title}>
              {STRINGS.interconsult.TREATMENT}
            </Typography>
            <Editor
              minEditorHeight={150}
              htmlValue={values.treatment && values.treatment[0]}
              onHtmlValueChange={(value) => {
                onEditorChange("treatment[0]", value);
              }}
            />
          </div>
          <div className={classes.col}>
            <Typography className={classes.title}>
              {STRINGS.generals.LOW_RESULTS}
            </Typography>
            <Editor
              minEditorHeight={150}
              htmlValue={values.results && values.results[0]}
              onHtmlValueChange={(value) => {
                onEditorChange("results[0]", value);
              }}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.col}>
            <Typography className={classes.title}>
              {STRINGS.interconsult.OBSERVATIONS}
            </Typography>
            <Editor
              minEditorHeight={150}
              htmlValue={values.observations && values.observations[0]}
              onHtmlValueChange={(value) => {
                onEditorChange("observations[0]", value);
              }}
            />
          </div>
          <div className={classes.col}>
            <Typography className={classes.title}>
              {STRINGS.interconsult.ATTACHMENT}
            </Typography>
            <div className={classes.uploadContainer} id="upload-container">
              <div>
                {localBase64 &&
                  localBase64.map((a) => (
                    <Attachment
                      key={shortid()}
                      attachment={a.name || ""}
                      deleteAttachmentItem={deleteAttachmentItem}
                      removable
                    />
                  ))}
              </div>
              <UploadFile
                loading={attachingFiles}
                onImportFile={uploadLocalProfessionalFile}
              />
              <div className={classes.deleteButtonWrapperStyle}>
                <Typography>{STRINGS.generals.RESET_ATTACHMENTS}</Typography>
                <BadgedButton
                  iconHeight={20}
                  iconWidth={20}
                  onClick={handleResetUpload}
                  circular
                  iconName="trash"
                  fill={theme.palette.error.main}
                />
              </div>
            </div>
          </div>
          <div className={classes.actionSection}>
            <Button variant="text" color="primary" onClick={handleShow}>
              {STRINGS.generals.CANCEL}
            </Button>
            <LoadingWrapper loading={loading}>
              <Button
                className={classes.saveButton}
                disabled={loading}
                variant="text"
                color="primary"
                type="submit">
                {STRINGS.generals.SAVE}
              </Button>
            </LoadingWrapper>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
}
