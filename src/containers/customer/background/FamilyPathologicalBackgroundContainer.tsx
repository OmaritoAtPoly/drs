import React, { useCallback } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import FamilyPathologicalBackground from "../../../components/domains/customer/background/familyPathological/FamilyPathologicalBackground";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useUpdateFamilyPathologiesMutation } from "../../../modules/customer/background/medications/mutation";

interface Props {
  loading: boolean;
  familyPathological: Schemas.CustomerFamilyPathologies | undefined;
  familyParents: string[];
}

export default function FamilyPathologicalBackgroundContainer({
  loading: loadingBackground,
  familyPathological,
  familyParents,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id: code } = useParams() as any;

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries([
      ReactQueryKeys["current-patient-allergies-key"],
    ]);
  }, []);

  const { mutate } = useUpdateFamilyPathologiesMutation({
    onSuccess,
    showError: true,
  });

  const handleOnUpdateFamilyPathology = useCallback(
    (familyPathologies: Schemas.CustomerFamilyPathologies) => {
      mutate({
        code,
        ...familyPathologies,
      });
    },
    [code, mutate],
  );

  return (
    <FamilyPathologicalBackground
      familyPathologies={
        familyPathological || { enabled: false, pathologies: [] }
      }
      familyParents={familyParents}
      updateFamilyPathology={handleOnUpdateFamilyPathology}
      loadingBackground={loadingBackground}
    />
  );
}
