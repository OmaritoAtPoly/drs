import { makeStyles, Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React from "react";
import AvailabilityContainer from "../../containers/schedule/AvailabilityContainer";
import ScheduleAppointmentContainer from "../../containers/schedule/ScheduleAppointmentContainer";
import STRINGS from "../../utils/strings";

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
  },
}));

export default function Schedule() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example">
        <Tab label={STRINGS.schedule.CALENDAR} {...a11yProps(0)} />
        <Tab label={STRINGS.schedule.AVAILABILITY_CONFIG} {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ScheduleAppointmentContainer />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AvailabilityContainer />
      </TabPanel>
    </div>
  );
}
