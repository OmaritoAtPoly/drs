import { Divider, makeStyles, Typography } from "@material-ui/core";
import React, { PropsWithChildren } from "react";
import CardLayout from "./CardLayout";
import BadgedButton from "../buttons/BadgedButton";
import { IconNames } from "../Icon/IconNames";

const useStyles = makeStyles({
  // TODO: Add this color to the theme
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: "#D6E3F3",
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 2,
    borderStyle: "solid",
  },
  title: {
    color: "#5E17EB",
    fontWeight: 800,
    paddingLeft: 10,
  },
});

interface Props {
  title: string;
  icon?: IconNames;
  classNameContainer?: string;
  classNameContent?: string;
  classTitle?: string;
  onClick: () => void;
}

const TitleCard = ({
  title,
  icon,
  children,
  classNameContainer = "",
  classNameContent = "",
  classTitle = "",
  onClick,
}: Props & PropsWithChildren<unknown>) => {
  const classes = useStyles();

  return (
    // TODO: change de border of  icon button
    // TODO: add the other button
    <CardLayout className={classNameContainer}>
      <div className={classes.root}>
        <div className={classes.row}>
          <Typography
            variant="body1"
            component="h2"
            className={`${classes.title} ${classTitle}`}>
            {title}
          </Typography>
          {icon && <BadgedButton onClick={onClick} iconName={icon} />}
        </div>
        <Divider className={classes.divider} />
        <div className={classNameContent}>{children}</div>
      </div>
    </CardLayout>
  );
};

export default TitleCard;
