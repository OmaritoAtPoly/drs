import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import STRINGS from "../../../../../utils/strings";
import CardLayout from "../../../../cards/CardLayout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: "#323232",
      fontSize: "15px",
      lineHeight: "20px",
      fontWeight: "bold",
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(2),
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      marginBottom: theme.spacing(1.5),
    },
    cardStyle: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    bodyCardStyle: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    button: {
      textTransform: "none",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      marginLeft: theme.spacing(2),
    },
    buttonSpace: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    lastColumn: {
      marginRight: theme.spacing(2),
    },
  }),
);

const LaboratoryPanel = () => {
  const classes = useStyles();

  return (
    <div>
      <div>
        <Typography className={classes.title}>
          {STRINGS.newConsult.PANEL_LABORATORY}
        </Typography>
      </div>
      <CardLayout onClick={() => {}} className={classes.bodyCardStyle}>
        <div className={classes.row}>
          <div className={classes.formGroup}>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Hematología
              </Button>
            </div>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Cardiovascular
              </Button>
            </div>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Inflamatorio
              </Button>
            </div>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Drogas
              </Button>
            </div>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Orina
              </Button>
            </div>
          </div>
          <div className={classes.formGroup}>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Orina
              </Button>
            </div>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Reproductivo
              </Button>
            </div>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Inmunología
              </Button>
            </div>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Anticuerpos
              </Button>
            </div>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Copro
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className={classes.formGroup}>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Lipídico
              </Button>
            </div>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Inmunología
              </Button>
            </div>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Cultivos
              </Button>
            </div>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Endocrino
              </Button>
            </div>
          </div>
        </div>
        <div className={classes.lastColumn}>
          <div className={classes.formGroup}>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Coagulación
              </Button>
            </div>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Anticuerpos
              </Button>
            </div>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Tinciones
              </Button>
            </div>
            <div className={classes.buttonSpace}>
              <Button
                variant="outlined"
                onClick={() => {}}
                className={classes.button}>
                Tiroideo
              </Button>
            </div>
          </div>
        </div>
      </CardLayout>
    </div>
  );
};
export default LaboratoryPanel;
