import React from "react";
import AllergiesContainer from "../../../../containers/customer/background/AllergiesContainer";
import CustomerBackgroundHabitsContainer from "../../../../containers/customer/background/CustomerBackgroundHabitsContainer";
import CustomerBackgroundPsychiatricContainer from "../../../../containers/customer/background/CustomerBackgroundPsychiatricContainer";
import CustomerGynecologyBackgroundContainer from "../../../../containers/customer/background/CustomerGynecologyBackgroundContainer";
import FamilyPathologicalBackgroundContainer from "../../../../containers/customer/background/FamilyPathologicalBackgroundContainer";
import PersonalPathologicalBackgroundContainer from "../../../../containers/customer/background/PersonalPathologicalBackgroundContainer";
import SurgicalBackgroundContainer from "../../../../containers/customer/background/SurgicalBackgroundContainer";
import { usePatientCacheSelector } from "../../../../modules/customer/profile/cacheSelector";
import STRINGS from "../../../../utils/strings";
import TitleCard from "../../../cards/TitleCard";

interface Props {
  customerBackground: Schemas.CustomerBackground | undefined;
  customerBackgroundData: Schemas.CustomerBackgroundData;
  loading: boolean;
}

export default function Background({
  customerBackground,
  customerBackgroundData,
  loading,
}: Props) {
  const { currentPatient } = usePatientCacheSelector({});
  return (
    <TitleCard title={STRINGS.background.BACKGROUND} onClick={() => {}}>
      <AllergiesContainer
        allergies={customerBackground?.allergies}
        loading={loading}
      />
      <FamilyPathologicalBackgroundContainer
        familyPathological={customerBackground?.familyPathologies}
        familyParents={customerBackgroundData.backgroundFamilyPathologies || []}
        loading={loading}
      />
      <PersonalPathologicalBackgroundContainer
        loading={loading}
        pathologies={customerBackground?.pathologies}
        pathologiesOptions={
          customerBackgroundData.backgroundPersonalPathologies || []
        }
      />
      <SurgicalBackgroundContainer
        loading={loading}
        surgical={customerBackground?.surgical}
      />
      <CustomerBackgroundHabitsContainer
        loading={loading}
        habits={customerBackground?.habits}
        habitOptions={customerBackgroundData.customerHabits || []}
      />
      <CustomerBackgroundPsychiatricContainer
        loading={loading}
        psychiatric={customerBackground?.psychiatric}
        psychiatricOptions={customerBackgroundData.backgroundPsychiatry || []}
      />
      {currentPatient?.gender === "FEMALE" && (
        <CustomerGynecologyBackgroundContainer
          loading={loading}
          gynecology={customerBackground?.gynecology}
        />
      )}
    </TitleCard>
  );
}
