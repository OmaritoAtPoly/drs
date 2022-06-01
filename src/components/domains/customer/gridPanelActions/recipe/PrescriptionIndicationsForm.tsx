import {
  Card,
  FormControlLabel,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { useFormik } from "formik";
import { debounce as debounceLodash } from "lodash";
import React, { ChangeEvent, useCallback, useMemo } from "react";
import * as yup from "yup";
import theme from "../../../../../styles/theme";
import {
  defaultPrescriptionItemRequest,
  duration,
  hoursFrequency,
  presentationData,
  viaData,
} from "../../../../../utils/defaultData";
import STRINGS from "../../../../../utils/strings";
import Icon from "../../../../Icon/Icon";
import Autocomplete from "../../../../inputs/Search/Autocomplete";
import ToolTipWrapper from "../../../../wrappers/ToolTipWrapper";
import ListItemRecipe from "./ListItemRecipe";

const useStyles = makeStyles({
  content: {
    padding: theme.spacing(3),
  },
  left: {
    flex: 0.5,
    paddingRight: 5,
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
  },
  rowMain: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(2),
  },
  formGroup: {
    display: "flex",
    color: "#828282",
  },
  generic: {
    flex: 0.33,
    marginRight: 5,
  },
  presentation: {
    flex: 0.668,
    marginTop: theme.spacing(0.8),
  },
  via: {
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(0.8),
    flex: 0.3,
    display: "flex",
    flexDirection: "column",
  },
  hoursFrequency: {
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(0.8),
    display: "flex",
    color: "#828282",
    flex: 0.3,
    flexDirection: "column",
  },
  duration: {
    marginRight: theme.spacing(0.5),
    marginTop: theme.spacing(0.8),
    color: "#828282",
    display: "flex",
    flex: 0.25,
    flexDirection: "column",
  },
  dose: {
    marginRight: theme.spacing(0.5),
    display: "flex",
    color: "#828282",
    flex: 0.15,
  },
  medicine: {
    flex: 0.33,
    marginRight: 5,
  },
  concentration: {
    flex: 0.33,
  },
  title: {
    marginTop: theme.spacing(3),
  },
  indications: {
    display: "flex",
    flexDirection: "row",
  },
  divList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  button: {
    display: "flex",
    width: 30,
    height: 30,
  },
  text: {
    display: "flex",
    width: "100%",
  },
  notes: {
    width: "100%",
  },
  rowLast: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  buttonAdd: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    flex: 0.5,
    paddingLeft: 5,
    display: "flex",
    flexDirection: "column",
  },
  rightColumn: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  rowRight: {
    display: "flex",
    flexDirection: "row",
  },
  lastRow: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
  quantity: {
    display: "flex",
    flex: 0.33,
    marginLeft: 8,
  },
  full: {
    width: "100%",
  },
  errorStyle: {
    color: theme.palette.error.main,
    display: "flex",
    fontSize: "12px",
    marginLeft: 15,
  },
  circular: {
    borderRadius: 50,
  },
  popperStyle: {
    // todo Add this color to pallette
    color: "#828282",
    backgroundColor: "#d6e3f3",
    width: "60px",
    textAlign: "center",
  },
});

