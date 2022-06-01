/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, List, makeStyles, Theme, Typography } from "@material-ui/core";
import {
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
  FormikProps,
} from "formik";
import moment from "moment";
import React, { useCallback, useState } from "react";
import ActiveMedicationItemContainer from "../../../../containers/customer/medications/ActiveMedicationItemContainer";
import STRINGS from "../../../../utils/strings";
import PrimaryButton from "../../../buttons/PrimaryButton";
import TitleCard from "../../../cards/TitleCard";
import { ItemType } from "../../../inputs/Search/Search";
import LoadingWrapper from "../../../LoadingWrapper";
import ActiveMedicationListSkeleton from "../../../skeletons/ActiveMedicationListSkeleton";
import ActiveMedicationForm from "./ActiveMedicationForm";
import ActiveMedicationList from "./ActiveMedicationList";
import MedicationCatalogSearch from "./MedicationCatalogSearch";

const styles = makeStyles((theme: Theme) => ({
  container: {
    height: 350,
    position: "relative",
  },
}));

interface Props {
  medicationList?: Schemas.CustomerMedicationData[];
  editMode: boolean;
  loading: boolean;
  updating: boolean;
  handleOnUpdateList: (
    medicationList: Schemas.CustomerMedicationData[],
  ) => void;
  handleMode: () => void;
}

export default function ActiveMedications({
  medicationList = [],
  editMode,
  loading,
  updating,
  handleOnUpdateList,
  handleMode,
}: Props) {
  const classes = styles();

  return (
    <TitleCard
      classNameContainer={classes.container}
      title={STRINGS.background.ACTIVE_MEDICATION}
      onClick={handleMode}
      icon="add">
      {editMode ? (
        <ActiveMedicationForm
          medicationList={medicationList}
          updatingList={updating}
          handleOnUpdateList={handleOnUpdateList}
          handleMode={handleMode}
        />
      ) : (
        <LoadingWrapper loading={loading}>
          <ActiveMedicationList medicationList={medicationList} />
        </LoadingWrapper>
      )}
    </TitleCard>
  );
}
