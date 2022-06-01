/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import LabeledDialog from "../dialogs/LabeledDialog";
import AddCardPanel from "./AddCardPanel";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "90%",
      minHeight: 200,
      maxWidth: 2000,
      width: "80%",
      [theme.breakpoints.up("sm")]: {
        height: "90%",
        minHeight: 400,
      },
    },
    content: {
      display: "flex",
      alignItems: "flex-start",
    },
  }),
);

interface Props {
  label: string;
  open?: boolean;
  loading: boolean;
  handleShow: () => void;
  onAddCard: (card: Schemas.PaymentCardData) => void;
}

const AddCardDialog = ({
  label,
  open = false,
  loading,
  handleShow,
  onAddCard,
}: Props) => {
  const classes = useStyles();

  return (
    <LabeledDialog
      open={open}
      label={label}
      handleShow={handleShow}
      rootClassName={classes.container}
      contentClassName={classes.content}
      actionPanel={<div />}>
      <AddCardPanel loading={loading} onAddCard={onAddCard} />
    </LabeledDialog>
  );
};
export default AddCardDialog;
