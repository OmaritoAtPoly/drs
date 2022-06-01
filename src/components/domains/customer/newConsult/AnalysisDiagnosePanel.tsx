import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";
import TitleCard from "../../../cards/TitleCard";
import Editor from "../../../inputs/Editor";
import DiagnosisPanelContainer from "../request/diagnosisPanel/DiagnosisPanelContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: "55px",
      lineHeight: "20px",
      fontWeight: "bold",
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1),
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      color: "#323232",
      marginBottom: theme.spacing(1),
    },
    cardStyle: {
      marginLeft: theme.spacing(0.4),
    },
    bodyCardStyle: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    text: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    button: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    hidden: {
      display: "none",
    },
  }),
);

interface Props {
  data: Schemas.AppointmentRecordResponse;
  onSubmit: (values: Schemas.AppointmentRecordRequest) => void;
  loading?: boolean;
  readOnly?: boolean;
}

const AnalysisDiagnosePanel = ({
  onSubmit,
  loading,
  readOnly = false,
  data,
}: Props) => {
  const classes = useStyles();
  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      diagnoses: data.diagnoses || [],
      analysis: data.analysis || [],
    },
    onSubmit,
    enableReinitialize: true,
  });
  const handleChangeDiagnose = useCallback(
    (value) => {
      setFieldValue("analysis[0]", value);
    },
    [setFieldValue],
  );
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
    (index: number, item: string) => {
      const definitive = item === "Definitivo";
      setFieldValue(`diagnoses[${index}].definitive`, definitive);
    },
    [setFieldValue],
  );
  const handleOnNotesChange = useCallback(
    (index: number, item: string) => {
      setFieldValue(`diagnoses[${index}].notes`, item);
    },
    [setFieldValue],
  );
  const handleOnclickSubmit = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);
  return (
    <TitleCard
      title={STRINGS.newConsult.ANALYSIS_DIAGNOSES}
      onClick={() => {}}
      classTitle={classes.cardStyle}>
      <form>
        <div className={classes.bodyCardStyle}>
          <div className={classes.text}>
            <Editor
              minEditorHeight={100}
              htmlValue={
                values.analysis && values.analysis.length
                  ? values.analysis[0]
                  : ""
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onHtmlValueChange={handleChangeDiagnose}
              readOnly={readOnly}
            />
          </div>
          <div className={classes.formGroup}>
            <DiagnosisPanelContainer
              diagnosisList={values.diagnoses}
              onAddDiagnosis={handleAddDiagnoses}
              onDeleteDiagnosis={handleDeleteDiagnosis}
              onChangeDiagnosisType={handleOnChangeDiagnosesType}
              onChangeNotes={handleOnNotesChange}
              titleStyle={classes.title}
              readOnly={readOnly}
            />
          </div>
          <div className={readOnly ? classes.hidden : classes.button}>
            <PrimaryButton
              loading={loading}
              variant="contained"
              className={classes.button}
              label={STRINGS.allergies.SAVE}
              onClick={handleOnclickSubmit}
              color="primary"
            />
          </div>
        </div>
      </form>
    </TitleCard>
  );
};
export default AnalysisDiagnosePanel;
