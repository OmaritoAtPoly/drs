import { Box, Typography } from "@material-ui/core";
import React from "react";

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function TabNavigationPanel(props: Props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
