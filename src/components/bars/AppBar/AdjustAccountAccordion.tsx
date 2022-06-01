import React, { useEffect, useState } from "react";
import AssistantProfileContainer from "../../../containers/assistant/AssistantProfileContainer";
import InviteAssistantContainer from "../../../containers/assistant/InviteAssistantContainer";
import PayPlanPanelContainer from "../../../containers/plan/PayPlanPanelContainer";
import EditProfessionalContainer from "../../../containers/Professional/editProfessional/EditProfessionalContainer";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import RecipeFixerContainer from "../../../containers/Professional/recipeFixerContainer/RecipeFixerContainer";
import STRINGS from "../../../utils/strings";
import WizardAccordion from "../../accordion/WizardAccordion";
import { usePlanExpiredQuery } from "../../../modules/payment/query";

interface Props {
  handleShow: () => void;
}

export default function AdjustAccountAccordion({ handleShow }: Props) {
  const [openPanelIndex, setOpenPanelIndex] = useState<number | undefined>();
  const { isAssistant } = useProfileCacheSelector();
  const { data } = usePlanExpiredQuery();
  useEffect(() => {
    setOpenPanelIndex(data?.planExpired ? 1 : openPanelIndex);
  }, [data, openPanelIndex]);

  return (
    <WizardAccordion
      openPanelIndex={openPanelIndex}
      onChangeOpenPanelIndex={(index?: number) => {
        !data?.planExpired && setOpenPanelIndex(index);
      }}
      mode="free"
      showStepAction={false}
      panels={[
        {
          title: isAssistant()
            ? STRINGS.account.ASSISTANT_MANAGEMENT
            : STRINGS.account.ASSISTANT_LIST,
          renderContent: isAssistant() ? (
            <AssistantProfileContainer handleShow={handleShow} />
          ) : (
            <InviteAssistantContainer />
          ),
        },
        {
          title: STRINGS.payPlan.PAY_PLAN_TITLE,
          renderContent: <PayPlanPanelContainer />,
          state: isAssistant() ? "disable" : undefined,
        },
        {
          title: STRINGS.generals.RECIPES_CONFIG,
          renderContent: <RecipeFixerContainer />,
          state: isAssistant() ? "disable" : undefined,
        },
        {
          title: STRINGS.account.MY_ACCOUNT,
          renderContent: <EditProfessionalContainer />,
          state: isAssistant() ? "disable" : undefined,
        },
      ]}
    />
  );
}
