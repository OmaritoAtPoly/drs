/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useCallback, useMemo } from "react";
import { usePatientCacheSelector } from "../../../../../modules/customer/profile/cacheSelector";
import getNoReferText from "../../../../../utils/customerBackground";
import STRINGS from "../../../../../utils/strings";
import BadgedButton from "../../../../buttons/BadgedButton";
import BackgroundRowSkeleton from "../../../../skeletons/BackgroundRowSkeleton";
import NotReferPanel from "../NotReferPanel";
import CustomerSurgicalBackgroundList from "./CustomerSurgicalBackgroundList";
import CustomerSurgicalForm from "./CustomerSurgicalForm";

const styles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  headSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: 800,
  },
  saveButton: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  content: {
    display: "flex",
    flexWrap: "wrap",
  },
  item: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    minWidth: theme.spacing(29),
    marginBottom: theme.spacing(2),
  },
  spacerLoading: {
    marginTop: 10,
  },
}));

interface Props {
  customerSurgical: Schemas.CustomerSurgicalData;
  loadingBackground: boolean;
  updatingSurgical: boolean;
  mode: boolean;
  setMode: (mode: boolean) => void;
  updateCustomerSurgical: (
    customerSurgical: Schemas.CustomerSurgicalData,
  ) => void;
}

export default function CustomerSurgicalBackground({
  customerSurgical,
  loadingBackground,
  updatingSurgical,
  mode,
  setMode,
  updateCustomerSurgical,
}: Props) {
  const classes = styles();
  const { currentPatient } = usePatientCacheSelector({});

  const referSurgicalText = useMemo(
    () => getNoReferText(currentPatient?.gender || "", "SURGICAL"),
    [currentPatient?.gender],
  );

  const handleMode = useCallback(() => {
    setMode(!mode);
  }, [mode, setMode]);

  return loadingBackground ? (
    <div className={classes.container}>
      <Typography className={classes.title}>
        {STRINGS.background.SURGICAL_BACKGROUND}
      </Typography>
      <BackgroundRowSkeleton />
    </div>
  ) : (
    <div className={classes.container}>
      {mode ? (
        <CustomerSurgicalForm
          mode={mode}
          customerSurgical={JSON.parse(JSON.stringify(customerSurgical))}
          referSurgicalText={referSurgicalText}
          handleMode={handleMode}
          handleUpdateSurgical={updateCustomerSurgical}
          updatingSurgical={updatingSurgical}
        />
      ) : (
        <>
          <div className={classes.headSection}>
            <Typography className={classes.title}>
              {STRINGS.background.SURGICAL_BACKGROUND}
            </Typography>

            <BadgedButton
              onClick={handleMode}
              iconName={customerSurgical.items?.length === 0 ? "add" : "edit"}
            />
          </div>
          {customerSurgical.enabled ? (
            <NotReferPanel label={referSurgicalText} />
          ) : (
            <CustomerSurgicalBackgroundList
              surgicalItems={customerSurgical.items || []}
            />
          )}
        </>
      )}
    </div>
  );
}
