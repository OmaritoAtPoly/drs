import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import useHandlerError from "../../../modules/utils/error/handleError";
import theme from "../../../styles/theme";
import { DEFAULT_PAGE_SIZE } from "../../../utils/constants";
import STRINGS from "../../../utils/strings";
import BadgedButton from "../../buttons/BadgedButton";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
    paddingTop: 80,
    backgroundColor: theme.palette.primary.main,
    paddingRight: 4,
    paddingLeft: 4,
  },
  tabs: {
    display: "flex",

    alignContent: "center",
    background: theme.palette.primary.main,
  },
  tab: {
    minWidth: theme.spacing(0),
    width: theme.spacing(6),
    height: theme.spacing(6),
    opacity: 1,
  },
  indicator: {
    background: theme.palette.info.main,
    width: theme.spacing(0.5),
    left: 0,
  },
  innerTab: {
    background: theme.palette.info.main,
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

export default function NavigationPanel({
  tabIndex,
  isBasicPlan,
  planExpired,
}: Props) {
  const classes = useStyles();
  const { push } = useHistory();
  const { handlerError } = useHandlerError();
  const { hasActiveSubscription } = useProfileCacheSelector();

  const handlePushRoute = useCallback(
    (route: string) => {
      if (hasActiveSubscription) {
        push(route);
      } else {
        handlerError(STRINGS.payPlan.NOT_SUBSCRIBED_MESSAGE);
      }
    },
    [handlerError, hasActiveSubscription, push],
  );

  const handleChange = (
    _event: React.ChangeEvent<Record<string, never>>,
    newValue: number,
  ) => {
    if (planExpired) return;
    switch (newValue) {
      case 0:
        push("/");
        break;
      case 1:
        handlePushRoute(
          `/patients/?page=${0}&pageSize=${DEFAULT_PAGE_SIZE}&filter=${""}`,
        );
        break;
      case 2:
        handlePushRoute("/schedule");
        break;
      case 3:
        handlePushRoute("/service");
        break;
      case 4:
        handlePushRoute("/order");
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <Tabs
        className={classes.tabs}
        classes={{ indicator: classes.indicator }}
        orientation="vertical"
        variant="scrollable"
        value={tabIndex}
        onChange={handleChange}
        aria-label="Vertical tabs example">
        <Tab
          className={classes.tab}
          {...a11yProps(0)}
          icon={
            <BadgedButton
              containerStyle={classes.icon}
              iconName="sideBarHome"
              fill={tabIndex === 0 ? theme.palette.info.main : "white"}
              toolTip={STRINGS.generals.HOME}
            />
          }
        />
        <Tab
          className={classes.tab}
          {...a11yProps(1)}
          icon={
            <BadgedButton
              containerStyle={classes.icon}
              iconName="userFace"
              fill={tabIndex === 1 ? theme.palette.info.main : "white"}
              toolTip={STRINGS.generals.CUSTOMERS}
            />
          }
        />
        {/* TODO hide for this MVP */}
        {/* <Tab
          className={classes.tab}
          {...a11yProps(2)}
          icon={
            <BadgedButton
              containerStyle={classes.icon}
              iconName="mouse"
              fill={tabIndex === 2 ? theme.palette.info.main : "white"}
              toolTip={STRINGS.generals.TUTORIALS}
            />
          }
        /> */}
        <Tab
          className={classes.tab}
          {...a11yProps(2)}
          icon={
            <BadgedButton
              containerStyle={classes.icon}
              iconName="calendar"
              fill={tabIndex === 2 ? theme.palette.info.main : "white"}
              toolTip={STRINGS.generals.CALENDARS}
            />
          }
        />
        {/* TODO hide for this MVP */}
        {/*
        <Tab
          className={classes.tab}
          {...a11yProps(4)}
          icon={
            <BadgedButton
              containerStyle={classes.icon}
              iconName="waitingRoom"
              fill={tabIndex === 4 ? theme.palette.info.main : "white"}
              toolTip={STRINGS.generals.WAITING_ROOM}
            />
          }
        /> */}
        {!isBasicPlan && (
          <Tab
            className={classes.tab}
            {...a11yProps(3)}
            icon={
              <BadgedButton
                containerStyle={classes.icon}
                iconName="box"
                fill={tabIndex === 3 ? theme.palette.info.main : "white"}
                toolTip={STRINGS.generals.PRODUCT}
              />
            }
          />
        )}
        {!isBasicPlan && (
          <Tab
            className={classes.tab}
            {...a11yProps(4)}
            icon={
              <BadgedButton
                containerStyle={classes.icon}
                iconName="money"
                fill={tabIndex === 4 ? theme.palette.info.main : "white"}
                toolTip={STRINGS.generals.PAYMENT}
              />
            }
          />
        )}
        {/* TODO hide for this MVP */}
        {/* <Tab
          className={classes.tab}
          {...a11yProps(7)}
          icon={
            <BadgedButton
              containerStyle={classes.icon}
              iconName="graphic"
              fill={tabIndex === 7 ? theme.palette.info.main : "white"}
              toolTip={STRINGS.generals.STATISTICS}
            />
          }
        />
        <Tab
          className={classes.tab}
          {...a11yProps(8)}
          icon={
            <BadgedButton
              containerStyle={classes.icon}
              iconName="chat"
              fill={tabIndex === 8 ? theme.palette.info.main : "white"}
              toolTip={STRINGS.generals.ECLINIQ_CHAT}
            />
          }
        /> */}
      </Tabs>
    </div>
  );
}
