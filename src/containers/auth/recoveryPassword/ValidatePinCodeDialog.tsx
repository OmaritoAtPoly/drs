import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import PinField from "react-pin-field";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import LoadingWrapper from "../../../components/LoadingWrapper";
import theme from "../../../styles/theme";
import STRINGS from "../../../utils/strings";

interface Props {
  open?: boolean;
  setOpen: () => void;
  mail?: string;
  handleCodeVerification?: (value: string) => void;
  resendEmail?: () => void;
  loading?: boolean;
}
const useStyles = makeStyles({
  dialogContainer: {
    borderRadius: 10,
  },
  titleStyle: {
    display: "flex",
    justifyContent: "center",
    color: theme.palette.common.black,
    fontWeight: "bold",
    textAlign: "center",
  },
  infoLabelStyle: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
  },
  container: { display: "flex", flexDirection: "column" },
  pinCode: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 5,
    textAlign: "center",
    border: `1px solid ${theme.palette.primary.main}`,
    outline: "none",
  },
  pinCodeContainer: {
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: theme.palette.grey[300],
  },
});

const ValidatePinCodeDialog = ({
  open = false,
  setOpen,
  mail,
  handleCodeVerification = () => {},
  resendEmail = () => {},
  loading = false,
}: Props) => {
  const classes = useStyles();
  return (
    <Dialog
      hideBackdrop // Disable the backdrop color/image
      disableEnforceFocus // Let the user focus on elements outside the dialog
      disableBackdropClick // Remove the backdrop click (just to be sure)
      className={classes.dialogContainer}
      onClose={setOpen}
      aria-labelledby="customized-dialog-title"
      open={open}>
      <DialogTitle id="customized-dialog-title">
        <Typography className={classes.titleStyle}>
          {STRINGS.recovery.CHECK_YOUR_MAIL}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {mail && (
          <div className={classes.container}>
            <Typography className={classes.infoLabelStyle}>
              {STRINGS.recovery.SENT_TO}
              {mail}
            </Typography>
            <LoadingWrapper loading={loading}>
              <div className={classes.pinCodeContainer}>
                <PinField
                  length={4}
                  autoFocus
                  validate="0123456789"
                  className={classes.pinCode}
                  onComplete={handleCodeVerification}
                />
              </div>
            </LoadingWrapper>
            <div>
              <PrimaryButton
                color="inherit"
                onClick={resendEmail}
                label={STRINGS.recovery.NOT_YET}
                className={classes.button}
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ValidatePinCodeDialog;
