import {
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  RadioProps,
  Typography,
  withStyles,
} from "@material-ui/core";
import React from "react";
import STRINGS from "../../../utils/strings";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    maxWidth: "310px",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
  },
  itemContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
    color: theme.palette.common.white,
  },
  radioGroup: {
    width: "100%",
    marginLeft: "27px",
  },
}));

const WhiteRadio = withStyles({
  root: {
    color: "#fff",
    "&$checked": {
      color: "#fff",
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

interface Props {
  centerCode: string;
  centers: Schemas.ProfessionalHealthCenterResponse[];
  onSelectCenter: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function HealthCentersPanel({
  centerCode,
  centers,
  onSelectCenter,
}: Props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <Typography>{STRINGS.generals.HEALTH_CENTERS}</Typography>
      </div>
      <RadioGroup
        onChange={onSelectCenter}
        row
        aria-label="health-center"
        name="health-center"
        value={centerCode}
        className={classes.radioGroup}>
        {centers.map((center) => (
          <FormControlLabel
            key={center.code}
            className={classes.itemContainer}
            value={center.code}
            control={<WhiteRadio />}
            label={center.name}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
