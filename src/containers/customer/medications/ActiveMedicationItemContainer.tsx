import React, { useCallback } from "react";
import MedicationItem from "../../../components/domains/customer/medications/MedicationItem";
import MedicationItemEdition from "../../../components/domains/customer/medications/MedicationItemEdition";

interface Props {
  index: number;
  fieldName: string;
  editMode?: boolean;
  medication: Schemas.CustomerMedicationData;
  remove?: (index: number) => Schemas.CustomerMedicationData | undefined;
}

export default function ActiveMedicationItemContainer({
  index,
  fieldName,
  editMode,
  medication,
  remove,
}: Props) {
  const handleOnRemove = useCallback(() => {
    remove && remove(index);
  }, [index, remove]);

  return editMode ? (
    <MedicationItemEdition
      index={index}
      medication={medication}
      fieldName={fieldName}
      remove={handleOnRemove}
    />
  ) : (
    <MedicationItem index={index} medication={medication} />
  );
}
