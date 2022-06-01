import { makeStyles, TextField, Typography } from "@material-ui/core";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useCallback, useMemo } from "react";
import * as Yup from "yup";
import theme from "../../../../styles/theme";
import { defaultProcedure } from "../../../../utils/defaultData";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";
import Editor from "../../../inputs/Editor";
import Autocomplete from "../../../inputs/Search/Autocomplete";
import NoOptionMatchItem from "../../../inputs/Search/NoOptionMatchItem";
import DiagnosisPanelContainer from "../request/diagnosisPanel/DiagnosisPanelContainer";

interface Props {
  initialData: Schemas.ProcedureResponse;
  loadingProcedure?: boolean;
  handleSubmit: (values: Schemas.ProcedureRequest) => void;
  handleShow: () => void;
  procedures: Schemas.ProcedureResponse[];
  readOnly?: boolean;
  saveCurrentProcedureToEdit: (
    data?: Schemas.ProcedureResponse | undefined,
  ) => void;
}

const styles = makeStyles({
  editorSection: {
    paddingBlock: theme.spacing(2),
  },
  spanStyle: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  autoCompleteStyle: {
    display: "block",
  },
  nameContainer: {
    marginTop: 10,
  },
  search: {
    width: 350,
  },
  saveButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

const signupSchema = Yup.object().shape({
  name: Yup.string().required(STRINGS.procedure.NAME_PROCEDURE_REQUIRED),
});

export default function ProcedureForm({
  loadingProcedure,
  handleSubmit,
  handleShow,
  initialData: initialValues,
  procedures,
  readOnly = false,
  saveCurrentProcedureToEdit,
}: Props) {
  const classes = styles();
  const formik = useFormik({
    initialValues: { ...initialValues, search: "" },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: signupSchema,
    enableReinitialize: true,
  });
  const { values, setFieldValue, errors, touched, handleChange } = formik;

  const noEmptyDiagnoses = useMemo(() => {
    let newValues: Schemas.Diagnose[] = [];
    if (values?.diagnoses) {
      newValues = [...values.diagnoses.filter((a) => a.description !== "")];
    }
    return newValues;
  }, [values.diagnoses]);

  const handleAddDiagnoses = useCallback(
    (diagnose: Schemas.Diagnose) => {
      const diagnosisList = values.diagnoses ? [...noEmptyDiagnoses] : [];
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
    [setFieldValue, noEmptyDiagnoses, values.diagnoses],
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
      const definitive = value === STRINGS.buttonGrid.DEFINITIVE;
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
      setFieldValue(field, Array<string>(value));
    },
    [setFieldValue],
  );

  const onEditorStateChange = useCallback(
    (value: string) => {
      onEditorChange("details", value);
    },
    [onEditorChange],
  );

  const handleAddName = useCallback(
    (value: Schemas.ProcedureResponse) => {
      if (value && value.name) {
        setFieldValue("name", value.name, true);
        saveCurrentProcedureToEdit(value);
      } else {
        saveCurrentProcedureToEdit(defaultProcedure);
      }
    },
    [setFieldValue, saveCurrentProcedureToEdit],
  );

  const onDebounceSearch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFieldValue("search", event.target.value, true);
      setFieldValue("name", event.target.value, true);
    },
    [setFieldValue],
  );

  const addCustomerProcedure = useCallback(() => {
    setFieldValue("name", values.search, true);
  }, [setFieldValue, values.search]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <span className={classes.autoCompleteStyle}>
          <Typography>{STRINGS.procedure.FIND_EXISTENT_PROCEDURE}</Typography>
          <Autocomplete
            loading={false}
            options={procedures}
            className={classes.search}
            getOptionLabel={
              // eslint-disable-next-line no-confusing-arrow
              (option: Schemas.ProcedureResponse) =>
                option.name ? option.name : ""
              // eslint-disable-next-line react/jsx-curly-newline
            }
            freeSolo
            autoComplete={false}
            onChange={handleAddName}
            inputProps={{
              autoComplete: "off",
              placeholder: STRINGS.procedure.FIND_EXISTENT_PROCEDURE,
            }}
            renderInitialOption={() => (
              <NoOptionMatchItem
                item={{
                  label: (values.name || "").toUpperCase(),
                  value: values.name || "",
                }}
                onClick={addCustomerProcedure}
              />
            )}
            onDebounce={onDebounceSearch}
            disabled={readOnly}
          />
          <div className={classes.nameContainer}>
            <TextField
              id="name"
              error={!!(errors.name && touched.name)}
              name="name"
              helperText={errors.name && touched.name ? errors.name : ""}
              placeholder={STRINGS.procedure.NAME_PROCEDURE}
              value={values.name}
              onChange={handleChange}
              variant="outlined"
              margin="dense"
            />
          </div>
        </span>
        <DiagnosisPanelContainer
          diagnosisList={noEmptyDiagnoses}
          onAddDiagnosis={handleAddDiagnoses}
          onDeleteDiagnosis={handleDeleteDiagnoses}
          onChangeDiagnosisType={handleOnChangeDiagnosesType}
          onChangeNotes={handleOnNotesChange}
        />
        <div className={classes.editorSection}>
          <Typography>{STRINGS.procedure.PROCEDURE_DETAILS}</Typography>
          <Editor
            minEditorHeight={theme.spacing(20)}
            htmlValue={values.details && values?.details[0]}
            onHtmlValueChange={onEditorStateChange}
          />
          <span id="button-span-wrapper" className={classes.spanStyle}>
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
              loading={loadingProcedure}
            />
          </span>
        </div>
      </Form>
    </FormikProvider>
  );
}
