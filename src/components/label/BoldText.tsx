import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

interface Props {
    label: string;
}

const styles = makeStyles({
    labelStyle: {
        fontWeight: "bold",
        paddingInline: "5px",
    },
});

const BoldText = ({
    label,
}: Props) => {
    const classes = styles();
    return (
      <Typography className={classes.labelStyle}>{label}</Typography>
    );
};

export default BoldText;
