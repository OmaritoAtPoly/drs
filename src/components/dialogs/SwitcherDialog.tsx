import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import theme from "../../styles/theme";
import STRINGS from "../../utils/strings";
import ActionPanel from "./ActionPanel";

export type DialogSelectionOptionType = {
  label: string;
  value: string;
};

const useStyles = makeStyles({
  root: {
    minWidth: "95%",
    position: "absolute",
    top: "35px",
    left: "30px",
    bottom: "-30px",
  },
  titleAndSearchStyle: {
    display: "flex",
    flexDirection: "column",
  },
  titleStyle: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "20px",
  },
  dividerStyle: {
    display: "flex",
    backgroundColor: theme.palette.primary.main,
    height: "1px",
    width: "95%",
    alignSelf: "center",
  },
  content: {
    paddingLeft: "20px",
  },
  diagnosisTitleStyle: {
    paddingBlock: "15px",
  },
  cardLayoutStyle: {
    display: "flex",
    flexDirection: "column",
  },
  selector: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
});

interface Props {
  handleShow: () => void;
  handleOnSelect: (value: string) => void;
  onHistoryClicked?: () => void;
  options: DialogSelectionOptionType[];
  actionPanel?: JSX.Element;
  defaultValue?: string;
}

const SwitcherDialog = ({
  children,
  open,
  defaultValue = "",
  options,
  actionPanel = undefined,
  handleShow,
  handleOnSelect,
  onHistoryClicked = () => {},
}: Props & DialogProps) => {
  const classes = useStyles();
  const [selectedOption, setSelectedOption] = React.useState<string>(
    defaultValue,
  );

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    handleOnSelect(event.target.value as string);
    setSelectedOption(event.target.value as string);
  };

  return (
    <Dialog
      hideBackdrop // Disable the backdrop color/image
      disableEnforceFocus // Let the user focus on elements outside the dialog
      disableBackdropClick // Remove the backdrop click (just to be sure)
      classes={{ paper: classes.root }}
      onClose={handleShow}
      aria-labelledby="selector-dialog"
      open={open}>
      <DialogTitle id="selector-dialog">
        <div className={classes.titleContainer}>
          <div className={classes.titleAndSearchStyle}>
            <TextField
              classes={{ root: classes.selector }}
              id="select"
              SelectProps={{ disableUnderline: true }}
              InputProps={{ color: "primary" }}
              value={selectedOption}
              select
              onChange={handleChange}>
              {options.map((option, index) => (
                <MenuItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  value={option.value}
                  className={classes.selector}>
                  <Typography className={classes.selector}>
                    {option.label.toUpperCase()}
                  </Typography>
                </MenuItem>
              ))}
            </TextField>
          </div>
          {actionPanel || (
            <ActionPanel
              onHistoryClicked={onHistoryClicked}
              historyToolTipLabel={STRINGS.generals.HISTORY}
            />
          )}
        </div>
      </DialogTitle>
      <Divider id="divider-section" className={classes.dividerStyle} />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default SwitcherDialog;
