import { ListItem, ListItemText, makeStyles } from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
import theme from "../../../styles/theme";
import STRINGS from "../../../utils/strings";
import BadgedButton from "../../buttons/BadgedButton";

interface Props {
  deletingAssistant?: boolean;
  handleDeleteAssistant: (assistantId: string) => void;
  assistant: Schemas.AssistantResponse;
}

const styles = makeStyles({
  largeColumn: {
    width: "20%",
    padding: 2,
  },
  center: { alignSelf: "center" },
  flex: { display: "flex" },
  shortColumn: {
    width: "10%",
    padding: 2,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  buttonWrapperStyle: {
    display: "flex",
    width: "50%",
    flexWrap: "wrap",
    paddingInline: "16px",
  },
  assistantValues: {
    display: "flex",
  },
});

const Assistants = ({
  assistant,
  handleDeleteAssistant,
  deletingAssistant,
}: Props) => {
  const classes = styles();

  const handleOnDeleteAssistant = useCallback(() => {
    handleDeleteAssistant(assistant.code);
  }, [assistant.code, handleDeleteAssistant]);

  const hoverComponent = useMemo(
    () => (
      <div className={classes.flex}>
        <div>
          <BadgedButton
            iconName="delete"
            circular
            onClick={handleOnDeleteAssistant}
            loading={deletingAssistant}
          />
        </div>
      </div>
    ),
    [classes.flex, handleOnDeleteAssistant, deletingAssistant],
  );

  return (
    <ListItem id="assistants-list" button className={classes.container}>
      <div>
        <ListItemText
          classes={{ root: classes.center }}
          primary={
            assistant.active
              ? STRINGS.generals.ACTIVE
              : STRINGS.generals.INACTIVE
          }
        />
      </div>
      <div>
        <ListItemText
          classes={{ root: classes.center }}
          primary={assistant.name}
        />
      </div>
      <div id="button-options" className={classes.buttonWrapperStyle}>
        <ListItemText primary={assistant.email} />
        {hoverComponent}
      </div>
    </ListItem>
  );
};

export default Assistants;
