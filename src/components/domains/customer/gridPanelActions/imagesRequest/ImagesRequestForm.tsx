import {
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import STRINGS from "../../../../../utils/strings";
import CardLayout from "../../../../cards/CardLayout";
import { ItemType } from "../../../../inputs/Search/Search";
import Diagnosis from "./Diagnosis";
import Requests from "./Requests";

const styles = makeStyles(() =>
  createStyles({
    diagnosisTitleStyle: {
      paddingBlock: "15px",
    },
    cardLayoutStyle: {
      display: "flex",
      flexDirection: "column",
    },
    saveButton: {
      fontWeight: "bold",
      textDecorationLine: "underline",
    },
    buttonPanel: {
      display: "flex",
      justifyContent: "flex-end",
    },
  }));

interface Props {
  loading?: boolean;
  requestList: ItemType[];
  diagnosisList: ItemType[];
  handleClose: () => void;
}

export default function ImagesRequestForm({
  loading = false,
  requestList,
  diagnosisList,
  handleClose,
}: Props) {
  const classes = styles();
  const {
    values,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      requestList,
      diagnosisList,
    },

    onSubmit: () => {
      handleClose();
    },
  });

  const handleAddRequestItem = useCallback((item: ItemType) => {
    const newRequestList = [...values.requestList];
    newRequestList.push({
      label: item.label,
      value: Math.random().toFixed(5).toString(),
    });
    setFieldValue("requestList", newRequestList);
  }, [setFieldValue, values.requestList]);

  const handleDeleteRequestItem = useCallback((code) => {
    if (code) {
      const newRequests = values.requestList.filter((req) => code !== req.value);
      setFieldValue("requestList", newRequests);
    }
  }, [setFieldValue, values.requestList]);

  const handleAddDiagnosisItem = useCallback((item: ItemType) => {
    const newDiagnosisList = [...values.diagnosisList];
    newDiagnosisList.push({
      label: item.label,
      value: Math.random().toFixed(5).toString(),
    });
    setFieldValue("diagnosisList", newDiagnosisList);
  }, [setFieldValue, values.diagnosisList]);

  const handleDeleteDiagnosisItem = useCallback((code) => {
    if (code) {
      const newDiagnosisList = values.diagnosisList.filter((diag) => code !== diag.value);
      setFieldValue("diagnosisList", newDiagnosisList);
    }
  }, [setFieldValue, values.diagnosisList]);

  return (
    <div>
      { loading
        ?
          <CircularProgress size={24} />
        :
          <form onSubmit={handleSubmit}>
            <Typography className={classes.diagnosisTitleStyle}>
              {STRINGS.buttonGrid.DIAGNOSIS}
            </Typography>
            <CardLayout className={classes.cardLayoutStyle}>
              <Diagnosis
                diagnosisList={diagnosisList}
                newDiagnosisList={values.diagnosisList}
                loading={loading}
                handleAddDiagnosisItem={handleAddDiagnosisItem}
                handleDeleteDiagnosisItem={handleDeleteDiagnosisItem}
            />
            </CardLayout>
            <Typography className={classes.diagnosisTitleStyle}>
              {STRINGS.buttonGrid.REQUESTS}
            </Typography>
            <CardLayout className={classes.cardLayoutStyle}>
              <Requests
                requestList={requestList}
                newRequestList={values.requestList}
                loading={loading}
                handleAddRequestItem={handleAddRequestItem}
                handleDeleteRequestItem={handleDeleteRequestItem}
            />
            </CardLayout>

            <span id="images-request-form-button-span" className={classes.buttonPanel}>
              <Button
                variant="text"
                color="primary"
                disabled={loading}
                onClick={handleClose}
            >
                {STRINGS.allergies.CANCEL}
              </Button>
              <Button
                className={classes.saveButton}
                type="submit"
                variant="text"
                color="primary"
                disabled={loading}>
                {STRINGS.allergies.SAVE}
              </Button>
            </span>
          </form>}
    </div>
  );
}
