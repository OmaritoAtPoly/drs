import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";

const BottomIndicatorTabs = withStyles((theme: Theme) =>
  createStyles({
    root: {
      borderBottom: "1px solid #e8e8e8",
      backgroundColor: theme.palette.common.white,
    },
    indicator: {
      backgroundColor: theme.palette.primary.main,
    },
  }),
)(Tabs);

export default BottomIndicatorTabs;
