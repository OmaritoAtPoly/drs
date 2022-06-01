import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { usePatientCacheSelector } from "../../../../../modules/customer/profile/cacheSelector";
import theme from "../../../../../styles/theme";
import STRINGS from "../../../../../utils/strings";
import { referAllergyText } from "../../../../../utils/user";
import BadgedButton from "../../../../buttons/BadgedButton";
import BackgroundRowSkeleton from "../../../../skeletons/BackgroundRowSkeleton";
import NotReferPanel from "../NotReferPanel";
import AllergiesForm from "./AllergiesForm";
import OtherAllergies from "./OtherAllergies";
import PillsAllergies from "./PillsAllergies";

const useStyles = makeStyles({
  container: {
    padding: theme.spacing(3),
  },
  content: {
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(1),
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 800,
  },
  allergies: {
    color: "red",
    fontWeight: "bold",
  },
  allergiesWrapper: {
    display: "flex",
  },
  withButton: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  withOutButton: {
    display: "flex",
    flexDirection: "column",
    paddingInline: "20px",
    marginTop: "20px",
  },
  noAllergiesLabel: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
    marginRight: "30px",
  },
  activityIndicator: {
    display: "flex",
    justifyContent: "center",
  },
  genderDistinctionStyle: {
    display: "flex",
    justifyContent: "center",
    paddingBlock: theme.spacing(2),
  },
  noReferContainer: {
    display: "flex",
    flexDirection: "column",
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
});

interface Props {
  pillAllergies?: Schemas.CustomerAllergyData[];
  otherAllergies?: string[];
  handleOpenForm?: () => void;
  openForm: boolean;
  noAllergies: string;
  handleNewAllergies?: (value: {
    enabled: string;
    medicine: Schemas.CustomerAllergyData[];
    other: string;
  }) => void;
  loading?: boolean;
  loadingMutation?: boolean;
}

const Allergies = ({
  handleOpenForm = () => {},
  otherAllergies = [],
  pillAllergies = [],
  openForm,
  noAllergies,
  handleNewAllergies = () => {},
  loading = false,
  loadingMutation = false,
}: Props) => {
  const classes = useStyles();
  const { currentPatient } = usePatientCacheSelector({});

  return loading ? (
    <div className={classes.container}>
      <Typography className={classes.title}>
        {STRINGS.allergies.ALLERGIES}
      </Typography>
      <BackgroundRowSkeleton />
    </div>
  ) : (
    <div>
      {openForm ? (
        <div>
          <div className={classes.withOutButton} id="with-out-button">
            <Typography className={classes.allergies}>
              {STRINGS.allergies.ALLERGIES}
            </Typography>
            <AllergiesForm
              loading={loadingMutation}
              handleOpenForm={handleOpenForm}
              noAllergies={noAllergies}
              pillAllergies={pillAllergies}
              handleNewAllergies={handleNewAllergies}
              otherAllergies={otherAllergies}
            />
          </div>
        </div>
      ) : (
        <div id="allergiesTittle" className={classes.content}>
          <div className={classes.withButton}>
            <Typography className={classes.allergies}>
              {STRINGS.allergies.ALLERGIES}
            </Typography>
            <BadgedButton
              onClick={handleOpenForm}
              iconName={
                (pillAllergies && pillAllergies.length) ||
                (otherAllergies && otherAllergies.length)
                  ? "edit"
                  : "add"
              }
            />
          </div>
          {(pillAllergies.length === 0 &&
          otherAllergies.length === 0 &&
          noAllergies === "FALSE") ? (
            <div className={classes.noReferContainer}>
              <NotReferPanel label={referAllergyText(currentPatient)} />
            </div>
          ) : (
            <div id="allergiesWrapper" className={classes.allergiesWrapper}>
              <PillsAllergies pillAllergies={pillAllergies} />
              <OtherAllergies otherAllergies={otherAllergies} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Allergies;
