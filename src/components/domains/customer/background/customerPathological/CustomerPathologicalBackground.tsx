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
import CustomerPathologicalBackgroundItem from "./CustomerPathologicalBackgroundItem";

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
  customerPathologies: Schemas.CustomerPathologies;
  pathologiesOptions: string[];

  loadingBackground: boolean;
  updateCustomerPathology: (
    customerPathologies: Schemas.CustomerPathologies,
  ) => void;
}

export default function CustomerPathologicalBackground({
  customerPathologies,
  loadingBackground,
  pathologiesOptions,
  updateCustomerPathology,
}: Props) {
  const classes = styles();
  const [mode, setMode] = useState<boolean>(false);
  const { currentPatient } = usePatientCacheSelector({});

  const referPathologyText = useMemo(
    () => getNoReferText(currentPatient?.gender || "", "PERSONAL"),
    [currentPatient?.gender],
  );

  return loadingBackground ? (
    <div className={classes.container}>
      <Typography className={classes.title}>
        {STRINGS.background.PERSONAL_BACKGROUND}
      </Typography>
      <BackgroundRowSkeleton />
    </div>
  ) : (
    <div className={classes.container}>
      <Formik
        initialValues={{ customerPathologies }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSubmit={(values) => {
          updateCustomerPathology(values.customerPathologies);
          setMode(!mode);
        }}
        render={({
          values,
          setFieldValue,
        }: FormikProps<{
          customerPathologies: Schemas.CustomerPathologies;
        }>) => {
          const handleOnCheck = () => {
            setFieldValue(
              "customerPathologies.enabled",
              !values.customerPathologies.enabled,
            );
          };
          const handleMode = () => {
            setMode(!mode);
          };
          const handleOnAddItem = () => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { customerPathologies } = values;
            if (customerPathologies && customerPathologies.pathologies) {
              customerPathologies.pathologies.push({
                notes: [],
                pathology: "",
              });
            }
            setFieldValue(
              "customerPathologies.pathologies",
              customerPathologies.pathologies,
            );
          };

          const handleOnAddFreeItem = () => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { customerPathologies } = values as any;
            if (customerPathologies && customerPathologies.pathologies) {
              customerPathologies.pathologies.push({
                notes: [],
                pathology: "",
                free: true,
              });
            }
            setFieldValue(
              "customerPathologies.pathologies",
              customerPathologies.pathologies,
            );
          };
          return (
            <Form>
              <div className={classes.headSection}>
                <Typography className={classes.title}>
                  {STRINGS.background.PERSONAL_BACKGROUND}
                </Typography>
                {mode && !values.customerPathologies.enabled ? (
                  <PopoverButton
                    iconName={
                      mode || customerPathologies.pathologies?.length === 0
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
                      mode || customerPathologies.pathologies?.length === 0
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
                      checked={values.customerPathologies.enabled}
                      onChange={handleOnCheck}
                      name="enable"
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={referPathologyText}
                />
              )}
              {values.customerPathologies.enabled && !mode && (
                <NotReferPanel label={referPathologyText} />
              )}
              {!values.customerPathologies.enabled && (
                <FieldArray
                  name="customerPathologies.pathologies"
                  render={({ remove }: FieldArrayRenderProps) => {
                    const handleRemove = (index: number) => {
                      remove(index);
                    };
                    return (
                      <div className={classes.content}>
                        {values.customerPathologies &&
                          values.customerPathologies.pathologies &&
                          values.customerPathologies.pathologies.map(
                            (
                              pathology: Schemas.CustomerPathologyData,
                              index,
                            ) => (
                              <div className={classes.item}>
                                <CustomerPathologicalBackgroundItem
                                  // eslint-disable-next-line react/no-array-index-key
                                  key={index}
                                  index={index}
                                  handleRemove={handleRemove}
                                  inputPlaceholder="Describe la patología"
                                  pathologicalItem={pathology}
                                  setFieldValue={setFieldValue}
                                  editMode={mode}
                                  inputFieldName={`customerPathologies.pathologies[${index}].notes`}
                                  selectorFieldName={`customerPathologies.pathologies[${index}].pathology`}
                                  pathologiesOptions={pathologiesOptions}
                                  enabled={
                                    values.customerPathologies.enabled || false
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
