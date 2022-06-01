/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createStyles,
  Divider,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useCallback } from "react";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";
import TitleCard from "../../../cards/TitleCard";
import Editor from "../../../inputs/Editor";
import Autocomplete from "../../../inputs/Search/Autocomplete";

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
      flexDirection: "row",
      width: "100%",
      color: "#828282",
      border: "1px solid #D6E3F3",
    },
    cardStyle: {
      marginLeft: theme.spacing(0.4),
    },
    padding: {
      padding: theme.spacing(2),
    },
    firstSearch: {
      width: "35%",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    secondSearch: {
      width: "35%",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    itemsContainer: {
      display: "flex",
      flexDirection: "column",
      marginTop: theme.spacing(2),
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(2),
    },
    button: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    marginTop: {
      marginTop: theme.spacing(2),
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
  appointmentOperationData?: Schemas.AppointmentOperationData;
  readOnly?: boolean;
}

const PhysicalExam = ({
  onSubmit,
  data,
  loading,
  appointmentOperationData,
  readOnly = false,
}: Props) => {
  const classes = useStyles();
  const { values, handleSubmit, setFieldValue } = useFormik({
    initialValues: data,
    onSubmit,
    enableReinitialize: true,
  });

  const handleChangeAnyValue = useCallback(
    (name: string) => (value?: any) => {
      setFieldValue(name, value, true);
    },
    [setFieldValue],
  );

  const handleChangeSimple = useCallback(
    (name: string) => (valuesLocal: any[]) => {
      const newValues = {} as any;
      valuesLocal.forEach((v) => {
        newValues[v] = "";
      });
      setFieldValue(name, newValues, true);
    },
    [setFieldValue],
  );

  const getOptionLabel = useCallback(
    (fullValues: any) => (option: any) => {
      const filtered = Object.keys(fullValues).find((f) => f === option);
      return fullValues && filtered ? fullValues[filtered as any] : "";
    },
    [],
  );

  const onSubmitCallBack = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <TitleCard
      classNameContent={classes.padding}
      title={STRINGS.newConsult.PHYSICAL_EXAM}
      onClick={() => {}}
      classTitle={classes.cardStyle}>
      <div>
        <div className={classes.formGroup}>
          <div className={classes.firstSearch}>
            <Autocomplete
              options={Object.keys(
                appointmentOperationData?.physicalExamBySystem || {},
              )}
              getOptionLabel={getOptionLabel(
                appointmentOperationData?.physicalExamBySystem || {},
              )}
              notIcon
              onChange={handleChangeSimple("physicalExamBySystem")}
              inputProps={{
                autoComplete: "off",
                placeholder: STRINGS.newConsult.EXPLORATION_BY_SYSTEM,
                autoFocus: false,
              }}
              value={Object.keys(values.physicalExamBySystem || {})}
              multiple
              disabled={readOnly}
            />
          </div>
          <Divider orientation="vertical" flexItem />
          <div className={classes.secondSearch}>
            <Autocomplete
              options={Object.keys(
                appointmentOperationData?.physicalExamByBody || {},
              )}
              getOptionLabel={getOptionLabel(
                appointmentOperationData?.physicalExamByBody || {},
              )}
              notIcon
              onChange={handleChangeSimple("physicalExamByBody")}
              inputProps={{
                autoComplete: "off",
                placeholder: STRINGS.newConsult.TOPOGRAPHIC_EXPLORATION,
                autoFocus: false,
              }}
              value={Object.keys(values.physicalExamByBody || {})}
              multiple
              disabled={readOnly}
            />
          </div>
        </div>
        <div className={classes.marginTop}>
          <Editor
            minEditorHeight={100}
            htmlValue={
              values.physicalExam && values.physicalExam.length
                ? values.physicalExam[0]
                : undefined
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onHtmlValueChange={handleChangeAnyValue("physicalExam[0]")}
            readOnly={readOnly}
          />
        </div>
        {Object.keys(values.physicalExamBySystem || {}).map((v) => (
          <div className={classes.itemsContainer}>
            <Typography className={classes.title}>
              {getOptionLabel(
                appointmentOperationData?.physicalExamBySystem || {},
              )(v)}
            </Typography>
            <Editor
              minEditorHeight={100}
              htmlValue={
                values.physicalExamBySystem
                  ? values.physicalExamBySystem[v]
                  : undefined
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onHtmlValueChange={(contentState: string) => {
                setFieldValue(`physicalExamBySystem[${v}]`, contentState, true);
              }}
              readOnly={readOnly}
            />
          </div>
        ))}
        {Object.keys(values.physicalExamByBody || {}).map((v) => (
          <div className={classes.itemsContainer}>
            <Typography className={classes.title}>
              {getOptionLabel(
                appointmentOperationData?.physicalExamByBody || {},
              )(v)}
            </Typography>
            <Editor
              minEditorHeight={100}
              htmlValue={
                values.physicalExamByBody
                  ? values.physicalExamByBody[v]
                  : undefined
              }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onHtmlValueChange={(contentState: string) => {
                setFieldValue(`physicalExamByBody[${v}]`, contentState, true);
              }}
              readOnly={readOnly}
            />
          </div>
        ))}
      </div>
      <div className={readOnly ? classes.hidden : classes.buttonContainer}>
        <PrimaryButton
          loading={loading}
          variant="contained"
          className={classes.button}
          label={STRINGS.allergies.SAVE}
          onClick={onSubmitCallBack}
        />
      </div>
    </TitleCard>
  );
};
export default PhysicalExam;
