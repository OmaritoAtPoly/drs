import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import shortid from "shortid";
import theme from "../../../styles/theme";

interface Props {
  title?: string;
  content?: string[];
  containerStyle?: string;
  contentStyle?: string;
  showBullet?: boolean;
}
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    padding: theme.spacing(1),
  },
  bullet: {
    backgroundColor: theme.palette.common.black,
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: "100%",
    marginRight: theme.spacing(2),
  },
  itemsStyle: {
    display: "flex",
    alignItems: "center",
  },
  titleStyle: {
    color: theme.palette.secondary.main,
    fontSize: theme.spacing(2.5),
    fontWeight: "bold",
  },
  contentStyle: {
    display: "flex",
    textAlign: "justify",
  },
});

const ProfileSectionContent = ({
  content = [],
  title = "",
  containerStyle = "",
  contentStyle = "",
  showBullet = true,
}: Props) => {
  const classes = useStyles();

  return (
    <div
      id="id-profile-section-container"
      className={`${classes.root} ${containerStyle}`}>
      {title && <Typography className={classes.titleStyle}>{title}</Typography>}
      {content &&
        content[0] !== "" &&
        content.map((a) => (
          <div className={classes.itemsStyle} id="item-element-container">
            {showBullet && <div className={classes.bullet} />}
            <Typography
              className={`${classes.contentStyle} ${contentStyle}`}
              key={shortid()}>
              {a}
            </Typography>
          </div>
        ))}
    </div>
  );
};

export default ProfileSectionContent;
