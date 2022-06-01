import { createStyles, makeStyles, Popover } from "@material-ui/core";
import React, { useCallback } from "react";
import LabeledButton from "../../buttons/LabeledButton";
import STRINGS from "../../../utils/strings";
import ServicePopUpActionsContainer from "./ServicePopUpActionsContainer";
import ServiceFilter from "./ServiceFilter";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(2),
    },
    leftCol: {
      width: "80%",
    },
    rightCol: {
      width: "20%",
    },
    labelStyle: {
      textTransform: "uppercase",
    },
  }),
);

interface Props {
  active: boolean;
  taxPercent: string;
  handleOnCreateNewService: () => void;
  handleOnActiveStatusChange: (value: boolean) => void;
  handleOnTaxChange: (value: string) => void;
  handleOnFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ServiceActionPanel({
  active,
  taxPercent,
  handleOnCreateNewService,
  handleOnActiveStatusChange,
  handleOnTaxChange,
  handleOnFilterChange,
}: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | undefined>();

  const handleOnClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setAnchorEl(undefined);
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleOnCreateService = useCallback(() => {
    handleClose();
    handleOnCreateNewService();
  }, [handleClose, handleOnCreateNewService]);

  return (
    <div className={classes.container}>
      <div className={classes.leftCol}>
        <ServiceFilter
          active={active}
          taxPercent={taxPercent}
          handleOnActiveStatusChange={handleOnActiveStatusChange}
          handleOnTaxChange={handleOnTaxChange}
          handleOnFilterChange={handleOnFilterChange}
        />
      </div>
      <div className={classes.rightCol}>
        <LabeledButton
          buttonLabel={STRINGS.service.SERVICE}
          iconName="add"
          onClick={handleOnClick}
          labelStyle={classes.labelStyle}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}>
          <ServicePopUpActionsContainer
            handleOnCreateNewService={handleOnCreateService}
          />
        </Popover>
      </div>
    </div>
  );
}
