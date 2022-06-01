import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import theme from "../../../styles/theme";
import Icon from "../../Icon/Icon";
import { IconNames } from "../../Icon/IconNames";

interface Props {
  text?: string[];
  iconName: IconNames;
  iconColor?: string;
}
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
  },
  healthCenterWrapper: {
    display: "flex",
    alignItems: "center",
  },
  nameStyle: {
    paddingLeft: theme.spacing(1.5),
  },
  textWrapper: {
    width: "100%",
    display: "flex",
    background: "white",
  },
});

const IconedProfileSection = ({ text, iconName, iconColor }: Props) => {
  const classes = useStyles();

  return (
    <div id="id-iconed-container" className={classes.root}>
      {text &&
        text.map((a) => {
          const key = Math.random();
          return (
            <div key={key} className={classes.healthCenterWrapper}>
              <Icon name={iconName} width={25} height={25} fill={iconColor} />
              <div id="text-wrapper" className={classes.textWrapper}>
                <Typography className={classes.nameStyle}>{a}</Typography>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default IconedProfileSection;
