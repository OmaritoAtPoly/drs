import { makeStyles } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import { MapData } from "../../utils/types";
import PrimaryButton, { PrimaryButtonProps } from "../buttons/PrimaryButton";
import AutocompleteMapDialog from "./AutocompleteMapDialog";

interface Props {
  labelMap?: string;
  onSave?: (data: MapData) => void;
}

const styles = makeStyles(() => ({
  button: {
    justifyContent: "flex-start",
    height: 40,
    marginTop: 8,
  },
  buttonContainer: {
    margin: 0,
  },
  full: {
    width: "100%",
  },
}));

const ButtonMap = ({
  labelMap = "",
  onSave = () => {},
  ...rest
}: Props & PrimaryButtonProps) => {
  const classes = styles();
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const onSaveCallBack = useCallback(
    (data: MapData) => {
      onSave(data);
      handleOpen();
    },
    [handleOpen, onSave],
  );

  return (
    <div id="primary-button-map-container" className={classes.full}>
      <PrimaryButton
        id="primary-button-map"
        fullWidth
        variant="outlined"
        iconName="mapIcon"
        className={classes.button}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={handleOpen as any}
        {...rest}
      />
      <AutocompleteMapDialog
        label={labelMap}
        open={open}
        handleShow={handleOpen}
        onSave={onSaveCallBack}
      />
    </div>
  );
};

export default ButtonMap;
