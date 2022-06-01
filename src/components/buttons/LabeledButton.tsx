import {
  Card,
  CardActionArea,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import theme from "../../styles/theme";
import { IconNames } from "../Icon/IconNames";
import Icon from "../Icon/Icon";

interface Props {
  buttonLabel?: string;
  containerStyle?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  iconName?: IconNames;
  fill?: string;
  labelStyle?: string;
  disable?: boolean;
}

const useStyles = makeStyles({
  container: {
    backgroundColor: theme.palette.primary.main,
  },
  disable: {
    backgroundColor: theme.palette.action.disabled,
  },
  content: {
    display: "flex",
    alignItems: "center",
    height: "35px",
  },
  icon: {
    display: "flex",
    alignSelf: "center",
  },
  iconContainer: {
    padding: "5px",
    height: "100%",
    display: "flex",
    backgroundColor: "white",
  },
  labelStyle: {
    fontSize: "14px",
    color: "white",
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const LabeledButton = ({
  fill = "#828282",
  iconName,
  onClick = () => {},
  containerStyle = "",
  buttonLabel = "",
  labelStyle = "",
  disable = false,
}: Props) => {
  const classes = useStyles();
  return (
    <Card
      className={disable ? classes.disable : classes.container}
      classes={{ root: containerStyle }}
      onClick={onClick}>
      <CardActionArea>
        <div className={classes.content}>
          <Typography className={`${classes.labelStyle} ${labelStyle}`}>
            {buttonLabel}
          </Typography>
          {!!iconName && (
            <div className={classes.iconContainer}>
              <Icon className={classes.icon} name={iconName} fill={fill} />
            </div>
          )}
        </div>
      </CardActionArea>
    </Card>
  );
};

export default LabeledButton;
