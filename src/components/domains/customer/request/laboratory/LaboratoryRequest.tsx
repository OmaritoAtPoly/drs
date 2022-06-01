/* eslint-disable @typescript-eslint/no-unused-vars */
import { Typography } from "@material-ui/core";
import React, { useCallback, useState } from "react";
import LaboratoryRequestForm from "./LaboratoryRequestForm";
import LabRequestShowMode from "./LabRequestShowMode";

interface Props {
  addCustomerLabRequest: (labRequest: Schemas.LaboratoryRequestRequest) => void;
  handleShow: () => void;
  handleViewMode: () => void;
  initialValue: Schemas.LaboratoryRequestRequest;
  viewMode?: boolean;
  loading: boolean;
}

export default function LabRequest({
  addCustomerLabRequest,
  handleShow,
  handleViewMode,
  initialValue,
  viewMode = false,
  loading,
}: Props) {
  const [
    labRequest,
    setLabRequest,
  ] = useState<Schemas.LaboratoryRequestRequest>(initialValue);

  const handleEditMode = useCallback(() => {
    handleViewMode();
  }, [handleViewMode]);

  const handleAddCustomerLabRequest = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (labRequest: Schemas.LaboratoryRequestRequest) => {
      addCustomerLabRequest(labRequest);
      setLabRequest(labRequest);
    },
    [addCustomerLabRequest],
  );
  return viewMode ? (
    <LabRequestShowMode
      labRequest={labRequest}
      onEdit={handleEditMode}
    />
  ) : (
    <LaboratoryRequestForm
      initialValue={labRequest}
      addCustomerLabRequest={handleAddCustomerLabRequest}
      handleShow={handleShow}
      loading={loading}
    />
  );
}