const validationSchema = yup.object().shape({
  currentItem: yup.object().shape({
    freeIndication: yup.string(),
    quantity: yup
      .number()
      .test(
        "",
        STRINGS.error.MUST_BE_GREATER_THAN_CERO,
        (value) => value !== undefined && value !== null && value > 0,
      )
      .typeError(STRINGS.error.ONLY_NUMBERS)
      .required(STRINGS.error.REQUIRED),
    hoursFrequency: yup
      .number()
      .typeError(STRINGS.error.ONLY_NUMBERS)
      .when("freeIndication", {
        is: "false",
        then: yup.number().required(STRINGS.error.REQUIRED),
        otherwise: yup.number().notRequired(),
      }),
    duration: yup
      .number()
      .typeError(STRINGS.error.ONLY_NUMBERS)
      .when("freeIndication", {
        is: "false",
        then: yup.number().required(STRINGS.error.REQUIRED),
        otherwise: yup.number().notRequired(),
      }),
    via: yup.string().when("freeIndication", {
      is: "false",
      then: yup.string().required(STRINGS.error.REQUIRED),
      otherwise: yup.string().notRequired(),
    }),
    doseMg: yup
      .number()
      .typeError(STRINGS.error.ONLY_NUMBERS)
      .when("freeIndication", {
        is: "false",
        then: yup
          .number()
          .test(
            "",
            STRINGS.error.MUST_BE_GREATER_THAN_CERO,
            (value) => value !== undefined && value !== null && value > 0,
          )
          .typeError(STRINGS.error.ONLY_NUMBERS)
          .required(STRINGS.error.REQUIRED),
        otherwise: yup.number().notRequired(),
      }),
    notes: yup.string().when("freeIndication", {
      is: "true",
      then: yup.string().required(STRINGS.error.REQUIRED),
      otherwise: yup.string().notRequired(),
    }),
    presentation: yup.string().required(STRINGS.error.REQUIRED),
    genericMedicine: yup.string().required(STRINGS.error.REQUIRED),
  }),
});

interface Props {
  items: Schemas.PrescriptionItemRequest[];
  setFieldValue: (
    field: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  readOnly?: boolean;
}

const PrescriptionIndicationsForm = ({
  items,
  setFieldValue: setFieldValueProp,
  readOnly = false,
}: Props) => {
  const classes = useStyles();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue: setFieldValueLocal,
  } = useFormik({
    initialValues: {
      items,
      currentItem: {
        ...defaultPrescriptionItemRequest,
        freeIndication: "false",
      },
      indexToEdit: -1,
      presentationFilter: "",
      viaFilter: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (val, actions) => {
      const newVal: Schemas.PrescriptionItemRequest =
        val.currentItem.freeIndication === "true"
          ? {
              ...val.currentItem,
              via: undefined,
              doseMg: undefined,
              hoursFrequency: undefined,
              duration: undefined,
            }
          : { ...val.currentItem, notes: undefined };
      setFieldValueProp(
        `recipes.items[${
          val.indexToEdit === -1 ? val.items.length : val.indexToEdit
        }]`,
        newVal,
        true,
      );
      actions.resetForm();
    },
  });

  const prescriptionResult = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      values.presentationFilter !== ""
        ? presentationData.filter((data) =>
            data.value
              .toLowerCase()
              .includes(values.presentationFilter.toLowerCase()),
          )
        : presentationData,
    [values.presentationFilter],
  );

