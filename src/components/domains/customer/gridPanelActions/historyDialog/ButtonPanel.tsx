import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../../utils/strings";
import BadgedButton from "../../../../buttons/BadgedButton";

interface Props {
    handleRemove: (index: number) => void;
    index: number,
}

const styles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "space-between",
        width: "25%",
        paddingTop: "20px",
    },
});

const ButtonPanel = ({
    handleRemove,
    index,
}: Props) => {
    const classes = styles();

    return (
      <span id="button-panel" className={classes.root}>
        <Button variant="outlined" color="inherit">{STRINGS.historical.LOWER_REQUEST}</Button>
        <BadgedButton fill="red" iconName="trash" onClick={() => handleRemove(index)} />
      </span>
    );
};

export default ButtonPanel;
