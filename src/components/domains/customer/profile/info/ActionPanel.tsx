import { makeStyles } from "@material-ui/core";
import React from "react";
import useProfileCacheSelector from "../../../../../modules/profile/cacheSelector";
import theme from "../../../../../styles/theme";
import BadgedButton from "../../../../buttons/BadgedButton";
import { IconNames } from "../../../../Icon/IconNames";
import ToolTipWrapper from "../../../../wrappers/ToolTipWrapper";

const styles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "end",
    marginRight: "60px",
  },
  popperStyle: {
    color: "#828282",
    backgroundColor: "#d6e3f3",
    width: "60px",
    textAlign: "center",
  },
});

interface Props {
  onButtonClicked: (buttonName: string) => void;
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
}

export default function ActionPanel({ actionButton, onButtonClicked }: Props) {
  const classes = styles();
  const { isAssistant } = useProfileCacheSelector();

  return (
    <div className={classes.container}>
      {actionButton?.map((actionBtn) => (
        <ToolTipWrapper
          id="tool-tip-wrapper"
          key={actionBtn.index}
          title={actionBtn.toolTipTitle || ""}
          arrow
          placement="top"
          classes={{ tooltipPlacementTop: classes.popperStyle }}>
          <BadgedButton
            iconName={actionBtn.iconName}
            onClick={
              () => onButtonClicked(actionBtn.toolTipTitle || "")
              // eslint-disable-next-line react/jsx-curly-newline
            }
            fill={isAssistant() ? theme.palette.grey[900] : theme.palette.primary.main}
            notificationNumber={actionBtn.notificationNumber}
            iconHeight={actionBtn.iconHeight}
            iconWidth={actionBtn.iconWidth}
          />
        </ToolTipWrapper>
      ))}
    </div>
  );
}
