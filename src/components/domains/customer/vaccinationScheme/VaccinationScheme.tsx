/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useFormik } from "formik";
import React, { useCallback, useEffect } from "react";
import STRINGS from "../../../../utils/strings";
import TitleCard from "../../../cards/TitleCard";
import TitleCardPopover from "../../../cards/TitleCardPopover";
import VaccinationSkeleton from "../../../skeletons/VacunationSkeleton";
import CardPopoverAddVaccination from "./CardPopoverAddVaccination";
import ItemData from "./ItemData";
import { VaccineValue } from "./ItemNewVaccination";

export type DefaultVaccineSchema = {
  name: string;
  subcategories: {
    name: string;
    items: {
      name: string;
      value: boolean;
    }[];
  }[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
    },
    category: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
    },
    titleColor: {
      color: "#323232",
      fontSize: "18px",
      lineHeight: "25px",
    },
    title: {
      color: theme.palette.secondary.main,
      textDecoration: "underline",
      fontWeight: 800,
      fontSize: "15px",
      lineHeight: "20px",
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(3),
    },
    subcategory: {
      fontSize: "15px",
      lineHeight: "20px",
      color: "#323232",
      fontWeight: "bold",
    },
    subContainer: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(4),
    },
    items: {
      marginTop: theme.spacing(0.5),
      minWidth: 50,
      marginLeft: theme.spacing(1),
    },
    tickSize: {
      transform: "scale(1.5)",
    },
    contended: {
      marginTop: theme.spacing(3),
    },
    contain: {
      maxWidth: 170,
      minWidth: 150,
    },
    upContainer: {
      display: "flex",
      flexWrap: "wrap",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    column: {
      flex: 1,
      minWidth: "33.33%",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down(600)]: {
        minWidth: "50%",
      },
      [theme.breakpoints.down(350)]: {
        minWidth: "100%",
      },
    },
    spacerLoading: {
      marginTop: 10,
    },
  }),
);

interface Props {
  schema: Schemas.CustomerVaccinationData;
  onUpdate: (schemas: any) => void;
  vaccines: VaccineValue[];
  loading?: boolean;
}

