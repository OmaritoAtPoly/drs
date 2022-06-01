import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import theme from "../../../../styles/theme";
import STRINGS from "../../../../utils/strings";
import BadgedButton from "../../../buttons/BadgedButton";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "row",
    },
  }),
);

interface Props {
  handleAdd: () => void;
  handleAddFromFile: () => void;
  handleClose: () => void;
}

const ResultActionPanel = ({
  handleAdd,
  handleAddFromFile,
  handleClose,
}: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <BadgedButton
        onClick={handleAdd}
        iconName="add"
        fill={theme.palette.primary.main}
        iconWidth={15}
        iconHeight={15}
        toolTip={STRINGS.result.NEW_RESULT}
      />
      <BadgedButton
        onClick={handleAddFromFile}
        iconName="uploadIcon"
        fill={theme.palette.primary.main}
        iconWidth={15}
        iconHeight={15}
        toolTip={STRINGS.result.UPLOAD_RESULT}
      />
      <BadgedButton
        onClick={handleClose}
        iconName="closeIcon"
        iconWidth={15}
        iconHeight={15}
      />
    </div>
  );
};

export default ResultActionPanel;
