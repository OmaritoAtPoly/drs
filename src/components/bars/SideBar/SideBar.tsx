import { Link, makeStyles } from "@material-ui/core";
import React from "react";
import theme from "../../../styles/theme";
import { EMAIL_INFO_ECLINIQ } from "../../../utils/constants";
import STRINGS from "../../../utils/strings";
import BadgedButton from "../../buttons/BadgedButton";
import NavigationPanel from "./NavigationPanel";

const styles = makeStyles(() => ({
  container: {
    position: "fixed",
    zIndex: 1450,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  iconButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(2),
    width: theme.spacing(6),
    background: theme.palette.primary.main,
    paddingRight: 4,
    paddingLeft: 4,
  },
  iconButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: theme.spacing(5),
    width: theme.spacing(5),
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
  },
  icon: {
    boxShadow: "none",
    backgroundColor: theme.palette.primary.main,
  },
}));

interface Props {
  tabIndex?: number;
  isBasicPlan: boolean;
  planExpired?: boolean;
}

export default function SideBar({ tabIndex, isBasicPlan, planExpired }: Props) {
  const classes = styles();
  return (
    <div className={classes.container}>
      <NavigationPanel
        tabIndex={tabIndex}
        isBasicPlan={isBasicPlan}
        planExpired={planExpired}
      />
      <div className={classes.iconButtonContainer}>
        <Link target="_blank" href={`mailto:${EMAIL_INFO_ECLINIQ}`}>
          <BadgedButton
            containerStyle={classes.icon}
            buttonStyle={classes.iconButton}
            iconName="headSetMic"
            iconWidth={theme.spacing(2)}
            iconHeight={theme.spacing(2)}
            toolTip={STRINGS.generals.CUSTOMER_SERVICE}
          />
        </Link>
      </div>
    </div>
  );
}
