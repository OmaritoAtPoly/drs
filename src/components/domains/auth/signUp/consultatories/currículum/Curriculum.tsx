import { Button, makeStyles, TextField, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";

interface Props {
  handleSubmitValues: (values: string) => void;
  loading?: boolean;
}

const ValidationCurriculumSchema = yup.object().shape({
  curriculum: yup.string().required(STRINGS.error.FIELD_REQUIRED),
});

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  search: {
    margin: "10px",
    width: "200px",
  },
  autoComplete: {
    padding: 0,
  },
  textFieldStyle: {
    display: "flex",
    marginTop: "15px",
    flexDirection: "column",
  },
  buttonStyle: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: "10px",
  },
  errorStyle: {
    color: theme.palette.error.main,
    fontSize: "12px",
    paddingLeft: "20px",
  },
  input: {
    marginLeft: "14px",
    marginRight: "14px",
  },
  labelStyle: {
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
  },
  width: {
    width: 500,
  },
});

const Curriculum = ({ handleSubmitValues, loading = false }: Props) => {
  const classes = styles();
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
  } = useFormik({
    validationSchema: ValidationCurriculumSchema,
    initialValues: {
      curriculum: "",
    },
    onSubmit: () => {
      handleSubmitValues(values.curriculum.trim());
    },
  });

  return (
    <form onSubmit={handleSubmit} className={classes.width}>
      <div className={classes.textFieldStyle}>
        <Typography className={classes.labelStyle}>
          {STRINGS.signUp.CURRICULUM_DESCRIPTION}
        </Typography>
        <TextField
          className={classes.input}
          type="text"
          id="curriculum"
          error={!!(errors.curriculum && touched.curriculum)}
          name="curriculum"
          label={
            errors.curriculum && touched.curriculum
              ? STRINGS.error.ERROR
              : STRINGS.signUp.CURRICULUM
          }
          helperText={
            errors.curriculum && touched.curriculum
              ? errors.curriculum
              : STRINGS.signUp.LIFE_WORK
          }
          placeholder={STRINGS.signUp.CURRICULUM}
          value={values.curriculum}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          margin="dense"
          multiline
          rows={4}
        />
      </div>
      <div className={classes.buttonStyle}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}>
          {STRINGS.generals.ADD}
        </Button>
      </div>
    </form>
  );
};

export default Curriculum;
