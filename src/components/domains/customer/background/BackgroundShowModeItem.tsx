import { List, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useCallback } from "react";

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
    marginRight: theme.spacing(1),
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: "100%",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  itemContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paragraph: {
    textAlign: "justify",
  },
  sideMargin: {
    marginTop: 0,
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
}));

type ItemType = {
  title: string;
  items: string[] | string;
  itemLabel?: string;
};

interface Props {
  key?: string | number;
  item: ItemType;
  showBullet?: boolean;
}

export default function BackgroundShowModeItem({
  key,
  item,
  showBullet = true,
}: Props) {
  const classes = styles();

  const renderItem = useCallback(
    // eslint-disable-next-line no-confusing-arrow
    () =>
      Array.isArray(item.items) ? (
        <div key={key} className={classes.container}>
          <Typography className={classes.title}>{item.title}</Typography>
          <List className={classes.listContainer}>
            {item.items.map((value, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className={classes.itemContainer}>
                {showBullet && <div className={classes.bullet} />}
                <Typography className={classes.paragraph}>{value}</Typography>
              </div>
            ))}
          </List>
        </div>
      ) : (
        <div key={key} className={`${classes.container} ${classes.sideMargin}`}>
          <Typography className={classes.title}>{item.title}</Typography>
          <div className={`${classes.itemContainer}`}>
            <Typography className={classes.paragraph}>
              {`${item.items} ${item.itemLabel || ""}`}
            </Typography>
          </div>
        </div>
      ),
    [
      classes.bullet,
      classes.container,
      classes.itemContainer,
      classes.listContainer,
      classes.paragraph,
      classes.sideMargin,
      classes.title,
      item.itemLabel,
      item.items,
      item.title,
      key,
      showBullet,
    ],
  );

  return renderItem();
}
