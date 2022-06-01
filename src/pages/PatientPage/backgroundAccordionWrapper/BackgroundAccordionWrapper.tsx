import React, { useState } from "react";
import WizardAccordion from "../../../components/accordion/WizardAccordion";
import NutritionContainer from "../../../containers/customer/nutritition/NutritionContainer";
import VaccinationSchemaContainer from "../../../containers/customer/vaccinationSchema/VaccinationSchemaContainer";
import STRINGS from "../../../utils/strings";

export default function BackgroundAccordionWrapper() {
  const [openPanelIndex, setOpenPanelIndex] = useState<number | undefined>();

  return (
    <WizardAccordion
      openPanelIndex={openPanelIndex}
      onChangeOpenPanelIndex={(index?: number) => {
        setOpenPanelIndex(index);
      }}
      mode="free"
      showStepAction={false}
      panels={[
        {
          title: STRINGS.vaccinationScheme.VACCINATION_SCHEMA,
          renderContent: <VaccinationSchemaContainer />,
        },
        {
          title: STRINGS.background.NUTRITION_BACKGROUND,
          renderContent: <NutritionContainer />,
        },
      ]}
    />
  );
}
