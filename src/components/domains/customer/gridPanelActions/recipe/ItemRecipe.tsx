/* eslint-disable no-nested-ternary */
import { TextareaAutosize, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useCallback, useState } from "react";
import { writtenNumberToLetter } from "../../../../../utils/utils";
import BadgedButton from "../../../../buttons/BadgedButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cont: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      border: 0,
      alignItems: "center",
    },
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
      alignItems: "center",
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
    },
    column: {
      display: "flex",
      flexDirection: "column",
      marginTop: theme.spacing(1),
      paddingLeft: theme.spacing(6),
    },
    icons: {
      marginTop: -theme.spacing(1),
    },
    recipe: {
      fontSize: "15px",
      lineHeight: "20px",
    },
    textAreaContainer: {
      display: "flex",
      padding: "5px",
    },
    hidden: {
      display: "none",
    },
  }),
);

interface Props {
  handleOnDelete: () => void;
  onEdit: () => void;
  handleOnChangeNotes: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  recipe: Schemas.PrescriptionItemRequest;
  valueTextArea: string;
  index: number;
  readOnly?: boolean;
  hoursFrequency: { value: number; label: string }[];
  duration: { value: number; label: string }[];
}

const ItemRecipe = ({
  recipe,
  handleOnDelete,
  onEdit,
  handleOnChangeNotes,
  valueTextArea,
  index,
  readOnly = false,
  hoursFrequency,
  duration,
}: Props) => {
  const classes = useStyles();
  const [text, setText] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOnText = useCallback(() => {
    setText(!text);
  }, [text]);

  const styleTextArea = { height: "150px", width: "100%", borderRadius: "8px" };
  return (
    <div>
      <div className={classes.cont}>
        <div className={classes.divList}>
          <div className={classes.recipeList}>
            <Typography>
              {`${index}. ${recipe.genericMedicine}${
                recipe.medicine ? `(${recipe.medicine})` : ""
              }${recipe.concentration ? ` ${recipe.concentration}` : ""}${
                recipe.via ? `, vía ${recipe.via}` : ""
              }${recipe.presentation ? `, ${recipe.presentation}` : ""}${
                recipe.quantity
                  ? ` # ${writtenNumberToLetter(recipe.quantity)}`
                  : ""
              }`}
            </Typography>
          </div>
          <div className={classes.indicationList}>
            <div className={classes.column}>
              {recipe.notes && (
                <div>
                  <Typography className={classes.recipe}>
                    {recipe.notes}
                  </Typography>
                </div>
              )}
              {!recipe.notes && (
                <div>
                  <Typography className={classes.recipe}>
                    {`${index}. ${recipe.genericMedicine}${
                      recipe.medicine ? `(${recipe.medicine})` : ""
                    }${recipe.concentration ? ` ${recipe.concentration}` : ""}${
                      recipe.via ? `, vía ${recipe.via}` : ""
                    }${recipe.doseMg ? `, ${recipe.doseMg}` : ""}, ${
                      hoursFrequency.find(
                        (h) => h.value === recipe.hoursFrequency,
                      )?.label || ""
                    }, ${
                      duration.find((h) => h.value === recipe.duration)
                        ?.label || ""
                    }`}
                  </Typography>
                </div>
              )}
            </div>
            <div className={readOnly ? classes.hidden : classes.icons}>
              <BadgedButton
                onClick={onEdit}
                iconName="edit"
                iconWidth={15}
                iconHeight={15}
              />
              {/* // TODO: Don't show for now */}
              {/* <BadgedButton
                onClick={handleOnText}
                iconName="opinion"
                iconWidth={15}
                iconHeight={15}
              /> */}
              <BadgedButton
                onClick={handleOnDelete}
                iconName="delete"
                iconWidth={15}
                iconHeight={15}
              />
            </div>
          </div>
        </div>
      </div>
      {text && (
        <div className={classes.textAreaContainer}>
          <TextareaAutosize
            name="textIndications"
            rowsMax={4}
            style={styleTextArea}
            onChange={handleOnChangeNotes}
            defaultValue={valueTextArea}
          />
        </div>
      )}
    </div>
  );
};

export default ItemRecipe;
