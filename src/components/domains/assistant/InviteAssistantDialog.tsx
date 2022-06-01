import { makeStyles } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import theme from "../../../styles/theme";
import STRINGS from "../../../utils/strings";
import LabeledButton from "../../buttons/LabeledButton";
import AddAssistant from "./AddAssistant";
import Assistants from "./Assistants";

interface Props {
  handleSetShowAdd: () => void;
  showAdd: boolean;
  handleSubmitForm: (value: Schemas.EmailNameRequest) => void;
  loading?: boolean;
  assistantsList?: Schemas.AssistantResponse[];
  deletingAssistant?: boolean;
  handleDeleteAssistant: (assistantId: string) => void;
}

const styles = makeStyles({
  titleStyle: {
    fontWeight: "bold",
  },
  labeledButtonStyle: {
    width: "20%",
    marginBlock: theme.spacing(2),
  },
});

export default function InviteAssistantDialog({
  loading = false,
  handleSubmitForm,
  handleSetShowAdd,
  showAdd,
  assistantsList,
  handleDeleteAssistant,
  deletingAssistant,
}: Props) {
  const classes = styles();
  const [assistant, setAssistant] = useState<string | undefined>();
  const handleOnDeleteAssistant = useCallback(
    (code: string) => {
      setAssistant(code);
      handleDeleteAssistant(code);
    },
    [handleDeleteAssistant],
  );

  return (
    <div>
      <LabeledButton
        containerStyle={classes.labeledButtonStyle}
        buttonLabel={STRINGS.signUp.INVITE_ASSISTANT}
        iconName="add"
        onClick={handleSetShowAdd}
      />
      {showAdd && (
        <AddAssistant handleSubmitForm={handleSubmitForm} loading={loading} />
      )}
      {assistantsList &&
        assistantsList.map((a) => (
          <Assistants
            assistant={a}
            key={a.code}
            handleDeleteAssistant={handleOnDeleteAssistant}
            deletingAssistant={assistant === a.code && deletingAssistant}
          />
        ))}
    </div>
  );
}
