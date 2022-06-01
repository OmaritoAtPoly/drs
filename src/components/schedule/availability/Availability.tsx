import AppBar from "@material-ui/core/AppBar";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import React, { useCallback } from "react";
import useScheduleUtility from "../../../modules/utils/availability";
import STRINGS from "../../../utils/strings";
import AvailabilityGrid from "./AvailabilityGrid";
import AvailabilityHeader from "./AvailabilityHeader";
import AvailabilityPanel from "./AvailabilityPanel";
import HealthCenterAddressPanel from "./HealthCenterAddressPanel";

function a11yProps(index: number) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

interface Props {
  healthCenters?: Schemas.ProfessionalHealthCenterResponse[];
  durationTime: number;
}

export default function Availability({ healthCenters, durationTime }: Props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {
    availabilityGrid,
    durationTime: appointmentDuration,
    loadingConfiguration,
    configuringAvailabilities,
    handleOnSentDurationTime,
    onCellClicked,
    onCellHover,
  } = useScheduleUtility(
    (healthCenters && healthCenters[value].code) ||
      STRINGS.schedule.REMOTE_APPOINTMENT,
    durationTime,
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleOnIntervalTimeChange = useCallback(
    (interval: string) => {
      handleOnSentDurationTime(parseInt(interval, 10));
    },
    [handleOnSentDurationTime],
  );

  return (
    <div>
      <AvailabilityHeader
        onIntervalTimeChange={handleOnIntervalTimeChange}
        durationTime={appointmentDuration.toString()}
      />
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example">
            {healthCenters?.map((center, index: number) => (
              <Tab
                key={center.code}
                label={center.name}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </AppBar>
        {healthCenters?.map((center, index: number) => (
          <AvailabilityPanel key={center.code} index={index} value={value}>
            <>
              <HealthCenterAddressPanel center={center} />
              <AvailabilityGrid
                loading={loadingConfiguration || configuringAvailabilities}
                availabilityGrid={availabilityGrid || []}
                onCellClicked={onCellClicked}
                onCellHover={onCellHover}
              />
            </>
          </AvailabilityPanel>
        ))}
      </div>
    </div>
  );
}
