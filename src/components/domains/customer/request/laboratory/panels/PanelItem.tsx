import { Card, makeStyles, Theme } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import PanelItemForm from "./PanelItemForm";
import PanelItemModal from "./PanelItemModal";

const styles = makeStyles((theme: Theme) => ({
  container: {
    margin: theme.spacing(0.5),
    backgroundColor: "#F9F9F9",
    border: "1px solid #D6E3F3",
    width: "125px",
    cursor: "pointer",
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
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
  },
}));

interface Props {
  panel: Schemas.CategoryData;
  handleAddRequestItemFromModal: (
    categories: Schemas.CategoryExamData[],
  ) => void;
}

export default function PanelItem({
  panel,
  handleAddRequestItemFromModal,
}: Props) {
  const classes = styles();
  const [visible, setVisible] = useState<boolean>(false);
  const handleVisible = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const handleSubmit = useCallback(
    (categories: Schemas.CategoryExamData[]) => {
      handleAddRequestItemFromModal(categories);
      handleVisible();
    },
    [handleAddRequestItemFromModal, handleVisible],
  );

  return (
    <div>
      <Card className={classes.container} onClick={handleVisible}>
        <div className={classes.content}>
          <p className={classes.labelStyle}>{panel.name}</p>
        </div>
      </Card>
      <PanelItemModal
        open={visible}
        title={`Panel de ${panel.name}`}
        handleShow={handleVisible}>
        <PanelItemForm
          initialValue={[]}
          options={panel.exams || []}
          handleAddRequestItemFromModal={handleSubmit}
        />
      </PanelItemModal>
    </div>
  );
}
