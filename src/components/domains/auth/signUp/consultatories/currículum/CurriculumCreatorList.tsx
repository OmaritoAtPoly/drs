import { Button, Dialog, makeStyles } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import STRINGS from "../../../../../../utils/strings";
import Curriculum from "./Curriculum";
import CurriculumList from "./CurriculumList";

interface Props {
  curriculumList: string[];
  setFieldValue: (field: string, value: string[]) => void;
  fieldName: string;
  loading?: boolean;
}

const styles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: "16px",
  },
  addPhoneWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  buttonStyle: {
    display: "flex",
    alignSelf: "center",
    width: "100%",
    marginTop: 2,
    height: 40,
  },
});

const CurriculumCreatorList = ({
  loading,
  setFieldValue,
  fieldName,
  curriculumList,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const classes = styles();

  const onAddCurriculum = useCallback(
    (value: string) => {
      setFieldValue(fieldName, [...curriculumList, value]);
      setVisible(!visible);
    },
    [setFieldValue, curriculumList, setVisible, visible, fieldName],
  );

  const onPressDelete = useCallback(
    (value: string) => {
      const valueRemaining = curriculumList.filter((a) => a !== value);
      setFieldValue(fieldName, valueRemaining);
    },
    [fieldName, curriculumList, setFieldValue],
  );

  return (
    <div className={classes.root}>
      <Dialog
        hideBackdrop // Disable the backdrop color/image
        disableEnforceFocus // Let the user focus on elements outside the dialog
        disableBackdropClick // Remove the backdrop click (just to be sure)
        open={visible}
        onClose={() => setVisible(!visible)}>
        <Curriculum loading={loading} handleSubmitValues={onAddCurriculum} />
      </Dialog>
      <div className={classes.addPhoneWrapper}>
        <CurriculumList curriculums={curriculumList} onDelete={onPressDelete} />
        <Button
          className={classes.buttonStyle}
          onClick={() => setVisible(true)}
          variant="outlined">
          {STRINGS.generals.ADD}
        </Button>
      </div>
    </div>
  );
};

export default CurriculumCreatorList;