  const viaResult = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      values.viaFilter !== ""
        ? viaData.filter((data) =>
            data.value.toLowerCase().includes(values.viaFilter.toLowerCase()),
          )
        : viaData,
    [values.viaFilter],
  );

  const handleOnEdit = useCallback(
    (currentItem: Schemas.PrescriptionItemRequest, index: number) => {
      currentItem.notes
        ? setFieldValueLocal(
            "currentItem",
            {
              ...currentItem,
              doseMg: "",
              hoursFrequency: "",
              duration: "",
              via: "",
              freeIndication: "true",
            },
            true,
          )
        : setFieldValueLocal(
            "currentItem",
            { ...currentItem, notes: "", freeIndication: "false" },
            true,
          );
      setFieldValueLocal("indexToEdit", index, true);
    },
    [setFieldValueLocal],
  );

  const onDebounceCallBack = useMemo(
    () =>
      debounceLodash((notes: string, index: number) => {
        setFieldValueProp(`recipes.items[${index}].notes`, notes, true);
      }, 500),
    [setFieldValueProp],
  );

  const handleNotes = useCallback(
    (notes: string, index: number) => {
      onDebounceCallBack(notes, index);
    },
    [onDebounceCallBack],
  );

  const filterOptionsSimple = createFilterOptions({
    stringify: (option: { value: string; label: string }) =>
      `${option.label} ${option.value}`,
  });
  const handleChangeSimple = useCallback(
    (name: string) => (value?: { label: string; value: string }) => {
      setFieldValueLocal(name, value?.value || "", true);
    },
    [setFieldValueLocal],
  );

  const handleVia = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFieldValueLocal("currentItem.via", event.target.value, true);
    },
    [setFieldValueLocal],
  );
  const handlePresentation = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFieldValueLocal("currentItem.presentation", event.target.value);
    },
    [setFieldValueLocal],
  );

  const handleDelete = useCallback(
    (index: number) => {
      const valueRemaining = [...values.items];
      valueRemaining.splice(index, 1);
      setFieldValueProp("recipes.items", valueRemaining, true);
    },
    [setFieldValueProp, values.items],
  );

  const onDebouncePresentationSearchCallBack = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: React.ChangeEvent<any>) => {
      setFieldValueLocal("presentationFilter", e.target.value);
    },
    [setFieldValueLocal],
  );

  const onDebounceViaSearchCallBack = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: React.ChangeEvent<any>) => {
      setFieldValueLocal("viaFilter", e.target.value);
    },
    [setFieldValueLocal],
  );

  const handleChangeRadioGroup = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
      handleChange(event);
      if (value === "true") {
        setFieldValueLocal("currentItem.via", undefined, true);
        setFieldValueLocal("currentItem.doseMg", undefined, true);
        setFieldValueLocal("currentItem.hoursFrequency", undefined, true);
        setFieldValueLocal("currentItem.duration", undefined, true);
      } else {
        setFieldValueLocal("currentItem.notes", undefined, true);
      }
    },
    [handleChange, setFieldValueLocal],
  );

  return (
    <form onSubmit={handleSubmit}>
      <RadioGroup
        name="currentItem.freeIndication"
        value={values.currentItem.freeIndication}
        onChange={handleChangeRadioGroup}>
        <div>
          {!readOnly && (
            <div className={classes.rowMain}>
              <div className={classes.left}>
                <Typography id="request-value" className={classes.title}>
                  {STRINGS.recipe.PRESCRIPTION}
                </Typography>
                <div className={classes.row}>
                  <div className={classes.generic}>
                    <TextField
                      autoFocus={false}
                      className={classes.full}
                      name="currentItem.genericMedicine"
                      error={
                        !!(
                          errors.currentItem?.genericMedicine &&
                          touched.currentItem?.genericMedicine
                        )
                      }
                      helperText={
                        errors.currentItem?.genericMedicine &&
                        touched.currentItem?.genericMedicine
                          ? errors.currentItem?.genericMedicine
                          : ""
                      }
                      placeholder={STRINGS.recipe.GENERIC_CONCENTRATION}
                      value={values.currentItem.genericMedicine || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      margin="dense"
                    />
                  </div>
                  <div className={classes.medicine}>
                    <TextField
                      autoFocus={false}
                      className={classes.full}
                      name="currentItem.medicine"
                      error={
                        !!(
                          errors.currentItem?.medicine &&
                          touched.currentItem?.medicine
                        )
                      }
                      helperText={
                        errors.currentItem?.medicine &&
                        touched.currentItem?.medicine
                          ? errors.currentItem?.medicine
                          : ""
                      }
                      placeholder={STRINGS.recipe.COMMERCIAL_CONCENTRATION}
                      value={values.currentItem?.medicine || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      margin="dense"
                    />
                  </div>
                  <div className={classes.concentration}>
                    <TextField
                      autoFocus={false}
                      className={classes.full}
                      name="currentItem.concentration"
                      error={
                        !!(
                          errors.currentItem?.concentration &&
                          touched.currentItem?.concentration
                        )
                      }
                      helperText={
                        errors.currentItem?.concentration &&
                        touched.currentItem?.concentration
                          ? errors.currentItem?.concentration
                          : ""
                      }
                      placeholder={STRINGS.recipe.CONCENTRATION}
                      value={values.currentItem?.concentration || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      margin="dense"
                    />
                  </div>
                </div>
                <div className={classes.lastRow}>
                  <div className={classes.presentation}>
                    <Autocomplete
                      className={classes.full}
                      options={prescriptionResult}
                      getOptionLabel={
                        (option: { label: string; value: string }) =>
                          option.label
                        // eslint-disable-next-line react/jsx-curly-newline
                      }
                      filterOptions={filterOptionsSimple}
                      freeSolo
                      autoComplete={false}
                      notIcon
                      onChange={handleChangeSimple("currentItem.presentation")}
                      inputProps={{
                        autoComplete: "off",
                        placeholder: STRINGS.recipe.PRESENTATION,
                        onChange: handlePresentation,
                        autoFocus: false,
                      }}
                      value={{ label: values.currentItem.presentation }}
                      onDebounce={onDebouncePresentationSearchCallBack}
                    />
                    {errors.currentItem?.presentation &&
                      touched.currentItem?.presentation && (
                        <Typography className={classes.errorStyle}>
                          {errors.currentItem?.presentation}
                        </Typography>
                      )}
                  </div>
                  <div className={classes.quantity}>
                    <TextField
                      autoFocus={false}
                      classes={{ root: classes.full }}
                      // className={classes.full}
                      name="currentItem.quantity"
                      type="number"
                      error={
                        !!(
                          errors.currentItem?.quantity &&
                          touched.currentItem?.quantity
                        )
                      }
                      helperText={
                        errors.currentItem?.quantity &&
                        touched.currentItem?.quantity
                          ? errors.currentItem?.quantity
                          : ""
                      }
                      placeholder={STRINGS.recipe.AMOUNT}
                      value={values.currentItem.quantity || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outlined"
                      margin="dense"
                    />
                  </div>
                </div>
              </div>
              <div className={classes.right}>
                <Typography id="request-value" className={classes.title}>
                  {STRINGS.recipe.INDICATIONS}
                </Typography>
                <div className={classes.rowRight}>
                  <div className={classes.rightColumn}>
                    <div className={classes.row}>
                      <FormControlLabel
                        value={false}
                        control={
                          <Radio
                            checked={
                              values.currentItem.freeIndication === "false"
                            }
                          />
                        }
                        label=""
                      />
                      <div className={classes.via}>
                        <Autocomplete
                          disabled={
                            values.currentItem.freeIndication === "true"
                          }
                          options={viaResult}
                          getOptionLabel={
                            (option: { label: string; value: string }) =>
                              option.label
                            // eslint-disable-next-line react/jsx-curly-newline
                          }
                          filterOptions={filterOptionsSimple}
                          freeSolo
                          autoComplete={false}
                          notIcon
                          onChange={handleChangeSimple("currentItem.via")}
                          inputProps={{
                            autoComplete: "off",
                            placeholder: STRINGS.recipe.WAY_ADMINISTRATION,
                            onChange: handleVia,
                            autoFocus: false,
                          }}
                          value={{ label: values.currentItem.via }}
                          className={classes.full}
                          onDebounce={onDebounceViaSearchCallBack}
                        />
                        {errors.currentItem?.via &&
                          touched.currentItem?.via && (
                            <Typography className={classes.errorStyle}>
                              {errors.currentItem?.via}
                            </Typography>
                          )}
                      </div>
                      <div className={classes.dose}>
                        <TextField
                          autoFocus={false}
                          disabled={
                            values.currentItem.freeIndication === "true"
                          }
                          name="currentItem.doseMg"
                          type="number"
                          error={
                            !!(
                              errors.currentItem?.doseMg &&
                              touched.currentItem?.doseMg
                            )
                          }
                          helperText={
                            errors.currentItem?.doseMg &&
                            touched.currentItem?.doseMg
                              ? errors.currentItem?.doseMg
                              : ""
                          }
                          placeholder={STRINGS.recipe.DOSE}
                          value={values.currentItem?.doseMg || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          margin="dense"
                        />
                      </div>
                      <div className={classes.hoursFrequency}>
                        <Autocomplete
                          disabled={
                            values.currentItem.freeIndication === "true"
                          }
                          className={classes.full}
                          options={hoursFrequency}
                          getOptionLabel={
                            (option: { value: number; label: string }) =>
                              option.label
                            // eslint-disable-next-line react/jsx-curly-newline
                          }
                          filterOptions={filterOptionsSimple}
                          freeSolo
                          autoComplete={false}
                          notIcon
                          onChange={handleChangeSimple(
                            "currentItem.hoursFrequency",
                          )}
                          inputProps={{
                            autoComplete: "off",
                            placeholder: STRINGS.recipe.FREQUENCY,
                            onChange: handlePresentation,
                            autoFocus: false,
                          }}
                          value={{
                            label:
                              hoursFrequency.find(
                                (h) =>
                                  h.value === values.currentItem.hoursFrequency,
                              )?.label || "",
                            value: values.currentItem.hoursFrequency,
                          }}
                        />
                        {errors.currentItem?.hoursFrequency &&
                          touched.currentItem?.hoursFrequency && (
                            <Typography className={classes.errorStyle}>
                              {errors.currentItem?.hoursFrequency}
                            </Typography>
                          )}
                      </div>
                      <div className={classes.duration}>
                        <Autocomplete
                          disabled={
                            values.currentItem.freeIndication === "true"
                          }
                          className={classes.full}
                          options={duration}
                          getOptionLabel={
                            (option: { value: number; label: string }) =>
                              option.label
                            // eslint-disable-next-line react/jsx-curly-newline
                          }
                          filterOptions={filterOptionsSimple}
                          freeSolo
                          autoComplete={false}
                          notIcon
                          onChange={handleChangeSimple("currentItem.duration")}
                          inputProps={{
                            autoComplete: "off",
                            placeholder: STRINGS.recipe.DURATION,
                            onChange: handlePresentation,
                            autoFocus: false,
                          }}
                          value={{
                            label:
                              duration.find(
                                (h) => h.value === values.currentItem.duration,
                              )?.label || "",
                            value: values.currentItem.duration,
                          }}
                        />
                        {errors.currentItem?.duration &&
                          touched.currentItem?.duration && (
                            <Typography className={classes.errorStyle}>
                              {errors.currentItem?.duration}
                            </Typography>
                          )}
                      </div>
                    </div>
                    <div className={classes.rowLast}>
                      <FormControlLabel
                        value
                        control={
                          <Radio
                            checked={
                              values.currentItem.freeIndication === "true"
                            }
                          />
                        }
                        label=""
                      />
                      <div className={classes.text}>
                        <TextField
                          autoFocus={false}
                          disabled={
                            values.currentItem.freeIndication === "false"
                          }
                          name="currentItem.notes"
                          error={
                            !!(
                              errors.currentItem?.notes &&
                              touched.currentItem?.notes
                            )
                          }
                          helperText={
                            errors.currentItem?.notes &&
                            touched.currentItem?.notes
                              ? errors.currentItem?.notes
                              : ""
                          }
                          placeholder={STRINGS.recipe.REDACT_INDICATIONS}
                          value={values.currentItem?.notes || ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                          margin="dense"
                          className={classes.notes}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={classes.buttonAdd}>
                    <ToolTipWrapper
                      classes={{ tooltipPlacementTop: classes.popperStyle }}
                      title={STRINGS.generals.ADD}
                      arrow
                      placement="top">
                      <Card className={classes.circular}>
                        <IconButton
                          color="primary"
                          className={classes.button}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          onClick={handleSubmit as any}>
                          <Icon name="circleChecked" width={15} height={17} />
                        </IconButton>
                      </Card>
                    </ToolTipWrapper>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className={classes.divList}>
            <ListItemRecipe
              items={values.items}
              handleDelete={handleDelete}
              onEdit={handleOnEdit}
              handleOnChangeNotes={handleNotes}
              readOnly={readOnly}
              hoursFrequency={
                hoursFrequency as { value: number; label: string }[]
              }
              duration={duration as { value: number; label: string }[]}
            />
          </div>
        </div>
      </RadioGroup>
    </form>
  );
};

export default PrescriptionIndicationsForm;
