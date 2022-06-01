/* eslint-disable no-confusing-arrow */
import { Badge, Card, IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import Icon from "../Icon/Icon";
import { IconNames } from "../Icon/IconNames";
import LoadingWrapper from "../LoadingWrapper";
import ToolTipWrapper from "../wrappers/ToolTipWrapper";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  notificationNumber?: number;
  iconName?: IconNames;
  iconFromImage?: string;
  maxNumberNotification?: number;
  iconWidth?: number;
  iconHeight?: number;
  fill?: string;
  containerStyle?: string;
  classNameLabel?: string;
  classNameWrapper?: string;
  buttonStyle?: string;
  disabled?: boolean;
  circular?: boolean;
  loading?: boolean;
  toolTip?: string;
}

const useStyles = makeStyles({
  iconButton: {
    display: "flex",
    width: "30px",
    height: "30px",
  },
  icon: {
    display: "flex",
    padding: "4px",
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
  circular: {
    borderRadius: 50,
  },
  popperStyle: {
    // todo Add this color to pallette
    color: "#828282",
    backgroundColor: "#d6e3f3",
    width: "60px",
    textAlign: "center",
  },
});

const BadgedButton = ({
  maxNumberNotification = 9,
  onClick = () => {},
  iconName = "home",
  notificationNumber = 0,
  iconWidth,
  iconHeight,
  fill,
  containerStyle = "",
  classNameWrapper = "",
  disabled = false,
  circular = false,
  loading = false,
  toolTip = undefined,
  buttonStyle = "",
  iconFromImage,
  classNameLabel = "",
}: Props) => {
  const classes = useStyles();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ContainerBadgedButton = React.memo(({ children }: any) =>
    toolTip ? (
      <ToolTipWrapper
        classes={{ tooltipPlacementTop: classes.popperStyle }}
        title={toolTip}
        arrow
        placement="top">
        {children}
      </ToolTipWrapper>
    ) : (
      children
    ),
  );

  return (
    <ContainerBadgedButton>
      <Badge
        max={maxNumberNotification}
        invisible={notificationNumber < 1}
        classes={{
          badge: classes.badge,
        }}
        overlap="circle"
        badgeContent={notificationNumber}
        color="error">
        <LoadingWrapper classNameContainer={classNameWrapper} loading={loading}>
          <Card
            className={`${containerStyle} ${circular ? classes.circular : ""}`}>
            <IconButton
              onClick={onClick}
              classes={{ label: classNameLabel }}
              className={`${classes.iconButton} ${buttonStyle}`}
              disabled={disabled}>
              {iconFromImage && (
                <img
                  className={classes.icon}
                  width={iconWidth}
                  height={iconHeight}
                  src={iconFromImage}
                  alt="american-card"
                />
              )}
              {!iconFromImage && (
                <Icon
                  className={classes.icon}
                  name={iconName}
                  width={iconWidth}
                  height={iconHeight}
                  fill={fill}
                />
              )}
            </IconButton>
          </Card>
        </LoadingWrapper>
      </Badge>
    </ContainerBadgedButton>
  );
};

export default BadgedButton;
