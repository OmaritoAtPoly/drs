/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppBar } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DEFAULT_OFFSET_TAB } from "../../utils/constants";
import WrapperPage from "../wrappers/WrapperPage";
import BottomIndicatorTabs from "./BottomIndicadorTabs";
import BottomIndicatorTab from "./BottomIndicatorTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  onYChange?: (y: number) => void;
  className?: string;
}

function TabPanel({
  children,
  index,
  onYChange = () => {},
  ...other
}: TabPanelProps) {
  const ref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (!ref && !(ref as any).current) return;
      const { y } = (ref as any).current.getBoundingClientRect();
      onYChange(y);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onYChange]);

  return (
    <div
      ref={ref as any}
      role="tabpanel"
      hidden={false}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}>
      {children}
    </div>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flexGrow: 1,
      width: "100%",
    },
    tabsContainer: {
      top: 65,
      left: 48,
    },
    hidden: {
      display: "none",
    },
  }),
);

interface Props {
  tabs: {
    label: string;
    panel: React.ReactNode;
    hidden?: boolean;
    hiddenTab?: boolean;
  }[];
  index?: number;
  onIndexChange?: (event: React.ChangeEvent<{}>, newValue: number) => void;
  scrollWidthOffset?: number;
  position?: "fixed" | "absolute" | "relative" | "static" | "sticky";
  tabsContainerClassName?: string;
  panelsContainerClassName?: string;
}

function ScrollableTabs({
  tabs,
  index,
  onIndexChange = () => {},
  scrollWidthOffset,
  position,
  tabsContainerClassName,
  panelsContainerClassName,
}: Props) {
  const classes = useStyles();
  const [yAndIndex, setYAndIndex] = useState({ y: Number.MAX_VALUE, index });
  const [lastY, setLastY] = useState(0);

  const onYChange = useCallback(
    (newIndex: number) => (y: number) => {
      if (
        Math.abs(Math.abs(y) - DEFAULT_OFFSET_TAB) <
          Math.abs(yAndIndex.y - DEFAULT_OFFSET_TAB) &&
        newIndex !== yAndIndex.index
      ) {
        setYAndIndex({
          y: Math.abs(y),
          index: newIndex,
        });
        onIndexChange({} as any, newIndex);
        // TODO: fixed issue with indicator in tabs
        if (lastY < y && yAndIndex.index && yAndIndex.index < newIndex) {
          onIndexChange({} as any, newIndex);
        }
        if (lastY > y && yAndIndex.index && yAndIndex.index > newIndex) {
          onIndexChange({} as any, newIndex);
        }
      }
      if (newIndex === yAndIndex.index) {
        setYAndIndex({
          y: Math.abs(y),
          index: newIndex,
        });
      }
      setLastY(y);
    },
    [lastY, onIndexChange, yAndIndex.index, yAndIndex.y],
  );

  return (
    <WrapperPage>
      <div className={classes.container}>
        <AppBar
          className={tabsContainerClassName}
          position={position || "static"}>
          <BottomIndicatorTabs
            value={index}
            onChange={onIndexChange}
            variant="scrollable"
            scrollButtons="on"
            aria-label="ant example">
            {tabs
              .filter((tab) => !tab.hiddenTab)
              .map(({ label }, i) => (
                <BottomIndicatorTab
                  label={label}
                  to={`#scrollable-force-tabpanel-${i}`}
                  scrollWidthOffset={scrollWidthOffset}
                />
              ))}
          </BottomIndicatorTabs>
        </AppBar>
        <div
          style={{
            height: "100%",
          }}
          className={panelsContainerClassName}>
          {tabs.map(({ panel, hidden }, i) => (
            <TabPanel
              className={hidden ? classes.hidden : ""}
              onYChange={onYChange(i)}
              index={i}>
              {panel}
            </TabPanel>
          ))}
        </div>
      </div>
    </WrapperPage>
  );
}

export default ScrollableTabs;
