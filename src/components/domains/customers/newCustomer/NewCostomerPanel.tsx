import { createStyles, makeStyles, Popover } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../utils/strings";
import LabeledButton from "../../../buttons/LabeledButton";
import NewCustomerPopPanelContainer from "./NewCustomerPopPanelContainer";

const useStyles = makeStyles((theme) =>
  createStyles({
    popContainer: {
      marginTop: theme.spacing(1),
    },
    labelStyle: {
      textTransform: "uppercase",
    },
  }),
);

export default function NewCustomerPanel() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | undefined>();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <LabeledButton
        buttonLabel={STRINGS.generals.NEW_PATIENT}
        iconName="add"
        onClick={handleClick}
        labelStyle={classes.labelStyle}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={classes.popContainer}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        <NewCustomerPopPanelContainer />
      </Popover>
    </>
  );
}
