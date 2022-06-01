/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import {
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
  FormikProps,
} from "formik";
import React, { useMemo, useState } from "react";
import { usePatientCacheSelector } from "../../../../../modules/customer/profile/cacheSelector";
import getNoReferText from "../../../../../utils/customerBackground";
import STRINGS from "../../../../../utils/strings";
import BadgedButton from "../../../../buttons/BadgedButton";
import PopoverButton from "../../../../buttons/PopOverButton";
import BackgroundRowSkeleton from "../../../../skeletons/BackgroundRowSkeleton";
import NotReferPanel from "../NotReferPanel";
import PredefinedOrFreePanel from "../PredefinedOrFreePanel";
import CustomerBackgroundHabitItem from "./CustomerBackgroundHabitItem";

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
    minWidth: theme.spacing(29),
    marginBottom: theme.spacing(2),
  },
  spacerLoading: {
    marginTop: 10,
  },
}));

interface Props {
  customerHabits: Schemas.CustomerHabits;
  habitOptions: string[];
  loadingBackground: boolean;
  updateCustomerHabit: (customerHabits: Schemas.CustomerHabits) => void;
}

export default function CustomerHabitBackground({
  customerHabits,
  loadingBackground,
  habitOptions,
  updateCustomerHabit,
}: Props) {
  const classes = styles();
  const [mode, setMode] = useState<boolean>(false);
  const { currentPatient } = usePatientCacheSelector({});

  const referHabitsText = useMemo(
    () => getNoReferText(currentPatient?.gender || "", "HABITS"),
    [currentPatient?.gender],
  );

  return loadingBackground ? (
    <div className={classes.container}>
      <Typography className={classes.title}>
        {STRINGS.background.HABITS_BACKGROUND}
      </Typography>
      <BackgroundRowSkeleton />
    </div>
  ) : (
    <div className={classes.container}>
      <Formik
        initialValues={{ customerHabits }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSubmit={(values) => {
          updateCustomerHabit(values.customerHabits);
          setMode(!mode);
        }}
        render={({
          values,
          setFieldValue,
        }: FormikProps<{
          customerHabits: Schemas.CustomerHabits;
        }>) => {
          const handleOnCheck = () => {
            setFieldValue(
              "customerHabits.enabled",
              !values.customerHabits.enabled,
            );
          };
          const handleMode = () => {
            setMode(!mode);
          };
          const handleOnAddItem = () => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { customerHabits } = values;
            if (
              customerHabits &&
              customerHabits.habits &&
              !values.customerHabits.enabled
            ) {
              customerHabits.habits.push({
                notes: [],
                habit: "",
              });
            }
            setFieldValue("customerHabits.habits", customerHabits.habits);
          };

          const handleOnAddFreeItem = () => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { customerHabits } = values as any;
            if (customerHabits && customerHabits.habits) {
              customerHabits.habits.push({
                notes: [],
                pathology: "",
                free: true,
              });
            }
            setFieldValue("customerHabits.habits", customerHabits.habits);
          };

          return (
            <Form>
              <div className={classes.headSection}>
                <Typography className={classes.title}>
                  {STRINGS.background.HABITS_BACKGROUND}
                </Typography>
                {mode && !values.customerHabits.enabled ? (
                  <PopoverButton
                    iconName={
                      mode || customerHabits.habits?.length === 0
                        ? "add"
                        : "edit"
                    }
                    // eslint-disable-next-line react/no-children-prop
                    renderContent={() => (
                      <PredefinedOrFreePanel
                        onPredefinedPanelClick={handleOnAddItem}
                        onFreePanelClick={handleOnAddFreeItem}
                      />
                    )}
                  />
                ) : (
                  <BadgedButton
                    onClick={handleMode}
                    iconName={
                      mode || customerHabits.habits?.length === 0
                        ? "add"
                        : "edit"
                    }
                  />
                )}
              </div>
              {mode && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.customerHabits.enabled}
                      onChange={handleOnCheck}
                      name="enabled"
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={referHabitsText}
                />
              )}
              {values.customerHabits.enabled && !mode && (
                <NotReferPanel label={referHabitsText} />
              )}
              {!values.customerHabits.enabled && (
                <FieldArray
                  name="customerHabits.habits"
                  render={({ remove }: FieldArrayRenderProps) => {
                    const handleRemove = (index: number) => {
                      remove(index);
                    };
                    return (
                      <div className={classes.content}>
                        {values.customerHabits &&
                          values.customerHabits.habits &&
                          values.customerHabits.habits.map(
                            (habit: Schemas.CustomerHabitData, index) => (
                              <div className={classes.item}>
                                <CustomerBackgroundHabitItem
                                  index={index}
                                  habitItem={habit}
                                  habits={habitOptions}
                                  handleRemove={handleRemove}
                                  inputFieldName={`customerHabits.habits[${index}].notes`}
                                  selectorFieldName={`customerHabits.habits[${index}].habit`}
                                  inputPlaceholder="Escribe el hábito aquí"
                                  setFieldValue={setFieldValue}
                                  editMode={mode}
                                  enabled={
                                    values.customerHabits.enabled || false
                                  }
                                />
                              </div>
                            ),
                          )}
                      </div>
                    );
                  }}
                />
              )}
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
