/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, makeStyles } from "@material-ui/core";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useCallback } from "react";
import shortid from "shortid";
import { useImageCategoryCacheSelector } from "../../../../../modules/customer/request/imageCategoryCacheSelector";
import STRINGS from "../../../../../utils/strings";
import PrimaryButton from "../../../../buttons/PrimaryButton";
import DiagnosisPanelContainer from "../diagnosisPanel/DiagnosisPanelContainer";
import RequestPanelContainer from "../requestPanel/RequestPanelContainer";

const styles = makeStyles(() => ({
  requestPanelContainer: {
    width: "100%",
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
}));

interface Props {
  addCustomerRequest: (imageRequest: Schemas.OtherRequestRequest) => void;
  handleShow: () => void;
  initialValue: Schemas.OtherRequestRequest;
  loading: boolean;
}

export default function OtherRequestForm({
  addCustomerRequest,
  handleShow,
  initialValue,
  loading,
}: Props) {
  const classes = styles();
  const {
    examList,
    setSearch,
    loading: loadingCategories,
  } = useImageCategoryCacheSelector("");
  const formik = useFormik({
    initialValues: {
      search: "",
      diagnoses: initialValue.diagnoses,
      items: initialValue.items,
    },
    enableReinitialize: true,
    onSubmit: () => {
      addCustomerRequest({
        diagnoses: formik.values.diagnoses,
        items: formik.values.items,
      });
    },
  });
  const { values, setFieldValue } = formik;

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

  const handleAddRequestItem = useCallback(
    (exam: Schemas.CategoryExamData) => {
      const requestList = values.items ? [...values.items] : [];
      const code = shortid();
      requestList.push({
        code,
        description: exam.name,
        notes: "",
        examCode: exam.code,
        quantity: 1,
      });
      setFieldValue("items", requestList);
    },
    [setFieldValue, values.items],
  );

  const handleDeleteDiagnosis = useCallback(
    (index: number) => {
      const newDiagnosisList = [...(values.diagnoses || [])];
      newDiagnosisList?.splice(index, 1);
      setFieldValue("diagnoses", newDiagnosisList);
    },
    [setFieldValue, values.diagnoses],
  );

  const handleDeleteRequest = useCallback(
    (code: string) => {
      const requestList = values.items?.filter((item) => code !== item.code);
      setFieldValue("items", requestList);
    },
    [setFieldValue, values.items],
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

  const handleOnRequestNotesChange = useCallback(
    (index: number, value: string) => {
      setFieldValue(`items[${index}].notes`, value);
    },
    [setFieldValue],
  );

  const onDebounceSearch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSearch(event.target.value || "");
    },
    [setSearch],
  );

  const handleOnRequestQuantityChange = useCallback(
    (index: number, value: string) => {
      setFieldValue(`items[${index}].quantity`, value);
    },
    [setFieldValue],
  );

  return (
    <FormikProvider value={formik}>
      <Form className={classes.formContainer}>
        <DiagnosisPanelContainer
          diagnosisList={values.diagnoses}
          onAddDiagnosis={handleAddDiagnosis}
          onDeleteDiagnosis={handleDeleteDiagnosis}
          onChangeDiagnosisType={handleOnChangeDiagnosesType}
          onChangeNotes={handleOnNotesChange}
        />
        <div className={classes.requestPanelContainer}>
          <RequestPanelContainer
            requestList={values.items}
            onAddRequest={handleAddRequestItem}
            onChangeRequestNotes={handleOnRequestNotesChange}
            onDeleteRequest={handleDeleteRequest}
            loadingCategories={loadingCategories}
            onDebounceSearch={onDebounceSearch}
            categoryResults={examList}
            handleOnRequestQuantityChange={handleOnRequestQuantityChange}
          />
        </div>
        <div className={classes.actionSection}>
          <Button variant="text" color="primary" onClick={handleShow}>
            {STRINGS.generals.CANCEL}
          </Button>
          <PrimaryButton
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
