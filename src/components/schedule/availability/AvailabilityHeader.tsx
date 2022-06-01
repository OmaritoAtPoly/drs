/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  makeStyles,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useCallback } from "react";
import STRINGS from "../../../utils/strings";
import { getTimeScheduleOption } from "../../../utils/utils";
import PopoverButton from "../../buttons/PopOverButton";
import PrimaryButton from "../../buttons/PrimaryButton";

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

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.primary.main}`,
  },
  selectorContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  selectorInfo: {
    marginRight: theme.spacing(2),
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #fff",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  action: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(1),
  },
  alertTitle: {
    textAlign: "center",
  },
  popoverContainer: {
    padding: theme.spacing(2),
    maxWidth: "300px",
  },
  popoverInfo: {
    textAlign: "center",
  },
}));

interface Props {
  onIntervalTimeChange: (interval: string) => void;
  durationTime: string;
}

export default function AvailabilityHeader({
  onIntervalTimeChange,
  durationTime,
}: Props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [pickedOption, setPickedOption] = React.useState<string>("30");

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnConfirm = useCallback(() => {
    onIntervalTimeChange(pickedOption);
    handleClose();
  }, [onIntervalTimeChange, pickedOption]);

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setPickedOption(event.target.value as string);
    handleOpen();
  };

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <Typography
        id="config-modal-title"
        className={classes.alertTitle}
        variant="h5">
        {STRINGS.generals.ALERT}
      </Typography>
      <Typography id="simple-modal-description">
        {STRINGS.schedule.CHANGE_CONFIG_INFO}
      </Typography>
      <div className={classes.action}>
        <PrimaryButton
          label={STRINGS.generals.CANCEL}
          variant="text"
          onClick={handleClose}
        />
        <PrimaryButton
          label={STRINGS.generals.SAVE}
          variant="contained"
          onClick={handleOnConfirm}
        />
      </div>
    </div>
  );

  const renderPopoverContent = useCallback(
    (handleClose: () => void) => (
      <div className={classes.popoverContainer} onClick={handleClose}>
        <Typography className={classes.popoverInfo}>
          {STRINGS.schedule.DURATION_INFO}
        </Typography>
      </div>
    ),
    [classes.popoverContainer, classes.popoverInfo],
  );

  return (
    <div>
      <div className={classes.content}>
        <Typography>{STRINGS.schedule.ATTENTION_SCHEDULE}</Typography>
        <Typography>{STRINGS.schedule.ATTENTION_SCHEDULE_INFO}</Typography>
      </div>
      <div className={classes.selectorContainer}>
        <Typography className={classes.selectorInfo}>
          {STRINGS.schedule.ATTENTION_DELAY_TIME}
        </Typography>
        <TextField
          id="select_hour"
          SelectProps={{ disableUnderline: true }}
          InputProps={{ color: "primary" }}
          value={durationTime}
          select
          variant="outlined"
          size="small"
          margin="dense"
          onChange={handleChange}>
          {getTimeScheduleOption(5, 180).map((option, index) => (
            <MenuItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              value={option.value}>
              <Typography>{option.label.toUpperCase()}</Typography>
            </MenuItem>
          ))}
        </TextField>
        <PopoverButton renderContent={renderPopoverContent} iconName="info" />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description">
          {modalBody}
        </Modal>
      </div>
    </div>
  );
}
