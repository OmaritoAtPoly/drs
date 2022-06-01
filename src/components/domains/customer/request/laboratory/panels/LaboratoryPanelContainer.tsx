import React from "react";
import { useCustomerLabCategoryQuery } from "../../../../../../modules/customer/request/query";
import LaboratoryPanel from "./LaboratoryPanel";

interface Props {
  handleAddRequestItemFromModal: (
    categories: Schemas.CategoryExamData[],
  ) => void;
}

export default function LaboratoryPanelContainer({
  handleAddRequestItemFromModal,
}: Props) {
  const { data, loading } = useCustomerLabCategoryQuery({
    showError: true,
    search: "",
  });
  return (
    <LaboratoryPanel
      loading={loading}
      panels={data || []}
      handleAddRequestItemFromModal={handleAddRequestItemFromModal}
    />
  );
}
