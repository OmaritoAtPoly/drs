/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, makeStyles } from "@material-ui/core";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useCallback } from "react";
import shortid from "shortid";
import { useImageCategoryCacheSelector } from "../../../../../modules/customer/request/imageCategoryCacheSelector";
import STRINGS from "../../../../../utils/strings";
import LoadingWrapper from "../../../../LoadingWrapper";
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
  addCustomerImageRequest: (imageRequest: Schemas.ImageRequestRequest) => void;
  handleShow: () => void;
  initialValue: Schemas.ImageRequestRequest;
  loading: boolean;
}

export default function ImageRequestForm({
  addCustomerImageRequest,
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items: initialValue.items,
    },
    onSubmit: () => {
      addCustomerImageRequest({
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
          <LoadingWrapper loading={loading}>
            <Button
              className={classes.saveButton}
              disabled={loading}
              variant="text"
              color="primary"
              type="submit">
              {STRINGS.generals.FINISH}
            </Button>
          </LoadingWrapper>
        </div>
      </Form>
    </FormikProvider>
  );
}
