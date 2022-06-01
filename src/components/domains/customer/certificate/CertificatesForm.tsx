/* eslint-disable nonblock-statement-body-position */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-one-expression-per-line */
import { makeStyles, Typography } from "@material-ui/core";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useCallback, useMemo } from "react";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import { age, fullName } from "../../../../utils/user";
import PrimaryButton from "../../../buttons/PrimaryButton";
import Editor from "../../../inputs/Editor";
import DiagnosisPanelContainer from "../request/diagnosisPanel/DiagnosisPanelContainer";

interface Props {
  customer: Schemas.CustomerData;
  initialValue: Schemas.CertificateRequest;
  handleSubmit: (values: Schemas.CertificateRequest) => void;
  handleShow: () => void;
  loadingCertificate?: boolean;
  withDefinitiveDiagnosis?: boolean;
  withComment?: boolean;
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
  saveButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  labelDescriptions: {
    marginTop: 20,
    marginBottom: 20,
  },
  diagnoses: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 15,
  },
});

export default function CertificatesForm({
  loadingCertificate,
  handleSubmit,
  handleShow,
  initialValue,
  withDefinitiveDiagnosis,
  withComment,
  customer,
}: Props) {
  const classes = styles();
  const formik = useFormik({
    initialValues: {
      search: "",
      details: initialValue.details,
      diagnoses: initialValue.diagnoses || [],
    },
    onSubmit: () => {
      handleSubmit({
        details: formik.values.details,
        diagnoses: formik.values.diagnoses,
      });
    },
    enableReinitialize: true,
  });
  const { values, setFieldValue } = formik;

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

  const onEditorStateChange = useCallback(
    (value: string) => {
      setFieldValue("details[0]", value, true);
    },
    [setFieldValue],
  );
  const customerAge = useMemo(() => {
    if (
      !customer.birthdateDay ||
      !customer.birthdateMonth ||
      !customer.birthdateYear
    ) {
      return "";
    }
    const theAge = age(customer);
    return `${theAge.years} años, ${theAge.months} meses `;
  }, [customer]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <DiagnosisPanelContainer
          diagnosisList={values.diagnoses}
          onAddDiagnosis={handleAddDiagnoses}
          onDeleteDiagnosis={handleDeleteDiagnoses}
          onChangeDiagnosisType={handleOnChangeDiagnosesType}
          onChangeNotes={handleOnNotesChange}
          withDefinitiveDiagnosis={withDefinitiveDiagnosis}
          withComment={withComment}
        />
        <div className={classes.labelDescriptions}>
          <Typography>{`${STRINGS.generals.CERTIFICATE_THAT}${
            // eslint-disable-next-line no-nested-ternary
            customer?.gender === "FEMALE"
              ? STRINGS.generals.HER.toLowerCase()
              : customer?.gender === "MALE"
              ? STRINGS.generals.HIM.toLowerCase()
              : ""
          } ${STRINGS.order.ORDER_PATIENT.toLowerCase()} ${fullName(
            customer,
          )}  ${customerAge ? `de ${customerAge}` : ""} con C.I ${
            customer.legalID
          } con diagnóstico de:`}</Typography>
          <div className={classes.diagnoses}>
            {values.diagnoses.map((diagnose) => (
              <Typography>{diagnose.description}</Typography>
            ))}
          </div>
        </div>

        <div className={classes.editorSection}>
          <Typography>{STRINGS.certificates.CERTIFICATE_DETAILS}</Typography>
          <Editor
            minEditorHeight={theme.spacing(20)}
            onHtmlValueChange={onEditorStateChange}
            htmlValue={
              values.details && values.details.length
                ? values.details[0]
                : undefined
            }
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
              loading={loadingCertificate}
            />
          </span>
        </div>
      </Form>
    </FormikProvider>
  );
}
