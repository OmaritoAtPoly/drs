import { Button, makeStyles, Theme } from "@material-ui/core";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useCallback } from "react";
import shortid from "shortid";
import STRINGS from "../../../../../utils/strings";
import DiagnosisPanelContainer from "../diagnosisPanel/DiagnosisPanelContainer";
import RequestPanelContainer from "../requestPanel/RequestPanelContainer";
import LaboratoryPanelContainer from "./panels/LaboratoryPanelContainer";
import { useLabCategoryCacheSelector } from "../../../../../modules/customer/request/labCategoryCacheSelector";
import LoadingWrapper from "../../../../LoadingWrapper";

const styles = makeStyles((theme: Theme) => ({
  row: {
    display: "flex",
    flexDirection: "row",
  },
  formContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  col: {
    width: "50%",
    margin: theme.spacing(0.5),
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
  addCustomerLabRequest: (labRequest: Schemas.LaboratoryRequestRequest) => void;
  handleShow: () => void;
  initialValue: Schemas.LaboratoryRequestRequest;
  loading: boolean;
}

export default function LaboratoryRequestForm({
  addCustomerLabRequest,
  handleShow,
  initialValue,
  loading,
}: Props) {
  const classes = styles();
  const {
    examList,
    setSearch,
    loading: loadingCategories,
  } = useLabCategoryCacheSelector("");

  const formik = useFormik({
    initialValues: initialValue,
    onSubmit: () => {
      addCustomerLabRequest({
        diagnoses: formik.values.diagnoses,
        items: formik.values.items,
      });
    },
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

  const handleAddRequestItem = useCallback(
    (exam: Schemas.CategoryExamData) => {
      const requestList = values.items ? [...values.items] : [];
      const code = shortid();
      if (exam) {
        requestList.push({
          code,
          description: exam?.name || "",
          notes: "",
          quantity: 1,
        });
        setFieldValue("items", requestList);
      }
    },
    [setFieldValue, values.items],
  );

  const handleAddRequestItemFromModal = useCallback(
    (categories: Schemas.CategoryExamData[]) => {
      const requestList = values.items ? [...values.items] : [];
      // eslint-disable-next-line array-callback-return
      categories.map((category) => {
        requestList.push({
          code: category.code,
          description: category.name,
          notes: "",
          quantity: 1,
        });
      });
      setFieldValue("items", requestList);
    },
    [setFieldValue, values.items],
  );

  const handleDeleteDiagnosis = useCallback(
    (index: number) => {
      const newDiagnosisList = [...(values.diagnoses || [])];
      newDiagnosisList?.splice(index, 1);
      setFieldValue("diagnoses", newDiagnosisList?.splice(index, 1));
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
          onAddDiagnosis={handleAddDiagnoses}
          onDeleteDiagnosis={handleDeleteDiagnosis}
          onChangeDiagnosisType={handleOnChangeDiagnosesType}
          onChangeNotes={handleOnNotesChange}
        />
        <div className={classes.row}>
          <div className={classes.col}>
            <RequestPanelContainer
              loadingCategories={loadingCategories}
              requestList={values.items}
              onAddRequest={handleAddRequestItem}
              onChangeRequestNotes={handleOnRequestNotesChange}
              onDeleteRequest={handleDeleteRequest}
              onDebounceSearch={onDebounceSearch}
              categoryResults={examList}
              handleOnRequestQuantityChange={handleOnRequestQuantityChange}
            />
          </div>
          <div className={classes.col}>
            <LaboratoryPanelContainer
              handleAddRequestItemFromModal={handleAddRequestItemFromModal}
            />
          </div>
        </div>
        <div className={classes.actionSection}>
          <Button variant="text" color="primary" onClick={handleShow}>
            {STRINGS.generals.CANCEL}
          </Button>
          <LoadingWrapper loading={loading}>
            <Button
              className={classes.saveButton}
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
