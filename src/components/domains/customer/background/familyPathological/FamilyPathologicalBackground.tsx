/* eslint-disable @typescript-eslint/no-shadow */
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
import BackgroundRowSkeleton from "../../../../skeletons/BackgroundRowSkeleton";
import NotReferPanel from "../NotReferPanel";
import PathologicalBackgroundItem from "./PathologicalBackgroundItem";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  familyPathologies: Schemas.CustomerFamilyPathologies;
  loadingBackground: boolean;
  familyParents: string[];
  updateFamilyPathology: (
    familyPathologies: Schemas.CustomerFamilyPathologies,
  ) => void;
}

export default function FamilyPathologicalBackground({
  familyPathologies,
  loadingBackground,
  familyParents,
  updateFamilyPathology,
}: Props) {
  const classes = styles();
  const [mode, setMode] = useState<boolean>(false);
  const { currentPatient } = usePatientCacheSelector({});

  const referFamilyPathologyText = useMemo(
    () => getNoReferText(currentPatient?.gender || "", "FAMILY"),
    [currentPatient?.gender],
  );

  return loadingBackground ? (
    <div className={classes.container}>
      <Typography className={classes.title}>
        {STRINGS.background.FAMILY_BACKGROUND}
      </Typography>
      <BackgroundRowSkeleton />
    </div>
  ) : (
    <div className={classes.container}>
      <Formik
        initialValues={{ familyPathologies }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSubmit={(values) => {
          updateFamilyPathology(values.familyPathologies);
          setMode(!mode);
        }}
        render={({
          values,
          setFieldValue,
        }: FormikProps<{
          familyPathologies: Schemas.CustomerFamilyPathologies;
        }>) => {
          const handleOnAddItem = () => {
            if (mode) {
              if (!values.familyPathologies.enabled) {
                const { familyPathologies } = values;
                if (familyPathologies && familyPathologies.pathologies) {
                  familyPathologies.pathologies.push({
                    familyMember: "Padre",
                    pathologies: [""],
                  });
                }
                setFieldValue(
                  "familyPathologies.pathologies",
                  familyPathologies.pathologies,
                );
              }
            } else setMode(!mode);
          };

          const handleOnCheck = () => {
            setFieldValue(
              "familyPathologies.enabled",
              !values.familyPathologies.enabled,
            );
          };

          const handleMode = () => {
            setMode(!mode);
          };
          return (
            <Form>
              <div className={classes.headSection}>
                <Typography className={classes.title}>
                  {STRINGS.background.FAMILY_BACKGROUND}
                </Typography>
                <BadgedButton
                  onClick={handleOnAddItem}
                  iconName={
                    mode || familyPathologies.pathologies?.length === 0
                      ? "add"
                      : "edit"
                  }
                />
              </div>
              {mode && (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.familyPathologies.enabled}
                      onChange={handleOnCheck}
                      name="enable"
                      color="primary"
                    />
                  }
                  labelPlacement="start"
                  label={referFamilyPathologyText}
                />
              )}
              {values.familyPathologies.enabled && !mode && (
                <NotReferPanel label={referFamilyPathologyText} />
              )}
              {!values.familyPathologies.enabled && (
                <FieldArray
                  name="familyPathologies.pathologies"
                  render={({ remove }: FieldArrayRenderProps) => {
                    const handleAddPathology = (
                      index: number,
                      pathology: string,
                    ) => {
                      const {
                        familyPathologies: { pathologies },
                      } = values;
                      const pathologyList = pathologies
                        ? pathologies[index].pathologies
                        : [];
                      pathologyList?.push(pathology);
                      setFieldValue(
                        `familyPathologies.pathologies[${index}].pathologies`,
                        pathologyList,
                      );
                    };

                    const handleRemovePathology = (
                      parentIndex: number,
                      childIndex: number,
                    ) => {
                      const {
                        familyPathologies: { pathologies },
                      } = values;
                      const pathologyList = pathologies
                        ? pathologies[parentIndex].pathologies
                        : [];
                      pathologyList?.splice(childIndex, 1);
                      setFieldValue(
                        `familyPathologies.pathologies[${parentIndex}].pathologies`,
                        pathologyList,
                      );
                    };

                    const handleRemove = (index: number) => {
                      remove(index);
                    };
                    return (
                      <div className={classes.content}>
                        {values.familyPathologies &&
                          values.familyPathologies.pathologies &&
                          values.familyPathologies.pathologies.map(
                            (
                              pathology: Schemas.CustomerFamilyPathologiesData,
                              index,
                            ) => (
                              <div className={classes.item}>
                                <PathologicalBackgroundItem
                                  // eslint-disable-next-line react/no-array-index-key
                                  key={index}
                                  pathologicalItem={pathology}
                                  editMode={mode}
                                  index={index}
                                  familyParents={familyParents}
                                  fieldName="familyPathologies.pathologies"
                                  setFieldValue={setFieldValue}
                                  handleAddPathology={handleAddPathology}
                                  handleRemove={handleRemove}
                                  handleRemovePathology={handleRemovePathology}
                                  enabled={
                                    values.familyPathologies.enabled || false
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
