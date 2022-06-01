import {
  CircularProgress,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../../../utils/strings";
import CardLayout from "../../../../../cards/CardLayout";
import PanelItem from "./PanelItem";

interface Props {
  loading: boolean;
  panels: Schemas.CategoryData[];
  handleAddRequestItemFromModal: (
    categories: Schemas.CategoryExamData[],
  ) => void;
}

const styles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  title: {
    paddingBlock: theme.spacing(1),
  },
}));

export default function LaboratoryPanel({
  loading,
  handleAddRequestItemFromModal,
  panels,
}: Props) {
  const classes = styles();
  return loading ? (
    <CircularProgress />
  ) : (
    <div className={classes.container}>
      <Typography className={classes.title}>
        {STRINGS.buttonGrid.LAB_PANEL}
      </Typography>
      <CardLayout className={classes.content}>
        {panels &&
          panels.map((panel) => (
            <PanelItem
              key={panel.code}
              panel={panel}
              handleAddRequestItemFromModal={handleAddRequestItemFromModal}
            />
          ))}
      </CardLayout>
    </div>
  );
}
