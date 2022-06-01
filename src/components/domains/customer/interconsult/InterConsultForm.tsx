import {
  Button,
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { Field, FieldProps, Form, FormikProvider, useFormik } from "formik";
import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import shortid from "shortid";
import InterConsultAttachmentItemContainer from "../../../../containers/customer/interconsult/InterConsultAttachmentItemContainer";
import { useCurrentInterconsultationToEditQuery } from "../../../../modules/customer/interconsult/query";
import useProfileCacheSelector from "../../../../modules/profile/cacheSelector";
import useHandlerError from "../../../../modules/utils/error/handleError";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import { fullName } from "../../../../utils/user";
import PrimaryButton from "../../../buttons/PrimaryButton";
import Editor from "../../../inputs/Editor";
import UploadFile from "../files/UploadFile";
import DiagnosisPanelContainer from "../request/diagnosisPanel/DiagnosisPanelContainer";
import AllergiesPanel from "./AllergiesPanel";
import ProfessionalInfoInterConsultContainer from "./ProfessionalInfoInterConsultContainer";

const styles = makeStyles(() => ({
  row: {
    display: "flex",
    alignItems: "center",

    flexWrap: "wrap",
    margin: theme.spacing(1),
  },
  row1: {
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
  formGroup: {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
  },
  radioGroupRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    border: "1px solid lightgray",
    padding: "6.1px 8px",
    marginRight: 5,
    borderRadius: "3px",
    marginTop: "5px",
    marginLeft: 5,
    width: 280,
  },
  title: {
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5),
  },
  actionSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(1),
  },
  editButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  saveButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  standardWidth: {
    width: 300,
  },
  standardMarginLeft: {
    marginLeft: 10,
  },
  classNameContainerDg: {
    margin: 10,
  },
  marginTop: { marginTop: 0 },
  marginBottom: { marginBottom: 0 },
  uploadContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "column",
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
  initialValues: Schemas.InterConsultationReq;
  allergies: string[];
  otherAllergies: string[];
  pathologies: Schemas.CustomerPathologyData[];
  loading: boolean;
  handleMode: () => void;
  handleAddNewInterConsult: (
    interConsultRequest: Schemas.InterConsultationReq,
  ) => void;
  uploadLocalProfessionalFile: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => Promise<void>;
  attachingFiles: boolean;
  localBase64: Schemas.ResultFileRequest[];
  deleteAttachmentItem: (name: string) => void;
  backgroundFromCustomer?: Schemas.InterConsultationReq;
  patientAllergiesIndicator: string;
}

export default function InterConsultForm({
  initialValues,
  allergies,
  otherAllergies,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pathologies,
  loading,
  handleMode,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleAddNewInterConsult,
  uploadLocalProfessionalFile,
  attachingFiles,
  localBase64,
  deleteAttachmentItem,
  backgroundFromCustomer,
  patientAllergiesIndicator,
}: Props) {
  const classes = styles();
  const { currentProfessional } = useProfileCacheSelector();
  const {
    data: currentInterConsult,
  } = useCurrentInterconsultationToEditQuery();
  const { id: patientId } = useParams<{ id: string }>();

  const { handlerError } = useHandlerError();

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      other: initialValues?.allergies?.join("\n").trim(),
      hasAllergies: initialValues.hasAllergies || "UNDEFINED",
      newMedicineAllergy: "",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      targetSpecialtyCode: (initialValues as any).toSpecialty?.code || "",
    } as Schemas.InterConsultationResp & {
      other: string;
      newMedicineAllergy: string;
    },
    enableReinitialize: true,
    onSubmit: (val) => {
      const otherAllergiesValues = val.other
        ?.split("\n")
        .filter((a) => a.trim() !== "");

      if (
        !val.background &&
        !val.clinicalProfile &&
        !val.targetSpecialtyCode &&
        !val.reason
      ) {
        handlerError(STRINGS.validation.MISSING_ALL_FIELDS);
      } else if (!val.reason) {
        handlerError(
          `${STRINGS.generals.THE_MISSING_FIELD}${STRINGS.appointment.APPOINTMENT_REASON_PLACEHOLDER}`,
        );
      } else if (!val.targetSpecialtyCode) {
        handlerError(
          `${STRINGS.generals.THE_MISSING_FIELD}${STRINGS.appointment.APPOINTMENT_SPECIALTIES}`,
        );
      } else if (!val.background) {
        handlerError(
          `${STRINGS.generals.THE_MISSING_FIELD}${STRINGS.interconsult.BACKGROUND}`,
        );
      } else if (!val.clinicalProfile) {
        handlerError(
          `${STRINGS.generals.THE_MISSING_FIELD}${STRINGS.interconsult.CLINIC_PROFILE}`,
        );
      } else {
        handleAddNewInterConsult({
          ...val,
          allergies: otherAllergiesValues,
        });
      }
    },
  });
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleChange,
    handleBlur,
  } = formik;

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

  const handleDeleteDiagnoses = useCallback(
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

  const onRadioChecked = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      event.target.value === "Urgente"
        ? setFieldValue("emergency", true)
        : setFieldValue("emergency", false);
    },
    [setFieldValue],
  );

  const importance = useMemo(() => (values.emergency ? "Urgente" : "Normal"), [
    values.emergency,
  ]);

  const onFillWithCustomerData = useCallback(() => {
    setFieldValue(
      "medicineAllergies",
      backgroundFromCustomer?.medicineAllergies || [],
      true,
    );
    setFieldValue(
      "other",
      backgroundFromCustomer?.allergies?.join("\n") || "",
      true,
    );
    setFieldValue("hasAllergies", patientAllergiesIndicator, true);

    const backgroundArray = backgroundFromCustomer?.background?.length
      ? backgroundFromCustomer.background
      : [];
    const background = backgroundArray
      .map((b) => {
        if (
          [
            "Patologías familiares",
            "Patologías",
            "Operaciones",
            "Hábitos",
            "Psiquiátricos",
            "Gineco-obstétricos",
          ].includes(b)
        ) {
          return `<p><strong>${b}</strong></p>`;
        }
        return `<p>${b}</p>`;
      })
      .join("\n");
    setFieldValue("background", [background], true);
    setFieldValue("fillWithCustomerData", true);
  }, [
    backgroundFromCustomer?.allergies,
    backgroundFromCustomer?.background,
    backgroundFromCustomer?.medicineAllergies,
    patientAllergiesIndicator,
    setFieldValue,
  ]);

  const handleFillingOption = useCallback(() => {
    setFieldValue("fillWithCustomerData", false);
    setFieldValue("medicineAllergies", [], true);
    setFieldValue("other", "", true);
    setFieldValue("hasAllergies", "UNDEFINED", true);
  }, [setFieldValue]);

  const onRadioFillCustomerDataActionChecked = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      event.target.value === "Completar"
        ? handleFillingOption()
        : onFillWithCustomerData();
    },
    [onFillWithCustomerData, handleFillingOption],
  );

  const fillWithCustomerData = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      values.fillWithCustomerData ? "Datos de Historial Clínico" : "Completar",
    [values.fillWithCustomerData],
  );

  const onEditorChange = useCallback(
    (field: string, value: string[]) => {
      setFieldValue(field, value);
    },
    [setFieldValue],
  );

  const handleAddNewPill = useCallback(
    (value: string) => {
      const allergyList = values.medicineAllergies || [];
      allergyList.indexOf(value) === -1 && allergyList?.push(value);
      setFieldValue("medicineAllergies", allergyList);
    },
    [setFieldValue, values.medicineAllergies],
  );

  const handleDeleteAllergy = useCallback(
    (value: string, index: number) => {
      const allergyList = values.medicineAllergies || [];
      allergyList.splice(index, 1);
      setFieldValue("medicineAllergies", allergyList);
    },
    [setFieldValue, values.medicineAllergies],
  );

  const handleOnNoReferCheck = useCallback(() => {
    if (values.hasAllergies === "TRUE") {
      if (values.fillWithCustomerData) {
        setFieldValue("medicineAllergies", allergies, true);
        setFieldValue("other", otherAllergies, true);
        setFieldValue("hasAllergies", "TRUE", true);
      } else {
        setFieldValue("medicineAllergies", [], true);
        setFieldValue("other", "", true);
        setFieldValue("hasAllergies", "UNDEFINED", true);
      }
    } else {
      setFieldValue("medicineAllergies", []);
      setFieldValue("other", "", true);
      setFieldValue("hasAllergies", "UNDEFINED", true);
    }
    setFieldValue("hasAllergies", "UNDEFINED", true);
  }, [
    allergies,
    otherAllergies,
    setFieldValue,
    values.fillWithCustomerData,
    values.hasAllergies,
  ]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className={`${classes.row} ${classes.marginBottom}`}>
          <div className={classes.label}>
            <Typography>{fullName(currentProfessional)}</Typography>
          </div>
          <div className={classes.formGroup}>
            <Field name="reason">
              {({ field }: FieldProps) => (
                <TextField
                  {...field}
                  autoFocus
                  className={classes.standardWidth}
                  placeholder="Motivo de interconsulta *"
                  variant="outlined"
                  margin="dense"
                  error={!!(errors.reason && touched.reason)}
                  helperText={
                    errors.reason && touched.reason ? errors.reason : ""
                  }
                  label={
                    errors.reason && touched.reason
                      ? "Error"
                      : "Motivo de interconsulta *"
                  }
                />
              )}
            </Field>
          </div>
          <div className={classes.formGroup}>
            <FormControl component="fieldset">
              <RadioGroup
                className={classes.radioGroupRow}
                value={importance}
                onChange={onRadioChecked}>
                <FormControlLabel
                  value="Urgente"
                  control={<Radio />}
                  label="Urgente"
                />
                <FormControlLabel
                  value="Normal"
                  control={<Radio />}
                  label="Normal"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className={`${classes.row} ${classes.marginTop}`}>
          <ProfessionalInfoInterConsultContainer
            handleBlur={handleBlur}
            handleChange={handleChange}
            setFieldValue={setFieldValue}
            targetSpecialtyCode={values.targetSpecialtyCode || ""}
            targetProfessionalName={values.targetProfessionalName || ""}
            targetProfessionalEmail={values.targetProfessionalEmail || ""}
            targetProfessionalLegalID={
              values.targetProfessionalLegalID || values.toProfessional?.legalID
            }
            toProfessional={values.toProfessional}
          />
        </div>
        <div className={`${classes.formGroup} ${classes.standardMarginLeft}`}>
          <FormControl component="fieldset">
            <RadioGroup
              className={classes.radioGroupRow}
              value={fillWithCustomerData}
              onChange={onRadioFillCustomerDataActionChecked}>
              <FormControlLabel
                value="Completar"
                control={<Radio />}
                label="Completar"
              />
              <FormControlLabel
                value="Datos de Historial Clínico"
                control={<Radio />}
                label="Datos de Historial Clínico"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={classes.row1}>
          <div className={classes.col}>
            <Typography
              className={classes.title}
              color={errors.clinicalProfile ? "error" : "inherit"}>
              {STRINGS.interconsult.CLINIC_PROFILE}
            </Typography>
            <Editor
              minEditorHeight={150}
              htmlValue={
                values.clinicalProfile?.length ? values.clinicalProfile[0] : ""
              }
              onHtmlValueChange={(value) => {
                onEditorChange("clinicalProfile", [value]);
              }}
            />
          </div>
          <div className={classes.col}>
            <AllergiesPanel
              disable={values.hasAllergies || patientAllergiesIndicator}
              allergies={values.medicineAllergies || []}
              otherAllergies={values.other}
              onNoReferCheck={handleOnNoReferCheck}
              handleAddNewPill={(pill: string) => {
                handleAddNewPill(pill);
              }}
              handleChange={handleChange}
              handleDeleteAllergy={handleDeleteAllergy}
              newMedicineAllergy={values.newMedicineAllergy}
              setFieldValue={setFieldValue}
            />
          </div>
        </div>
        <div className={classes.row1}>
          <div className={classes.col}>
            <Typography className={classes.title}>
              {STRINGS.interconsult.PHISICAL_EXAM}
            </Typography>
            <Editor
              minEditorHeight={150}
              htmlValue={
                values.physicalExam?.length ? values.physicalExam[0] : ""
              }
              onHtmlValueChange={(value) => {
                onEditorChange("physicalExam", [value]);
              }}
            />
          </div>
          <div className={classes.col}>
            <Typography className={classes.title}>
              {STRINGS.interconsult.ANALISYS}
            </Typography>
            <Editor
              minEditorHeight={150}
              htmlValue={values.analysis?.length ? values.analysis[0] : ""}
              onHtmlValueChange={(value) => {
                onEditorChange("analysis", [value]);
              }}
            />
          </div>
        </div>
        <div className={classes.row1}>
          <div className={classes.col}>
            <Typography className={classes.title}>
              {STRINGS.interconsult.TREATMENT}
            </Typography>
            <Editor
              minEditorHeight={150}
              htmlValue={values.treatment?.length ? values.treatment[0] : ""}
              onHtmlValueChange={(value) => {
                onEditorChange("treatment", [value]);
              }}
            />
          </div>
          <div className={classes.col}>
            <Typography className={classes.title}>
              {STRINGS.interconsult.EXAM_PROCEDURE}
            </Typography>
            <Editor
              minEditorHeight={150}
              htmlValue={
                values.examsProcedures?.length ? values.examsProcedures[0] : ""
              }
              onHtmlValueChange={(value) => {
                onEditorChange("examsProcedures", [value]);
              }}
            />
          </div>
        </div>
        <div className={classes.standardMarginLeft}>
          <DiagnosisPanelContainer
            diagnosisList={values.diagnoses}
            onAddDiagnosis={handleAddDiagnoses}
            onDeleteDiagnosis={handleDeleteDiagnoses}
            onChangeDiagnosisType={handleOnChangeDiagnosesType}
            onChangeNotes={handleOnNotesChange}
            classNameContainer={classes.classNameContainerDg}
            autoFocus={false}
          />
        </div>
        <div className={classes.row1}>
          <div className={classes.col}>
            <Typography
              className={classes.title}
              color={errors.background ? "error" : "inherit"}>
              {STRINGS.interconsult.BACKGROUND}
            </Typography>
            <Editor
              minEditorHeight={150}
              htmlValue={values.background?.length ? values.background[0] : ""}
              onHtmlValueChange={(value) => {
                onEditorChange("background", [value]);
              }}
              truncate
            />
          </div>
          <div className={classes.col}>
            <Typography className={classes.title}>
              {STRINGS.generals.LOW_RESULTS}
            </Typography>
            <Editor
              minEditorHeight={150}
              htmlValue={values.results?.length ? values.results[0] : ""}
              onHtmlValueChange={(value) => {
                onEditorChange("results", [value]);
              }}
            />
          </div>
        </div>
        <div className={classes.row1}>
          <div className={classes.col}>
            <Typography className={classes.title}>
              {STRINGS.interconsult.OBSERVATIONS}
            </Typography>
            <Editor
              minEditorHeight={150}
              htmlValue={
                values.observations?.length ? values.observations[0] : ""
              }
              onHtmlValueChange={(value) => {
                onEditorChange("observations", [value]);
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
                    <InterConsultAttachmentItemContainer
                      key={shortid()}
                      attachment={a.name || ""}
                      deleteAttachmentItem={deleteAttachmentItem}
                      code={patientId}
                      requestCode={currentInterConsult?.code || ""}
                      removable
                    />
                  ))}
              </div>
              <UploadFile
                loading={attachingFiles}
                onImportFile={uploadLocalProfessionalFile}
              />
            </div>
          </div>
        </div>
        <div className={classes.actionSection}>
          <Button variant="text" color="primary" onClick={handleMode}>
            {STRINGS.generals.CANCEL}
          </Button>
          <PrimaryButton
            className={classes.saveButton}
            label={STRINGS.generals.FINISH}
            loading={loading}
            disabled={loading}
            variant="text"
            color="primary"
            type="submit"
          />
        </div>
      </Form>
    </FormikProvider>
  );
}
