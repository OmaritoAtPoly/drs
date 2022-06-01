/* eslint-disable react/jsx-one-expression-per-line */
import {
  makeStyles,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import STRINGS from "../../../../../utils/strings";
import ActionPanel from "../ActionPanel";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
  },
  actionContainer: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  diagnosisValueStyle: {
    paddingBlock: "10px",
  },
  quantityCardStyle: {
    width: "20%",
  },
  textAreaContainer: {
    display: "flex",
    padding: "5px",
  },
  counterList: {
    width: "30px",
    paddingLeft: "10px",
  },
});

const styleTextArea = { height: "150px", width: "100%", borderRadius: "8px" };

interface Props {
  index?: number;
  label: string;
  notes: string;
  code: string;
  onDelete: (code: string) => void;
  onChangeNotes: (index: number, notes: string) => void;
  handleOnRequestQuantityChange?: (index: number, quantity: string) => void;
  quantity: string;
  readOnly?: boolean;
}

const ItemRequest = ({
  index = 0,
  label,
  notes,
  code,
  onDelete,
  onChangeNotes,
  handleOnRequestQuantityChange,
  quantity,
  readOnly = false,
}: Props) => {
  const classes = useStyles();
  const [text, showText] = useState<boolean>(false);

  const handleOnText = useCallback(() => {
    showText(!text);
  }, [text]);

  const handleOnDelete = useCallback(() => {
    onDelete(code);
  }, [code, onDelete]);

  const handleOnChangeNotes = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChangeNotes(index, (event.target as HTMLTextAreaElement).value);
    },
    [index, onChangeNotes],
  );

  const handleOnChangeQuantity = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      handleOnRequestQuantityChange &&
        handleOnRequestQuantityChange(
          index,
          (event.target as HTMLInputElement).value,
        );
    },
    [index, handleOnRequestQuantityChange],
  );

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.infoContainer}>
          <Typography className={classes.counterList}>
            {`${index + 1} -`}
          </Typography>
          <Typography
            id="request-value"
            className={classes.diagnosisValueStyle}>
            {label}
          </Typography>
        </div>
        <div className={classes.actionContainer}>
          <Typography>{STRINGS.recipe.AMOUNT}</Typography>
          <TextField
            value={quantity}
            onChange={handleOnChangeQuantity}
            className={classes.quantityCardStyle}
            required
            type="number"
            inputProps={{
              readOnly,
            }}
          />
          {!readOnly && (
            <ActionPanel
              onDelete={handleOnDelete}
              handleOnText={handleOnText}
            />
          )}
        </div>
      </div>
      {text && (
        <div className={classes.textAreaContainer}>
          <TextareaAutosize
            rowsMax={4}
            style={styleTextArea}
            value={notes}
            onChange={handleOnChangeNotes}
          />
        </div>
      )}
    </div>
  );
};

export default ItemRequest;
