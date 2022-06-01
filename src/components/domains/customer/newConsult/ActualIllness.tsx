import {
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";
import TitleCard from "../../../cards/TitleCard";
import Editor from "../../../inputs/Editor";
import LoadingWrapper from "../../../LoadingWrapper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: "#323232",
      fontSize: "15px",
      lineHeight: "20px",
      fontWeight: "bold",
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1),
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      color: "#828282",
    },
    cardStyle: {
      marginLeft: theme.spacing(0.4),
    },
    bodyCardStyle: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    button: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    hidden: {
      display: "none",
    },
  }),
);

interface Props {
  data: Schemas.AppointmentRecordResponse;
  onSubmit: (values: Schemas.AppointmentRecordResponse) => void;
  loading?: boolean;
  loadingData?: boolean;
  readOnly?: boolean;
}
const ActualIllness = ({
  onSubmit,
  data,
  loading,
  loadingData,
  readOnly = false,
}: Props) => {
  const classes = useStyles();

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: data,
    enableReinitialize: true,
    onSubmit,
  });
  const handleHistoryIllness = useCallback(
    (value: string) => {
      setFieldValue("currentDiseaseHistory[0]", value, true);
    },
    [setFieldValue],
  );

  return (
    <TitleCard
      title={STRINGS.newConsult.ACTUAL_ILLNESS}
      onClick={() => {}}
      classTitle={classes.cardStyle}>
      <LoadingWrapper loading={loadingData}>
        <div>
          <form>
            <div className={classes.bodyCardStyle}>
              <div className={classes.formGroup}>
                <Typography className={classes.title}>
                  {STRINGS.newConsult.MOTIVE_CONSUL}
                </Typography>
                <TextField
                  name="reason"
                  value={values.reason}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="outlined"
                  margin="dense"
                  inputProps={{
                    readOnly,
                  }}
                  autoFocus
                />
              </div>
              <div>
                <Typography className={classes.title}>
                  {STRINGS.newConsult.HISTORY_ILLNESS}
                </Typography>
                <Editor
                  minEditorHeight={100}
                  htmlValue={
                    values.currentDiseaseHistory &&
                    values.currentDiseaseHistory.length
                      ? values.currentDiseaseHistory[0]
                      : undefined
                  }
                  onHtmlValueChange={handleHistoryIllness}
                  readOnly={readOnly}
                  loading={loadingData}
                />
              </div>
              <div
                className={readOnly ? classes.hidden : classes.buttonContainer}>
                <PrimaryButton
                  loading={loading}
                  variant="contained"
                  className={classes.button}
                  label={STRINGS.allergies.SAVE}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onClick={handleSubmit as any}
                />
              </div>
            </div>
          </form>
        </div>
      </LoadingWrapper>
    </TitleCard>
  );
};
export default ActualIllness;
