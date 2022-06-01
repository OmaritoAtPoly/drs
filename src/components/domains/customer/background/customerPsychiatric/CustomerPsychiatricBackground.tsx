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
import CustomerPsychiatricBackgroundItem from "./CustomerPsychiatricBackgroundItem";

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
  customerPsychiatric: Schemas.CustomerPsychiatricData;
  loadingBackground: boolean;
  psychiatricOptions: string[];
  updateCustomerPsychiatric: (
    customerPsychiatric: Schemas.CustomerPsychiatricData,
  ) => void;
}

export default function CustomerPsychiatricBackground({
  customerPsychiatric,
  loadingBackground,
  psychiatricOptions,
  updateCustomerPsychiatric,
}: Props) {
  const classes = styles();
  const [mode, setMode] = useState<boolean>(false);
  const { currentPatient } = usePatientCacheSelector({});

  const referPsychiatricText = useMemo(
    () => getNoReferText(currentPatient?.gender || "", "PSYCHIATRIC"),
    [currentPatient?.gender],
  );

  return loadingBackground ? (
    <div className={classes.container}>
      <Typography className={classes.title}>
        {STRINGS.background.PSYCHIATRIC_BACKGROUND}
      </Typography>
      <BackgroundRowSkeleton />
    </div>
  ) : (
    <div className={classes.container}>
      <Formik
        initialValues={{ customerPsychiatric }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSubmit={(values) => {
          updateCustomerPsychiatric(values.customerPsychiatric);
          setMode(!mode);
        }}
        render={({
          values,
          setFieldValue,
        }: FormikProps<{
          customerPsychiatric: Schemas.CustomerPsychiatricData;
        }>) => {
          const handleOnCheck = () => {
            setFieldValue(
              "customerPsychiatric.enabled",
              !values.customerPsychiatric.enabled,
            );
          };
          const handleMode = () => {
            setMode(!mode);
          };
          const handleOnAddItem = () => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { customerPsychiatric } = values;
            if (
              customerPsychiatric &&
              customerPsychiatric.items &&
              !values.customerPsychiatric.enabled
            ) {
              customerPsychiatric.items.push({
                notes: [],
                disorder: "",
              });
            }
            setFieldValue(
              "customerPsychiatric.items",
              customerPsychiatric.items,
            );
          };

          const handleOnAddFreeItem = () => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { customerPsychiatric } = values as any;
            if (
              customerPsychiatric &&
              customerPsychiatric.items &&
              !values.customerPsychiatric.enabled
            ) {
              customerPsychiatric.items.push({
                notes: [],
                disorder: "",
                free: true,
              });
            }
            setFieldValue(
              "customerPsychiatric.items",
              customerPsychiatric.items,
            );
          };

          return (
            <Form>
              <div className={classes.headSection}>
                <Typography className={classes.title}>
                  {STRINGS.background.PSYCHIATRIC_BACKGROUND}
                </Typography>
                {mode && !values.customerPsychiatric.enabled ? (
                  <PopoverButton
                    iconName={
                      mode || customerPsychiatric.items?.length === 0
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
                      mode || customerPsychiatric.items?.length === 0
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
                      checked={values.customerPsychiatric.enabled}
                      onChange={handleOnCheck}
                      name="enable"
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={referPsychiatricText}
                />
              )}
              {values.customerPsychiatric.enabled && !mode && (
                <NotReferPanel label={referPsychiatricText} />
              )}
              {!values.customerPsychiatric.enabled && (
                <FieldArray
                  name="customerPsychiatric.items"
                  render={({ remove }: FieldArrayRenderProps) => {
                    const handleRemove = (index: number) => {
                      remove(index);
                    };
                    return (
                      <div className={classes.content}>
                        {values.customerPsychiatric &&
                          values.customerPsychiatric.items &&
                          values.customerPsychiatric.items.map(
                            (
                              psychiatricItem: Schemas.CustomerPsychiatricItem,
                              index,
                            ) => (
                              <div className={classes.item}>
                                <CustomerPsychiatricBackgroundItem
                                  // eslint-disable-next-line react/no-array-index-key
                                  key={index}
                                  index={index}
                                  psychiatricItem={psychiatricItem}
                                  handleRemove={handleRemove}
                                  inputFieldName={`customerPsychiatric.items[${index}].notes`}
                                  selectorFieldName={`customerPsychiatric.items[${index}].disorder`}
                                  inputPlaceholder="Escribe el antecedente aquí"
                                  setFieldValue={setFieldValue}
                                  psychiatricOptions={psychiatricOptions}
                                  editMode={mode}
                                  enabled={
                                    values.customerPsychiatric.enabled || false
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
