import React, { useCallback } from "react";
import InviteDialog from "../../../components/domains/Professional/invite/InviteDialog";
import useInviteProfessionalsMutation from "../../../modules/invite/mutation";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import STRINGS from "../../../utils/strings";

interface Props {
  visible: boolean,
  handleShow: () => void;
}
const InviteContainer = ({ handleShow, visible }: Props) => {
  const { addLastAlerts } = useAddLastAlerts();

  const onSuccess = useCallback(() => {
    addLastAlerts({
      message: STRINGS.generals.SUCCESS_INVITATION,
      severity: "success",
      name: "",
    });
    handleShow();
  }, [addLastAlerts, handleShow]);

  const { mutate, loading } = useInviteProfessionalsMutation({
    showError: true,
    onSuccess,
  });

  const handleInvitation = useCallback((values: Schemas.EmailsNameRequest) =>
    mutate(values), [mutate]);

  return <InviteDialog
    handleShow={handleShow}
    visible={visible}
    loading={loading}
    handleInvitation={handleInvitation}
  />;
};

export default InviteContainer;
