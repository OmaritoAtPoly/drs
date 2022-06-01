import { makeStyles, TextareaAutosize, Typography } from "@material-ui/core";
import React from "react";
import theme from "../../../../../../styles/theme";
import STRINGS from "../../../../../../utils/strings";

interface Props {
  aboutMe: string;
  handleChange: (e: React.ChangeEvent<unknown>) => void;
}

const styles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  titleStyle: {
    display: "flex",
    color: theme.palette.primary.main,
    fontSize: "1rem",
    [theme.breakpoints.down("xs")]: {
      width: "60%",
    },
  },
});

const textAreaStyle = {
  height: "100px",
  width: "100%",
  display: "flex",
  alignSelf: "center",
};

const AboutMe = ({ aboutMe, handleChange }: Props) => {
  const classes = styles();

  return (
    <div id="about-me-container" className={classes.container}>
      <Typography className={classes.titleStyle}>
        {STRINGS.signUp.ABOUT_ME}
      </Typography>
      <TextareaAutosize
        rowsMax={4}
        name="aboutMe"
        value={aboutMe}
        onChange={handleChange}
        style={textAreaStyle}
      />
    </div>
  );
};

export default AboutMe;
