/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, makeStyles, Theme, Typography } from "@material-ui/core";
import {
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
  FormikProps,
} from "formik";
import moment from "moment";
import React, { useState } from "react";
import STRINGS from "../../../../../utils/strings";
import BadgedButton from "../../../../buttons/BadgedButton";
import GynecologySkeleton from "../../../../skeletons/GinecologySkeleton";
import ContraceptiveItem from "./contraceptiveItem/ContraceptiveItem";
import GynecologyBackgroundItem from "./GynecologyBackgroundItem";
import GynecologyBackgroundTestItem from "./GynecologyBackgroundTestItem";
import MenstruationItem from "./menstruationItem/MenstruationItem";

const styles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  headSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginBottom: theme.spacing(2),
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 800,
  },
  saveButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
  },
  item: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  spacerLoading: {
    marginTop: 10,
  },
}));

interface Props {
  emptyGynecologyData: boolean;
  gynecology: Schemas.CustomerGynecologyData;
  handleOnSubmit: (gynecology: Schemas.CustomerGynecologyData) => void;
  loadingBackground: boolean;
}

export default function CustomerHabitBackground({
  gynecology,
  emptyGynecologyData,
  loadingBackground,
  handleOnSubmit,
}: Props) {
  const classes = styles();
  const [mode, setMode] = useState<boolean>(false);

  return loadingBackground ? (
    <div className={classes.container}>
      <Typography className={classes.title}>
        ANTECEDENTES GINECO-OBSTÉTRICOS
      </Typography>
      <GynecologySkeleton />
    </div>
  ) : (
    <div className={classes.container}>
      <Formik
        initialValues={{ gynecology }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSubmit={(values) => {
          setMode(!mode);
          handleOnSubmit(values.gynecology);
        }}
        render={({
          values,
          setFieldValue,
        }: FormikProps<{ gynecology: Schemas.CustomerGynecologyData }>) => {
          const handleMode = () => {
            setMode(!mode);
          };
          const handleOnAddItem = () => {
            if (mode) {
              // eslint-disable-next-line @typescript-eslint/no-shadow
              const { gynecology } = values;
              if (gynecology && gynecology.tests) {
                gynecology.tests.push({
                  name: "",
                  description: "",
                  date: {
                    dateDay: moment().date(),
                    dateMonth: moment().month() + 1,
                    dateYear: moment().year(),
                  },
                });
              }
              setFieldValue("gynecology.tests", gynecology.tests);
            } else setMode(!mode);
          };

          return (
            <Form>
              <div className={classes.headSection}>
                <Typography className={classes.title}>
                  {STRINGS.background.GYNECOLOGICAL_OBSTETRIC_BACKGROUND}
                </Typography>
                <BadgedButton
                  onClick={handleOnAddItem}
                  iconName={mode || emptyGynecologyData ? "add" : "edit"}
                />
              </div>
              <div className={classes.row}>
                <GynecologyBackgroundItem
                  inputFieldName="gynecology.menarche"
                  label={STRINGS.background.MENARCHE}
                  inputPlaceholder="Edad"
                  inputType="number"
                  value={`${values.gynecology.menarche}` || ""}
                  editMode={mode}
                  itemLabel="años"
                />
                <GynecologyBackgroundItem
                  inputFieldName="gynecology.thelarche"
                  label={STRINGS.background.THELARCHE}
                  inputPlaceholder={STRINGS.background.AGE}
                  inputType="number"
                  value={`${values.gynecology.thelarche}` || ""}
                  editMode={mode}
                  itemLabel={STRINGS.generals.YEARS}
                />
                <GynecologyBackgroundItem
                  inputFieldName="gynecology.sexualInitiation"
                  label={STRINGS.background.START_SEX_LIFE}
                  inputPlaceholder={STRINGS.background.AGE}
                  inputType="number"
                  value={`${values.gynecology.sexualInitiation}` || ""}
                  editMode={mode}
                  itemLabel={STRINGS.generals.YEARS}
                />
                <GynecologyBackgroundItem
                  inputFieldName="gynecology.pregnancies"
                  label={STRINGS.background.PREGNANCIES}
                  inputPlaceholder={STRINGS.background.PREGNANCIES}
                  value={`${values.gynecology.pregnancies}` || ""}
                  inputType="number"
                  editMode={mode}
                />
                <GynecologyBackgroundItem
                  inputFieldName="gynecology.caesareans"
                  label={STRINGS.background.CAESAREANS}
                  inputPlaceholder={STRINGS.background.CAESAREANS}
                  inputType="number"
                  value={`${values.gynecology.caesareans}` || ""}
                  editMode={mode}
                />
                <GynecologyBackgroundItem
                  inputFieldName="gynecology.abortions"
                  label={STRINGS.background.ABORTIONS}
                  inputPlaceholder={STRINGS.background.ABORTIONS}
                  inputType="number"
                  value={`${values.gynecology.abortions}` || ""}
                  editMode={mode}
                />
                <GynecologyBackgroundItem
                  inputFieldName="gynecology.childbirths"
                  label={STRINGS.background.CHILDBIRTHS}
                  inputPlaceholder={STRINGS.background.CHILDBIRTHS}
                  inputType="number"
                  value={`${values.gynecology.childbirths}` || ""}
                  editMode={mode}
                />
                <GynecologyBackgroundItem
                  inputFieldName="gynecology.livingChildren"
                  label={STRINGS.background.LIVING_CHILDREN}
                  inputPlaceholder={STRINGS.background.LIVING_CHILDREN}
                  inputType="number"
                  value={`${values.gynecology.livingChildren}` || ""}
                  editMode={mode}
                />
                <GynecologyBackgroundItem
                  inputFieldName="gynecology.lastMenstruation"
                  label={
                    mode
                      ? STRINGS.background.LAST_MENSTRUATION_DATE
                      : STRINGS.background.FUM
                  }
                  inputPlaceholder={STRINGS.background.LAST_MENSTRUATION}
                  value={values.gynecology.lastMenstruation || ""}
                  editMode={mode}
                  inputTypeRender="DATE"
                  inputType="text"
                />
              </div>
              <div className={classes.row}>
                <MenstruationItem
                  inputPlaceholder={STRINGS.background.DETAILS}
                  label={STRINGS.background.MENSTRUATION_CHARACTERISTIC}
                  editMode={mode}
                  menstruationInputFieldInfo="gynecology.menstruationInfo"
                  menstruationInputFieldInfoValue={
                    values.gynecology.menstruationInfo || ""
                  }
                  menstruationInputFieldTypeValue={
                    values.gynecology.menstruationType || ""
                  }
                  setFieldValue={setFieldValue}
                />
                <GynecologyBackgroundItem
                  inputFieldName="gynecology.sexualActivity"
                  label={STRINGS.background.SEXUAL_ACTIVITY}
                  inputPlaceholder={STRINGS.background.SEXUAL_ACTIVITY}
                  inputType="text"
                  inputTypeRender="TEXT_AREA"
                  value={`${values.gynecology.sexualActivity}` || ""}
                  editMode={mode}
                />
                <ContraceptiveItem
                  label={STRINGS.background.CONTRACEPTIVE_METHOD}
                  editMode={mode}
                  setFieldValue={setFieldValue}
                  contraceptiveInputFieldInfo="gynecology.contraceptiveMethod"
                  contraceptiveInputFieldType="gynecology.contraceptiveType"
                  contraceptiveInputFieldInfoTypeValue={
                    values.gynecology.contraceptiveType || ""
                  }
                  contraceptiveInputFieldInfoValue={
                    values.gynecology.contraceptiveMethod || ""
                  }
                  inputPlaceholder={STRINGS.background.DETAILS}
                />
                <GynecologyBackgroundItem
                  inputFieldName="gynecology.ets"
                  label={STRINGS.background.SEXUALLY_TRANSMITTED_DISEASE}
                  inputPlaceholder={
                    STRINGS.background.SEXUALLY_TRANSMITTED_DISEASE
                  }
                  inputType="text"
                  inputTypeRender="TEXT_AREA"
                  value={`${values.gynecology.ets}` || ""}
                  editMode={mode}
                />
                <FieldArray
                  name="gynecology.tests"
                  render={({ remove }: FieldArrayRenderProps) => {
                    const handleRemove = (index: number) => {
                      remove(index);
                    };
                    return (
                      <div className={classes.content}>
                        {values.gynecology &&
                          values.gynecology.tests &&
                          values.gynecology.tests.map(
                            (test: Schemas.DateTestsData, index) => (
                              <div className={classes.item}>
                                <GynecologyBackgroundTestItem
                                  // eslint-disable-next-line react/no-array-index-key
                                  key={index}
                                  index={index}
                                  test={test}
                                  editMode={mode}
                                  handleRemove={handleRemove}
                                  inputFieldTextArea={`gynecology.tests[${index}].description`}
                                  inputFieldLabel={`gynecology.tests[${index}].name`}
                                  inputFieldDate={`gynecology.tests[${index}].date`}
                                  inputPlaceHolder="Detalles"
                                  label={test.name || ""}
                                />
                              </div>
                            ),
                          )}
                      </div>
                    );
                  }}
                />
              </div>

              {mode && (
                <div className={classes.actionSection}>
                  <Button variant="text" color="primary" onClick={handleMode}>
                    Cancelar
                  </Button>
                  <Button
                    variant="text"
                    color="primary"
                    type="submit"
                    className={classes.saveButton}>
                    Guardar
                  </Button>
                </div>
              )}
            </Form>
          );
        }}
      />
    </div>
  );
}
