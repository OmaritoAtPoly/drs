import { List, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";

const styles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    marginTop: theme.spacing(2),
    maxWidth: "232px",
  },
  title: {
    fontWeight: "bold",
  },
  bullet: {
    backgroundColor: "black",
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: "100%",
    position: "absolute",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(-2),
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  itemContainer: {
    display: "flex",
    position: "relative",
  },
  paragraph: {
    textAlign: "justify",
  },
}));

interface Props {
  pathologicalItem: Schemas.CustomerFamilyPathologiesData;
}

export default function PathologicalBackgroundShowModeItem({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pathologicalItem,
}: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <Typography className={classes.title}>
        {pathologicalItem.familyMember}
      </Typography>
      <List className={classes.listContainer}>
        {pathologicalItem.pathologies?.map((pathology) => (
          <div className={classes.itemContainer}>
            <div className={classes.bullet} />
            <Typography className={classes.paragraph}>{pathology}</Typography>
          </div>
        ))}
      </List>
    </div>
  );
}
