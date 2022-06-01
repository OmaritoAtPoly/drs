import React, { useCallback } from "react";
import { VaccineValue } from "./ItemNewVaccination";
import VaccinationList from "./VaccinationList";

interface Props {
  vaccines: VaccineValue[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any) => void;
  fieldName: string;
}

const VaccineCreatorList = ({ vaccines, setFieldValue, fieldName }: Props) => {
  const onPressDelete = useCallback(
    (value: string) => {
      setFieldValue(
        fieldName,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        vaccines.filter((v: VaccineValue) => v.vaccine !== value),
      );
    },
    [fieldName, setFieldValue, vaccines],
  );

  return (
    <div>
      <VaccinationList
        vaccines={vaccines}
        onDelete={onPressDelete}
        setFieldValue={setFieldValue}
      />
    </div>
  );
};
export default VaccineCreatorList;
