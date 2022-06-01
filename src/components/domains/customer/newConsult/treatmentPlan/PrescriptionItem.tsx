import {
  createStyles,
  makeStyles,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { writtenNumberToLetter } from "../../../../../utils/utils";
import BadgedButton from "../../../../buttons/BadgedButton";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "",
      alignItems: "center",
      width: "100%",
    },
    prescription: {
      fontSize: "15px",
      lineHeight: "20px",
    },
    col: {
      display: "flex",
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
      marginTop: theme.spacing(1),
      alignItems: "center",
    },
    textAreaContainer: {
      display: "flex",
      padding: "5px",
    },
  }),
);

const styleTextArea = { height: "150px", width: "100%", borderRadius: "8px" };

interface Props {
  index: number;
  prescription: Schemas.PrescriptionItemRequest;
  notes: string;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  onChangeNotes: (index: number, notes: string) => void;
}

export default function PrescriptionItem({
  index,
  prescription,
  notes,
  onDelete,
  onEdit,
  onChangeNotes,
}: Props) {
  const classes = useStyles();
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const handleOnDelete = useCallback(() => {
    onDelete(index);
  }, [index, onDelete]);

  const handleOnEdit = useCallback(() => {
    onEdit(index);
  }, [index, onEdit]);

  const handleOnChangeNotes = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChangeNotes(index, event.target.value);
    },
    [onChangeNotes, index],
  );

  const handleShowNotes = useCallback(() => {
    setShowNotes(!showNotes);
  }, [showNotes]);

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.col}>
          <Typography>
            {`${index + 1}-${prescription.genericMedicine || ""}, ${
              prescription.presentation || ""
            }, ${prescription.concentration || ""}, ${
              prescription.medicine || ""
            }, ${writtenNumberToLetter(prescription.quantity || 0)}, ${
              prescription.via || ""
            }`}
          </Typography>
        </div>
        <div className={classes.col}>
          <Typography className={classes.prescription}>
            {`${index + 1}-${prescription.genericMedicine}, ${
              prescription.doseMg
            }, ${prescription.hoursFrequency}, ${prescription.duration}, ${
              prescription.via
            }`}
          </Typography>
          <div>
            <BadgedButton
              onClick={handleOnEdit}
              iconName="edit"
              iconWidth={15}
              iconHeight={15}
            />
            <BadgedButton
              onClick={handleShowNotes}
              iconName="opinion"
              iconWidth={15}
              iconHeight={15}
            />
            <BadgedButton
              onClick={handleOnDelete}
              iconName="delete"
              iconWidth={15}
              iconHeight={15}
            />
          </div>
        </div>
      </div>
      {showNotes && (
        <div className={classes.textAreaContainer}>
          <TextareaAutosize
            rowsMax={4}
            style={styleTextArea}
            onChange={handleOnChangeNotes}
            value={notes}
          />
        </div>
      )}
    </div>
  );
}