const VaccinationScheme = ({ schema, vaccines, onUpdate, loading }: Props) => {
  const classes = useStyles();
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      vaccines,
      newVaccines: undefined as VaccineValue | undefined,
      schema: schema as {
        categories: (Schemas.VaccinationCategoryData & {
          subcategories: (Schemas.VaccinationCategoryData & {
            subcategories: Schemas.VaccinationCategoryData[];
          })[];
        })[];
      },
    },
    enableReinitialize: true,
    onSubmit: ({ vaccines, newVaccines, schema }) => {
      const fullVaccines = vaccines.map((vaccine) => ({
        name: vaccine.vaccine,
        enabled: true,
      }));
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      newVaccines?.vaccine &&
        fullVaccines.findIndex(
          (vaccine) => vaccine.name === newVaccines.vaccine,
        ) === -1 &&
        fullVaccines.push({
          name: newVaccines.vaccine,
          enabled: true,
        });
      const newSchema = { ...schema };

      const others = newSchema.categories.find(
        (category) => category.code === "others",
      );

      const oldCategories = [...newSchema.categories];

      if (!others) {
        oldCategories.push({
          code: "others",
          name: "Otros",
          items: [],
          subcategories: [],
        });
      }
      // TODO:Close the PopOver, clear form to add values, do others list
      const categories = oldCategories.map((category) => {
        if (category.code === "others") {
          return {
            ...category,
            items: [...fullVaccines],
            subcategories: [],
          };
        }
        return category;
      });
      onUpdate({ categories });
    },
  });

  useEffect(() => {
    if (!loading && values.schema.categories.length > 0) {
      onUpdate(values.schema);
    }
  }, [loading, onUpdate, values.schema]);

  const renderSubcategories = useCallback(
    (category, index: number) =>
      category.subcategories?.map((subcategory: any, j: any) => (
        <div className={classes.contended}>
          <Typography className={classes.subcategory}>
            {subcategory.name}
          </Typography>
          <div className={classes.items}>
            {subcategory.items.map((value: any, k: any) => (
              <ItemData
                item={value}
                onClick={() => {
                  setFieldValue(
                    `schema.categories[${index}].subcategories[${j}].items[${k}].enabled`,
                    !(values as any).schema.categories[index].subcategories[j]
                      .items[k].enabled,
                    true,
                  );
                }}
              />
            ))}
          </div>
        </div>
      )),
    [
      classes.contended,
      classes.items,
      classes.subcategory,
      setFieldValue,
      values,
    ],
  );

  const renderItems = useCallback(
    (category, index: number) => (
      <div className={classes.contended}>
        <Typography className={classes.subcategory}>Otros</Typography>
        {category.items?.map((item: any, j: any) => (
          <div className={classes.items}>
            <ItemData
              item={item}
              onClick={() => {
                setFieldValue(
                  `schema.categories[${index}].items[${j}].enabled`,
                  !(values as any).schema.categories[index].items[j].enabled,
                  true,
                );
              }}
            />
          </div>
        ))}
      </div>
    ),
    [
      classes.contended,
      classes.items,
      classes.subcategory,
      setFieldValue,
      values,
    ],
  );

  const renderColumn = useCallback(
    (
      categories: (Schemas.VaccinationCategoryData & {
        subcategories: (Schemas.VaccinationCategoryData & {
          subcategories: Schemas.VaccinationCategoryData[];
        })[];
      })[],
      start: number,
      end: number,
    ) => {
      const elementCategories: JSX.Element[] = [];

      // eslint-disable-next-line no-plusplus
      for (let i = start; i < end; i++) {
        elementCategories.push(
          <div className={classes.contain}>
            <div className={classes.category}>
              <Typography className={classes.title}>
                {categories[i] && categories[i].name}
              </Typography>
            </div>
            <div className={classes.subContainer}>
              {categories[i] &&
              categories[i].subcategories &&
              categories[i].subcategories.length > 0
                ? renderSubcategories(categories[i], i)
                : renderItems(categories[i] ? categories[i] : [], i)}
            </div>
          </div>,
        );
      }
      return elementCategories;
    },
    [
      classes.category,
      classes.contain,
      classes.subContainer,
      classes.title,
      renderItems,
      renderSubcategories,
    ],
  );

  return loading ? (
    <TitleCard
      onClick={() => {}}
      title={STRINGS.vaccinationScheme.VACCINATION_SCHEMA}
      icon="add">
      <VaccinationSkeleton />
    </TitleCard>
  ) : (
    <TitleCardPopover
      classTitle={classes.titleColor}
      closePopoverAfterClicked={false}
      title={STRINGS.vaccinationScheme.VACCINATION_SCHEMA}
      icon="add"
      renderContentPopover={(handleClose: () => void) => (
        <CardPopoverAddVaccination
          checked={false}
          handleNewVaccine={() => {
            const vaccines = [...values.vaccines];
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            values.newVaccines?.vaccine && vaccines.push(values.newVaccines);
            setFieldValue("vaccines", vaccines, true);
          }}
          icon="add"
          onClickCancel={handleClose}
          vaccines={values.vaccines}
          newVaccines={values.newVaccines}
          setFieldValue={setFieldValue}
          handleChange={handleChange}
          handleSubmit={(e?: React.FormEvent<HTMLFormElement>) => {
            handleSubmit(e);
            handleClose();
          }}
        />
      )}>
      {values.schema && values.schema.categories && (
        <div className={classes.upContainer}>
          <div className={classes.column}>
            {values.schema.categories &&
              renderColumn(values.schema.categories, 0, 1)}
          </div>
          <div className={classes.column}>
            {values.schema.categories &&
              renderColumn(values.schema.categories, 1, 5)}
          </div>
          <div className={classes.column}>
            {values.schema.categories &&
              renderColumn(
                values.schema.categories,
                5,
                values.schema.categories.length,
              )}
          </div>
        </div>
      )}
    </TitleCardPopover>
  );
};

export default VaccinationScheme;
