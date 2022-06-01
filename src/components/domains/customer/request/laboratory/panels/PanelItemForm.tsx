import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
} from "@material-ui/core";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useCallback } from "react";
import STRINGS from "../../../../../../utils/strings";

const styles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  actionSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  saveButton: {
    fontWeight: "bold",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  items: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "justify-left",
  },
  item: {
    width: 190,
    display: "flex",
  },
}));

interface Props {
  initialValue: Schemas.CategoryExamData[];
  options: Schemas.CategoryExamData[];
  handleAddRequestItemFromModal: (
    categories: Schemas.CategoryExamData[],
  ) => void;
}

export default function PanelItemForm({
  initialValue,
  handleAddRequestItemFromModal,
  options,
}: Props) {
  const classes = styles();
  const formik = useFormik({
    initialValues: { categories: initialValue || [] },
    onSubmit: () => {
      handleAddRequestItemFromModal(formik.values.categories);
    },
  });
  const { values, setFieldValue } = formik;

  const isItInState = useCallback(
    (option: Schemas.CategoryExamData) =>
      values.categories.findIndex(
        (categoryOption) => categoryOption.code === option.code,
      ) !== -1,
    [values.categories],
  );

  const isChecked = useCallback(
    (option: Schemas.CategoryExamData) => isItInState(option),
    [isItInState],
  );

  const removeFromState = useCallback(
    (option: Schemas.CategoryExamData) => {
      const categoryList = values.categories.filter(
        (cat) => cat.code !== option.code,
      );
      setFieldValue("categories", categoryList);
    },
    [setFieldValue, values.categories],
  );

  const addToState = useCallback(
    (option: Schemas.CategoryExamData) => {
      const categoryList = values.categories;
      categoryList.push(option);
      setFieldValue("categories", categoryList);
    },
    [setFieldValue, values.categories],
  );

  const handleOnChange = useCallback(
    (option: Schemas.CategoryExamData) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isItInState(option) ? removeFromState(option) : addToState(option);
    },
    [addToState, isItInState, removeFromState],
  );

  return (
    <FormikProvider value={formik}>
      <Form className={classes.container}>
        <div className={classes.items}>
          {options.map((option) => (
            <FormControlLabel
              key={option.code}
              className={classes.item}
              control={
                <Checkbox
                  checked={isChecked(option)}
                  onChange={() => handleOnChange(option)}
                  name={option.name}
                  color="primary"
                />
              }
              label={option.name}
            />
          ))}
        </div>
        <div className={classes.actionSection}>
          <Button
            className={classes.saveButton}
            variant="contained"
            color="primary"
            type="submit">
            {STRINGS.generals.SAVE}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  );
}
