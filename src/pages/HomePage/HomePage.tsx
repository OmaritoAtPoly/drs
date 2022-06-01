import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import WrapperPage from "../../components/wrappers/WrapperPage";
import BannerContainer from "../../containers/BannerContainer";
import RecentAppointmentDialogContainer from "../../containers/customer/appointment/recentAppoinmet/RecentAppointmentDialogContainer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
      width: "100%",
    },
    background: {
      zIndex: 100,
      position: "fixed",
      top: 64,
      left: 55,
      right: 0,
      backgroundColor: theme.palette.grey[500],
      height: window.innerHeight - 360,
    },
  }),
);

function Home() {
  const classes = useStyles();

  return (
    <WrapperPage>
      <div className={classes.background}>
        <BannerContainer />
      </div>
      <div className={classes.container}>
        <RecentAppointmentDialogContainer />
      </div>
    </WrapperPage>
  );
}

export default Home;
