/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles } from "@material-ui/core";
import { FormikErrors } from "formik";
import React from "react";
import theme from "../../../../../styles/theme";
import CurriculumCreatorList from "../consultatories/currículum/CurriculumCreatorList";
import HospitalCenter from "../consultatories/hospitals/HospitalCenter";
import AboutMe from "../consultatories/profileComponents/AboutMe";

interface Props {
  errors: FormikErrors<Schemas.ProfessionalRequest>;
  touched: FormikErrors<Schemas.ProfessionalData>;
  handleBlur: (e: React.FocusEvent<unknown>) => void;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
  values: Schemas.ProfessionalRequest;
  operationDataLoading?: boolean;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void> | Promise<FormikErrors<Schemas.ProfessionalRequest>>;
}

const styles = makeStyles({
  container: {
    marginBottom: 20,
    marginTop: 25,
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
});

export default function ProfessionalProfileData({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  errors,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  touched,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleBlur,
  handleChange,
  values,
  setFieldValue,
  operationDataLoading,
}: Props) {
  const classes = styles();

  return (
    <div className={classes.container}>
      <div className={classes.rowInput}>
        <AboutMe aboutMe={values.aboutMe || ""} handleChange={handleChange} />
      </div>
      <div className={classes.rowInput}>
        <div className={`${classes.formGroup} ${classes.marginTop}`}>
          <CurriculumCreatorList
            loading={operationDataLoading}
            fieldName="curriculum"
            setFieldValue={setFieldValue}
            curriculumList={values.curriculum || []}
          />
        </div>
        <div className={`${classes.formGroup} ${classes.marginTop}`}>
          <HospitalCenter
            newHospitals={values.hospitals || []}
            setFieldValue={setFieldValue}
          />
        </div>
      </div>
    </div>
  );
}
