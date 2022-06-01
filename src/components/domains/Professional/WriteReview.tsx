import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "../../../styles/theme";
import BadgedButton from "../../buttons/BadgedButton";
import { IconNames } from "../../Icon/IconNames";

interface Props {
  iconName: IconNames;
  text: string;
  onClick?: () => void;
}
const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
  },
  writeLabelStyle: {
    color: theme.palette.primary.main,
  },
},
);

const ProfessionalProfile = ({
  iconName,
  onClick = () => { },
  text,
}: Props) => {
  const classes = useStyles();

  return (
    <div id="write-review-container" className={classes.root}>
      <BadgedButton iconName={iconName} onClick={onClick} />
      <Typography className={classes.writeLabelStyle}>{text}</Typography>
    </div>
  );
};

export default ProfessionalProfile;
