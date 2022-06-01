import { Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useCallback } from "react";
import theme from "../../styles/theme";
import STRINGS from "../../utils/strings";
import PrimaryButton from "../buttons/PrimaryButton";
import Icon from "../Icon/Icon";

// eslint-disable-next-line @typescript-eslint/no-shadow
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    completed: {
      borderColor: theme.palette.primary.main,
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 8,
    },
    disable: {
      borderColor: theme.palette.grey[700],
      backgroundColor: theme.palette.grey[300],
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 8,
    },
    error: {
      borderColor: theme.palette.error.main,
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 8,
    },
    accordionDetails: {
      display: "flex",
      flexDirection: "column",
    },
    full: {
      width: "100%",
    },
    actionContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
    accordionContainer: {
      marginBottom: 5,
      borderRadius: 10,
    },
    title: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: theme.palette.primary.main,
    },
    titleDisable: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: `${theme.palette.grey[700]} !important`,
    },
    titleError: {
      fontSize: "1rem",
      fontWeight: "bold",
      color: theme.palette.error.main,
    },
  }),
);

export type StatePanel = "completed" | "error" | "disable" | undefined;
interface Panel {
  title: string;
  state?: StatePanel;
  canBeCompleted?: () => boolean;
  renderContent: React.ReactNode;
  onSave?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    canBeCompleted: boolean,
  ) => void;
  onBack?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    canBeCompleted: boolean,
  ) => void;
}

interface Props {
  panels: Panel[];
  openPanelIndex?: number;
  onChangeOpenPanelIndex?: (index?: number) => void;
  showStepAction?: boolean;
  mode?: "free" | "nextIncomplete";
}

export default function WizardAccordion({
  panels,
  openPanelIndex,
  onChangeOpenPanelIndex = () => {},
  showStepAction = true,
  mode = "nextIncomplete",
}: Props) {
  const classes = useStyles();

  const handleChange = (index: number) => (
    event: React.ChangeEvent<{}>,
    isExpanded: boolean,
  ) => {
    if (panels[index].state === "disable") {
      return;
    }
    if (mode === "free") {
      onChangeOpenPanelIndex(isExpanded ? index : undefined);
      return;
    }
    if (
      mode === "nextIncomplete" &&
      (index === 0 || panels[index - 1].state === "completed")
    ) {
      onChangeOpenPanelIndex(isExpanded ? index : undefined);
    }
  };

  const onSaveCallBack = useCallback(
    (
      onSave: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        canBeCompleted: boolean,
      ) => void = () => {},
      // eslint-disable-next-line @typescript-eslint/no-shadow
      canBeCompleted: () => boolean = () => true,
    ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onSave(event, canBeCompleted());
    },
    [],
  );

  const onBackCallBack = useCallback(
    (
      onBack: (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        canBeCompleted: boolean,
      ) => void = () => {},
      // eslint-disable-next-line @typescript-eslint/no-shadow
      canBeCompleted: () => boolean = () => true,
    ) => (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      onBack(event, canBeCompleted());
    },
    [],
  );

  const classNameMemo = useCallback(
    (state?: StatePanel) => {
      switch (state) {
        case "disable":
          return classes.disable;
        case "completed":
          return classes.completed;
        case "error":
          return classes.error;
        default:
          return "";
      }
    },
    [classes.completed, classes.disable, classes.error],
  );

  return (
    <div className={classes.root}>
      {panels.map((
        // eslint-disable-next-line @typescript-eslint/no-shadow
        { title, state, onBack, onSave, canBeCompleted, renderContent },
        i,
      ) => (
        <Accordion
          className={classes.accordionContainer}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          expanded={openPanelIndex === i}
          onChange={handleChange(i)}>
          <AccordionSummary
            id={
              state === "disable"
                ? "AccordionSummaryDisable"
                : "AccordionSummary"
            }
            className={classNameMemo(state)}
            expandIcon={
              <Icon
                name="expandMore"
                fill={
                  state === "disable"
                    ? theme.palette.grey[300]
                    : theme.palette.common.white
                }
              />
            }
            aria-label="Expand"
            aria-controls="additional-actions1-content">
            {state === "completed" && (
              <FormControlLabel
                aria-label="Acknowledge"
                control={<Checkbox classes={{}} checked />}
                label={title}
              />
            )}
            {state === "disable" && (
              <Typography
                style={{ color: "#616161 !important" }}
                className={classes.titleDisable}>
                {title}
              </Typography>
            )}
            {state === undefined && (
              <Typography className={classes.title}>{title}</Typography>
            )}
            {state === "error" && (
              <Typography className={classes.titleError}>{title}</Typography>
            )}
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            {state !== "disable" && (
              <div className={classes.full}>{renderContent}</div>
            )}
            {showStepAction && (
              <div className={classes.actionContainer}>
                {i !== 0 && (
                  <PrimaryButton
                    variant="contained"
                    className={classes.button}
                    label={STRINGS.generals.BACK}
                    onClick={onBackCallBack(onBack, canBeCompleted)}
                  />
                )}
                <PrimaryButton
                  variant="contained"
                  className={classes.button}
                  label={STRINGS.generals.SAVE}
                  onClick={onSaveCallBack(onSave, canBeCompleted)}
                />
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
