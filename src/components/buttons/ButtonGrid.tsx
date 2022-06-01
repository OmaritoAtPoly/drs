/* eslint-disable react/jsx-curly-newline */
import React, { useCallback } from "react";
import { ButtonGroup, makeStyles } from "@material-ui/core";
import { IconNames } from "../Icon/IconNames";
import BadgedButton from "./BadgedButton";
import ToolTipWrapper from "../wrappers/ToolTipWrapper";
import PopoverButton from "./PopOverButton";
import DefaultPopoverPanel from "./DefaultPopoverPanel";
import theme from "../../styles/theme";

interface Props {
  handleDialogName: (value: string) => void;
  disabled?: boolean;
  actionButton?: {
    index: number;
    notificationNumber: number;
    iconName?: IconNames;
    iconHeight?: number;
    iconWidth?: number;
    toolTipTitle?: string;
    popOver: boolean;
    popOverAction?: {
      firstAction: string;
      secondAction: string;
    };
  }[];
  isAssistant: () => boolean;
}

const useStyles = makeStyles({
  root: {
    justifyContent: "center",
    flexWrap: "wrap",
  },
  popperStyle: {
    // todo Add this color to pallette
    color: "#828282",
    backgroundColor: "#d6e3f3",
    width: theme.spacing(10),
    textAlign: "center",
  },
  popoverButton: {
    display: "flex",
    alignItems: "center",
    marginTop: "3px",
  },
});

const ButtonGrid = ({
  disabled = false,
  actionButton,
  handleDialogName,
  isAssistant,
}: Props) => {
  const classes = useStyles();
  const toolTipTitle = "";

  const renderBadgeButton = useCallback(
    (actionBtn) => (
      <ToolTipWrapper
        id={`tool-tip-wrapper${actionBtn.index}`}
        key={actionBtn.index}
        title={actionBtn.toolTipTitle || toolTipTitle}
        arrow
        disableHoverListener={disabled}
        placement="top"
        classes={{ tooltipPlacementTop: classes.popperStyle }}>
        <BadgedButton
          iconName={actionBtn.iconName}
          disabled={disabled}
          onClick={() =>
            handleDialogName(actionBtn.toolTipTitle || toolTipTitle)
          }
          fill={
            isAssistant() ? theme.palette.grey[900] : theme.palette.primary.main
          }
          notificationNumber={actionBtn.notificationNumber}
          iconHeight={actionBtn.iconHeight}
          iconWidth={actionBtn.iconWidth}
        />
      </ToolTipWrapper>
    ),
    [classes.popperStyle, disabled, handleDialogName, isAssistant],
  );

  const renderPopOverButton = useCallback(
    (actionBtn) => (
      <ToolTipWrapper
        id={`tool-tip-wrapper${actionBtn.index}`}
        key={actionBtn.index}
        title={actionBtn.toolTipTitle || toolTipTitle}
        arrow
        disableHoverListener={disabled}
        placement="top"
        classes={{ tooltipPlacementTop: classes.popperStyle }}>
        <PopoverButton
          className={classes.popoverButton}
          renderContent={() => (
            <DefaultPopoverPanel
              firstItemTitle={actionBtn.popOverAction.firstAction}
              secondItemTitle={actionBtn.popOverAction.secondAction}
              onFirstItemClick={() =>
                handleDialogName(actionBtn.popOverAction.firstAction || "")
              }
              onSecondItemClick={() =>
                handleDialogName(actionBtn.popOverAction.secondAction || "")
              }
            />
          )}
          fill={
            isAssistant() ? theme.palette.grey[900] : theme.palette.primary.main
          }
          iconHeight={actionBtn.iconHeight}
          iconWidth={actionBtn.iconWidth}
          iconName={actionBtn.iconName}
        />
      </ToolTipWrapper>
    ),
    [
      classes.popoverButton,
      classes.popperStyle,
      disabled,
      handleDialogName,
      isAssistant,
    ],
  );

  return (
    <ButtonGroup className={classes.root}>
      {actionButton &&
        // eslint-disable-next-line no-confusing-arrow
        actionButton.map((actionBtn) =>
          actionBtn.popOver
            ? renderPopOverButton(actionBtn)
            : renderBadgeButton(actionBtn),
        )}
    </ButtonGroup>
  );
};

export default ButtonGrid;
