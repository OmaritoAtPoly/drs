/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from "react";
import { useSpecialtyCacheSelector } from "../../../../modules/operationData/specialtyCacheSelector";
import { useSearchProfessionalMutation } from "../../../../modules/profile/mutation";
import ProfessionalInfoInterConsultPanel from "./ProfessionalInfoInterConsultPanel";

interface Props {
  targetSpecialtyCode: string;
  targetProfessionalName: string;
  targetProfessionalEmail: string;
  targetProfessionalLegalID?: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: React.FocusEvent<any>) => void;
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean,
  ) => void;
  toProfessional?: Schemas.ProfessionalData;
}

export default function ProfessionalInfoInterConsultContainer(props: Props) {
  const {
    data: specialties,
    loading: loadingSpecialties,
    handleSetFilter,
  } = useSpecialtyCacheSelector();

  const [professionalResults, setProfessionalResults] = useState<
    Schemas.ProfessionalData[]
  >([]);

  const onSuccess = useCallback(
    (data: keyof Pick<Paths.SearchProfessionals.Responses.$200, "data">) => {
      const result = data as Schemas.PageResponseProfessionalData;
      setProfessionalResults(result.items || []);
    },
    [],
  );

  const { mutate, loading } = useSearchProfessionalMutation({
    showError: true,
    onSuccess,
  });

  const handleAddProfessional = useCallback(
    (professional: Schemas.ProfessionalData) => {
      if (professional) {
        props.setFieldValue(
          "targetProfessionalName",
          `${professional.firstName} ${professional.firstFamilyName}`,
        );
        props.setFieldValue(
          "targetProfessionalEmail",
          `${professional.professionalEmail || ""}`,
        );
        props.setFieldValue(
          "targetProfessionalLegalID",
          `${professional.legalID}`,
        );
      }
    },
    [props],
  );

  const onDebounceSearch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      mutate({
        search: event.target.value,
        byDoctorName: true,
      });
    },
    [mutate],
  );

  const onSpecialtyDebounceSearch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      handleSetFilter(event.target.value);
    },
    [handleSetFilter],
  );

  const onSpecialtyChange = useCallback(
    (specialty: Schemas.SpecialtyResponse) => {
      props.setFieldValue("targetSpecialtyCode", specialty.code || "");
    },
    [props],
  );

  return (
    <ProfessionalInfoInterConsultPanel
      loadingProfessional={loading}
      searchResult={professionalResults}
      loadingSpecialties={loadingSpecialties}
      searchSpecialtyResults={specialties || []}
      handleAddProfessional={handleAddProfessional}
      onDebounceSearch={onDebounceSearch}
      onSpecialtyDebounceSearch={onSpecialtyDebounceSearch}
      handleSpecialty={onSpecialtyChange}
      {...props}
    />
  );
}
