/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { FormikErrors } from "formik";
import React, { useCallback, useState } from "react";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";
import { MapData, ValueAndLabelType } from "../../../../../utils/types";
import AutocompleteMapDialog from "../../../../maps/AutocompleteMapDialog";
import HealthCenterList from "../consultatories/healthCenter/HealthCenterList";
import InsuranceCreatorList from "../consultatories/insurances/InsuranceCreatorList";
import PhoneCreatorList from "../consultatories/phones/PhoneCreatorList";

interface Props {
  errors: FormikErrors<Schemas.ProfessionalRequest>;
  touched: FormikErrors<Schemas.ProfessionalData>;
  handleBlur: (e: React.FocusEvent<unknown>) => void;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
  values: Schemas.ProfessionalRequest;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Schemas.ProfessionalRequest>>;
  contactPerson: ValueAndLabelType[];
  purePhoneTypes?: ValueAndLabelType[];
  pureInsurances: Schemas.HealthInsuranceData[];
  onlyPhone?: boolean;
  showPhoneField?: boolean;
  showLegalField?: boolean;
}

const styles = makeStyles({
  container: {
    marginBottom: 20,
    marginTop: 25,
  },
  onlyPhoneContainer: {
    marginBottom: 20,
  },
  rowInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    width: "48%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    color: "#828282",
  },
  marginTop: {
    marginTop: 6,
  },
  errorStyle: {
    color: theme.palette.error.main,
    display: "flex",
    fontSize: "12px",
    marginLeft: 15,
  },
  full: {
    width: "100%",
  },
  titleStyle: {
    display: "flex",
    color: theme.palette.primary.main,
    fontSize: "1rem",
    [theme.breakpoints.down("xs")]: {
      width: "60%",
    },
  },
  buttonStyle: {
    display: "flex",
    alignSelf: "center",
    width: "100%",
    marginTop: 2,
    height: 40,
  },
});

export default function ContactData({
  errors,
  touched,
  handleBlur,
  handleChange,
  values,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFieldValue,
  contactPerson,
  purePhoneTypes = [],
  pureInsurances = [],
  onlyPhone = false,
  showPhoneField = true,
  showLegalField = true,
}: Props) {
  const classes = styles();
  const [specialtyOpen, setSpecialtyOpen] = useState(false);

  const handleHealthCenterMap = useCallback(() => {
    setSpecialtyOpen(!specialtyOpen);
  }, [specialtyOpen]);

  const handleChangeHealthCenter = useCallback(
    (value?: Schemas.ProfessionalHealthCenterRequest) => {
      if (value) {
        setFieldValue(
          "healthCenters",
          values.healthCenters ? [...values.healthCenters, value] : [value],
        );
        setFieldValue("city", value.city);
        setFieldValue("province", value.province);
        setFieldValue("country", value.country);
      }
    },
    [setFieldValue, values.healthCenters],
  );

  const onSaveHealthCenter = useCallback(
    (data: MapData) => {
      const newHealthCenter = {
        ...data,
        latitude: data.markerPosition.lat,
        longitude: data.markerPosition.lng,
      } as Schemas.ProfessionalHealthCenterRequest;
      handleChangeHealthCenter(newHealthCenter);
      handleHealthCenterMap();
    },
    [handleChangeHealthCenter, handleHealthCenterMap],
  );

  const onPressDelete = useCallback(
    (value: Schemas.ProfessionalHealthCenterRequest) => {
      const valueRemaining = values.healthCenters?.filter(
        (a) => a.code !== value.code,
      );
      setFieldValue("healthCenters", valueRemaining);
    },
    [setFieldValue, values.healthCenters],
  );

  const onAddPhone = useCallback(
    (value: Schemas.PhoneRequest) => {
      const noEmptyPhones = values.phones?.filter((a) => a.number !== "");
      setFieldValue(
        "phones",
        noEmptyPhones ? [...noEmptyPhones, value] : [values],
      );
    },
    [values, setFieldValue],
  );

  const onAddInsurance = useCallback(
    (value: string) => {
      setFieldValue(
        "insurances",
        values.insurances ? [...values.insurances, value] : [value],
      );
    },
    [setFieldValue, values.insurances],
  );

  return (
    <div
      className={!onlyPhone ? classes.container : classes.onlyPhoneContainer}>
      {!onlyPhone && (
        <div className={classes.rowInput}>
          <div className={classes.formGroup}>
            <HealthCenterList
              healthCenters={values.healthCenters || []}
              onDelete={onPressDelete}
            />
            <Button
              className={classes.buttonStyle}
              onClick={handleHealthCenterMap}
              variant="outlined">
              {STRINGS.signUp.CHOOSE_CONSULTING_ROOM}
            </Button>
            <AutocompleteMapDialog
              label={STRINGS.signUp.ADD_CONSULTING_ROOM}
              open={specialtyOpen}
              handleShow={handleHealthCenterMap}
              onSave={onSaveHealthCenter}
            />
          </div>
          {showLegalField && (
            <div className={classes.formGroup}>
              <Typography className={classes.titleStyle}>
                {STRINGS.signUp.WRITE_YOUR_PROFESSIONAL_ID}
              </Typography>
              <TextField
                type="text"
                id="professionalID"
                error={!!(errors.professionalID && touched.professionalID)}
                name="professionalID"
                label={
                  errors.professionalID && touched.professionalID
                    ? STRINGS.error.ERROR
                    : STRINGS.signUp.WRITE_YOUR_PROFESSIONAL_ID_REQUIRED
                }
                helperText={
                  errors.professionalID && touched.professionalID
                    ? errors.professionalID
                    : ""
                }
                placeholder={STRINGS.signUp.WRITE_YOUR_PROFESSIONAL_ID_REQUIRED}
                value={values.professionalID}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                margin="dense"
              />
            </div>
          )}
        </div>
      )}
      <div className={classes.rowInput}>
        {!onlyPhone && (
          <div
            className={`${classes.formGroup} ${
              !onlyPhone ? classes.marginTop : ""
            }`}>
            <InsuranceCreatorList
              insuranceValue={values.insurances || []}
              onAddInsurance={onAddInsurance}
              setFieldValue={setFieldValue}
              insurances={pureInsurances}
              errors={errors}
            />
          </div>
        )}
        {showPhoneField && (
          <div
            className={`${classes.formGroup} ${
              !onlyPhone ? classes.marginTop : ""
            }`}>
            <PhoneCreatorList
              contactPerson={contactPerson}
              purePhoneTypes={purePhoneTypes}
              onAddPhone={onAddPhone}
              setFieldValue={setFieldValue}
              phones={values.phones || []}
              errors={errors}
            />
          </div>
        )}
      </div>
    </div>
  );
}
