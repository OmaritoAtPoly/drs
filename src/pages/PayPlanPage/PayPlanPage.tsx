import React, { useCallback, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ActivatePayPlanDialog from "../../components/domains/plan/ActivatePayPlanDialog";
import WrapperPage from "../../components/wrappers/WrapperPage";

export default function PayPlanPage() {
  const { code } = useParams<{ code: string }>();
  const { goBack } = useHistory();
  const [activatePayPlanDialog, showActivatePayPlanDialog] = useState<boolean>(
    true,
  );

  const handleShowActivatePayPlanDialog = useCallback(() => {
    showActivatePayPlanDialog(!activatePayPlanDialog);
    goBack();
  }, [activatePayPlanDialog, goBack]);

  return (
    <WrapperPage>
      <ActivatePayPlanDialog
        open={activatePayPlanDialog}
        planCode={code}
        handleShow={handleShowActivatePayPlanDialog}
      />
    </WrapperPage>
  );
}
