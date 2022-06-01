import { makeStyles, Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    overflow: "hidden",
  },
  tabsContainer: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    backgroundColor: theme.palette.common.white,
  },
  tabPanel: {
    marginTop: theme.spacing(5),
  },
  indicator: { backgroundColor: theme.palette.primary.main },
  textColor: {
    color: theme.palette.text.primary,
  },
}));

interface Props {
  tabs: { label: string; panel: React.ReactNode; hidden?: boolean }[];
}

export default function BasicTabs({ tabs }: Props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <div className={classes.tabsContainer}>
        <Tabs
          className={classes.textColor}
          value={value}
          onChange={handleChange}
          classes={{
            indicator: classes.indicator,
          }}
          aria-label="simple tabs example">
          {tabs.map((tab, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Tab key={index} label={tab.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </div>
      {tabs.map((tab, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className={classes.tabPanel} key={index}>
          <TabPanel value={value} index={index}>
            {tab.panel}
          </TabPanel>
        </div>
      ))}
    </div>
  );
}
