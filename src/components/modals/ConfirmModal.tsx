import { Modal, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import STRINGS from "../../utils/strings";
import PrimaryButton from "../buttons/PrimaryButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #fff",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    infoContainer: {
      width: "100%",
      textAlign: "center",
      margin: theme.spacing(1),
    },
    title: {
      textAlign: "center",
    },
  }),
);

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface Props {
  title: string;
  open?: boolean;
  info?: string;
  confirmButtonText?: string;
  loadingOnConfirm?: boolean;
  handleShow: () => void;
  onConfirm: () => void;
}

function ConfirmModal({
  title,
  info = undefined,
  confirmButtonText = undefined,
  loadingOnConfirm = false,
  open = false,
  handleShow,
  onConfirm,
}: Props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  return (
    <Modal
      open={open}
      onClose={handleShow}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div style={modalStyle} className={classes.paper}>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        {info && (
          <div className={classes.infoContainer}>
            <Typography>{info}</Typography>
          </div>
        )}
        <div className={classes.actionContainer}>
          <PrimaryButton
            variant="text"
            label={STRINGS.generals.CLOSE}
            onClick={handleShow}
          />
          <PrimaryButton
            loading={loadingOnConfirm}
            disabled={loadingOnConfirm}
            variant="contained"
            label={confirmButtonText || STRINGS.generals.SAVE}
            onClick={onConfirm}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
