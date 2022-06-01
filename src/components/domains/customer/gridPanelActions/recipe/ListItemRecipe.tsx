/* eslint-disable no-nested-ternary */
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import STRINGS from "../../../../../utils/strings";
import ItemRecipe from "./ItemRecipe";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      fontSize: "15px",
      lineHeight: "20px",
      color: " #323232",
      fontWeight: "bold",
    },
    divList: {
      display: "flex",
      flexDirection: "row",
      flex: 1,
      justifyContent: "flex-start",
      marginTop: theme.spacing(1),
    },
    recipeList: {
      flex: 0.4,
      display: "flex",
      flexDirection: "column",
    },
    indicationList: {
      flex: 0.6,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingLeft: theme.spacing(10),
    },
    titleIndications: {
      fontSize: "15px",
      lineHeight: "20px",
      color: " #323232",
      fontWeight: "bold",
    },
    titleContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  }),
);

interface Props {
  items: Schemas.PrescriptionItemRequest[];
  handleDelete: (index: number) => void;
  onEdit: (recipe: Schemas.PrescriptionItemRequest, index: number) => void;
  handleOnChangeNotes: (notes: string, index: number) => void;
  readOnly?: boolean;
  hoursFrequency: { value: number; label: string }[];
  duration: { value: number; label: string }[];
}

// eslint-disable-next-line arrow-body-style
const ListItemRecipe = ({
  items,
  handleDelete,
  onEdit,
  handleOnChangeNotes,
  readOnly = false,
  hoursFrequency,
  duration,
}: Props) => {
  const classes = useStyles();

  const handleOnEdit = useCallback(
    (currentItem: Schemas.PrescriptionItemRequest, index: number) => () => {
      onEdit(currentItem, index);
    },
    [onEdit],
  );

  const handleChangeNotesCallBack = useCallback(
    (index: number) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleOnChangeNotes(event.target.value, index);
    },
    [handleOnChangeNotes],
  );

  const handleOnDelete = useCallback(
    (index: number) => () => {
      handleDelete(index);
    },
    [handleDelete],
  );
  return (
    <div>
      <div className={classes.divList}>
        <div className={classes.recipeList}>
          <Typography className={classes.title}>
            {STRINGS.recipe.INDICATIONS_LOW}
          </Typography>
        </div>
        <div className={classes.indicationList}>
          <Typography className={classes.titleIndications}>
            {STRINGS.recipe.PRESCRIPTION_LOW}
          </Typography>
        </div>
      </div>
      <div>
        {items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <ItemRecipe
            recipe={item}
            handleOnDelete={handleOnDelete(index)}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            onEdit={handleOnEdit(item, index)}
            handleOnChangeNotes={handleChangeNotesCallBack(index)}
            valueTextArea={item.notes || ""}
            index={index + 1}
            readOnly={readOnly}
            hoursFrequency={hoursFrequency}
            duration={duration}
          />
        ))}
      </div>
    </div>
  );
};
export default ListItemRecipe;
