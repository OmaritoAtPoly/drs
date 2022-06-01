/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, makeStyles, Theme } from "@material-ui/core";
import {
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
  FormikProps,
} from "formik";
import React, { useState } from "react";
import {
  appetiteLevelOptions,
  dailyGlassesOfWaterOptions,
} from "../../../../utils/defaultData";
import STRINGS from "../../../../utils/strings";
import { CustomerNutritionItem } from "../../../../utils/types";
import TitleCard from "../../../cards/TitleCard";
import TitleCardPopover from "../../../cards/TitleCardPopover";
import NutritionSkeleton from "../../../skeletons/NutritionSkeleton";
import PredefinedOrFreePanel from "../background/PredefinedOrFreePanel";
import NutritionCheckItem from "./NutritionCheckItem";
import NutritionItem from "./NutritionItem";

const styles = makeStyles((theme: Theme) => ({
  container: { marginBottom: theme.spacing(2) },
  row: {
    display: "flex",
    flexWrap: "wrap",
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
    marginTop: 16,
  },
  spacerLoading: {
    marginTop: 10,
  },
}));

interface Props {
  appetiteLevel: string;
  dailyGlassesOfWater: number;
  customerNutritionItems: CustomerNutritionItem[];
  customerBackgroundData: Schemas.CustomerBackgroundData;
  loadingBackground: boolean;
  updateCustomerNutrition: (
    appetiteLevel: string,
    dailyGlassesOfWater: number,
    customerNutritionItems: CustomerNutritionItem[],
  ) => void;
}

export default function NutritionCustomer({
  appetiteLevel,
  dailyGlassesOfWater,
  customerNutritionItems,
  loadingBackground,
  customerBackgroundData,
  updateCustomerNutrition,
}: Props) {
  const classes = styles();
  const [editMode, setEditMode] = useState<boolean>(false);

  return loadingBackground ? (
    <div className={classes.container}>
      <TitleCard
        onClick={() => {}}
        title={STRINGS.background.NUTRITION_BACKGROUND}
        icon="edit">
        <NutritionSkeleton />
      </TitleCard>
    </div>
  ) : (
    <div className={classes.container}>
      <Formik
        initialValues={{
          appetiteLevel,
          dailyGlassesOfWater,
          customerNutritionItems,
        }}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onSubmit={(values) => {
          updateCustomerNutrition(
            values.appetiteLevel,
            values.dailyGlassesOfWater,
            values.customerNutritionItems,
          );
          // updateCustomerPathology(values.customerPathologies);
          setEditMode(!editMode);
        }}
        render={({
          values,
          setFieldValue,
        }: FormikProps<{
          appetiteLevel: string;
          dailyGlassesOfWater: number;
          customerNutritionItems: CustomerNutritionItem[];
        }>) => {
          const handleMode = () => {
            setEditMode(!editMode);
          };
          const handleOnAddItem = () => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { customerNutritionItems } = values;
            if (customerNutritionItems) {
              customerNutritionItems.push({
                name: "",
                description: "",
              });
            }
            setFieldValue("customerNutritionItems", customerNutritionItems);
          };

          const handleOnAppetiteChange = (
            event: React.ChangeEvent<HTMLInputElement>,
          ) => {
            if (editMode) {
              setFieldValue(
                "appetiteLevel",
                (event.target as HTMLInputElement).value,
              );
            }
          };

          const handleOnWaterGlassesChange = (
            event: React.ChangeEvent<HTMLInputElement>,
          ) => {
            if (editMode) {
              switch ((event.target as HTMLInputElement).value) {
                case "1 ó menos":
                  setFieldValue("dailyGlassesOfWater", 1);
                  break;
                case "2 a 3":
                  setFieldValue("dailyGlassesOfWater", 3);
                  break;
                case "4 ó más":
                  setFieldValue("dailyGlassesOfWater", 4);
                  break;
                default:
                  setFieldValue("dailyGlassesOfWater", 0);
                  break;
              }
            }
          };

          const getDailyGlassesOfWaterNumber = () => {
            switch (values.dailyGlassesOfWater) {
              case 1:
                return "1 ó menos";
              case 3:
                return "2 a 3";
              case 4:
                return "4 ó más";
              default:
                return "";
            }
          };

          const handleOnAddFreeItem = () => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const { customerNutritionItems } = values as any;
            if (customerNutritionItems) {
              customerNutritionItems.push({
                name: "",
                description: "",
                free: true,
              });
            }
            setFieldValue("customerNutritionItems", customerNutritionItems);
          };

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const renderPopover = (handleClose: () => void) => (
            <PredefinedOrFreePanel
              onPredefinedPanelClick={handleOnAddItem}
              onFreePanelClick={handleOnAddFreeItem}
            />
          );

          const handleOnActionClick = () => {
            handleMode();
          };
          return (
            <TitleCardPopover
              renderPopover={editMode}
              onActionClick={handleOnActionClick}
              title={STRINGS.background.NUTRITION_BACKGROUND}
              icon={editMode ? "add" : "edit"}
              renderContentPopover={renderPopover}>
              <Form>
                <div className={classes.row}>
                  <NutritionCheckItem
                    options={appetiteLevelOptions}
                    checkedValue={values.appetiteLevel}
                    label={STRINGS.nutrition.APPETITE_LEVEL}
                    onChecked={handleOnAppetiteChange}
                    editMode={editMode}
                  />
                  <NutritionCheckItem
                    options={dailyGlassesOfWaterOptions}
                    checkedValue={getDailyGlassesOfWaterNumber()}
                    label={STRINGS.nutrition.DAILY_GLASSES_NUMBER}
                    onChecked={handleOnWaterGlassesChange}
                    editMode={editMode}
                  />
                  <FieldArray
                    name="customerNutritionItems"
                    render={({ remove }: FieldArrayRenderProps) => {
                      const handleRemove = (index: number) => {
                        remove(index);
                      };
                      return (
                        <div className={classes.content}>
                          {values.customerNutritionItems.map(
                            (nutritionItem: CustomerNutritionItem, index) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <div key={index}>
                                <NutritionItem
                                  enabled={false}
                                  handleRemove={handleRemove}
                                  index={index}
                                  inputFieldName={`customerNutritionItems[${index}].description`}
                                  selectorFieldName={`customerNutritionItems[${index}].name`}
                                  inputPlaceholder="Detalles"
                                  nutritionItem={nutritionItem}
                                  setFieldValue={setFieldValue}
                                  editMode={editMode}
                                  nutritionItemOptions={
                                    customerBackgroundData.customerNutrition ||
                                    []
                                  }
                                />
                              </div>
                            ),
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                {editMode && (
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
            </TitleCardPopover>
          );
        }}
      />
    </div>
  );
}
