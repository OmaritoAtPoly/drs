import { makeStyles } from "@material-ui/core";
import SnackbarMaterial from "@material-ui/core/Snackbar";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import theme from "../../styles/theme";
import AppBarContainer from "../bars/AppBar/AppBarContainer";
import { useTabVisibleQuery } from "../bars/SideBar/query";
import SideBarContainer from "../bars/SideBar/SideBarContainer";
import BadgedButton from "../buttons/BadgedButton";
import SnackbarContainer from "../Snackbar/SnackbarContainer";
import logoEcliniq from "../../assert/logoEcliniq.png";

const styles = makeStyles(() => ({
  container: {
    height: window.innerHeight,
  },
  iconButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: theme.spacing(6),
    background: theme.palette.primary.main,
    paddingRight: 4,
    paddingLeft: 4,
  },
  iconButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 64,
    marginTop: -8,
    borderRadius: 0,
    background: theme.palette.primary.main,
    "&:hover": {
      background: theme.palette.primary.main,
    },
    boxShadow: "none",
  },
  labelButton: {
    backgroundColor: theme.palette.common.white,
    width: 30,
    padding: 8,
    borderRadius: 25,
    height: 30,
  },
  header: {
    position: "fixed",
    width: "100%",
    top: 0,
    zIndex: 1500,
    display: "flex",
    flexGrow: 1,
  },
  bar: {
    display: "flex",
    alignItems: "center",
  },
  bodyContainer: {
    display: "flex",
    height: "100%",
  },
  bodyContent: {
    display: "flex",
    width: "100%",
  },
  full: {
    width: "100%",
  },
  childrenContainer: {
    marginLeft: 55,
    marginTop: 64,
  },
}));

function WrapperApp({ children }: PropsWithChildren<{}>) {
  const classes = styles();
  const [openSnackbar, setOpenSnackbar] = useState(true);
  const { data } = useTabVisibleQuery({ showError: true });
  const {
    location: { pathname },
  } = useHistory();

  useEffect(() => {
    pathname === "login" && setOpenSnackbar(true);
  }, [pathname]);

  const IconApp = React.memo(() => (
    <div className={classes.iconButtonContainer}>
      <BadgedButton
        classNameLabel={classes.labelButton}
        containerStyle={classes.iconButton}
        iconFromImage={logoEcliniq}
        iconWidth={30}
        iconHeight={30}
      />
    </div>
  ));

  return (
    <div id="wrapper-app-container" className={classes.container}>
      {data?.visible && (
        <div className={classes.header}>
          <IconApp />
          <div className={classes.full}>
            <AppBarContainer />
          </div>
        </div>
      )}
      <div className={classes.bodyContainer}>
        {data?.visible && <SideBarContainer />}
        <div
          className={`${classes.full} ${
            data?.visible ? classes.childrenContainer : ""
          }`}>
          {children}
        </div>
      </div>
      <SnackbarMaterial open={openSnackbar}>
        <SnackbarContainer />
      </SnackbarMaterial>
    </div>
  );
}

export default WrapperApp;
