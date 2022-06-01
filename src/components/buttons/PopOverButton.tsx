import {
  Badge,
  IconButton,
  makeStyles,
  Card,
  Popover,
} from "@material-ui/core";
import React, { useCallback } from "react";
import Icon from "../Icon/Icon";
import { IconNames } from "../Icon/IconNames";

const useStyles = makeStyles({
  icon: {
    display: "flex",
  },
  iconButton: {
    display: "flex",
    width: "30px",
    height: "30px",
  },
  badge: {
    alignContent: "center",
    borderRadius: "10px",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Roboto Helvetica Arial sans-serif",
    zIndex: 1,
    position: "absolute",
    height: "15px",
    fontSize: ".65rem",
    minWidth: "3px",
  },
  card: {
    margin: "5px",
  },
});

interface Props {
  notificationNumber?: number;
  iconName?: IconNames;
  maxNumberNotification?: number;
  iconWidth?: number;
  iconHeight?: number;
  renderContent: (handleClose: () => void) => JSX.Element;
  className?: string;
  buttonClassName?: string;
  popoverContainerClassName?: string;
  fill?: string;
  closeAfterClicked?: boolean;
}

const PopoverButton = ({
  maxNumberNotification = 9,
  iconName = "home",
  notificationNumber = 0,
  iconWidth,
  iconHeight,
  renderContent,
  className,
  buttonClassName,
  popoverContainerClassName,
  fill,
  closeAfterClicked = true,
}: Props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<
    HTMLButtonElement | undefined
  >();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const onClick = useCallback(() => {
    closeAfterClicked && handleClose();
  }, [closeAfterClicked]);

  return (
    <div className={className}>
      <Badge
        max={maxNumberNotification}
        invisible={notificationNumber < 1}
        classes={{
          badge: classes.badge,
        }}
        overlap="circle"
        badgeContent={notificationNumber}
        color="error">
        <Card className={classes.card}>
          <IconButton
            onClick={handleClick}
            className={`${classes.iconButton} ${buttonClassName || ""}`}>
            <Icon
              className={classes.icon}
              name={iconName}
              width={iconWidth}
              height={iconHeight}
              fill={fill}
            />
          </IconButton>
        </Card>
      </Badge>
      <Popover
        onClick={onClick}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        className={popoverContainerClassName}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}>
        {renderContent(handleClose)}
      </Popover>
    </div>
  );
};

export default PopoverButton;
