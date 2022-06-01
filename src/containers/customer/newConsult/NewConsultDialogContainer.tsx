import React, { useMemo } from "react";
import NewConsultDialog from "../../../components/domains/customer/newConsult/NewConsultDialog";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";

interface Props {
  open: boolean;
  handleShow: () => void;
  onBegin: (reason: string[]) => void;
}

export default function NewConsultDialogContainer({
  open,
  handleShow,
  onBegin,
}: Props) {
  const { currentProfessional } = useProfileCacheSelector();

  const lastAppointmentsReasons: {
    label: string;
    checked: boolean;
    id: number;
  }[] = useMemo(() => {
    if (!currentProfessional || !currentProfessional.lastAppointmentsReasons) {
      return [];
    }
    return currentProfessional?.lastAppointmentsReasons.map((v, i) => ({
      label: v,
      checked: false,
      id: i,
    }));
  }, [currentProfessional]);

  return (
    <NewConsultDialog
      handleShow={handleShow}
      open={open}
      onBegin={onBegin}
      lastAppointmentsReasons={lastAppointmentsReasons}
    />
  );
}
