import React, { useCallback } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import CustomerPathologicalBackground from "../../../components/domains/customer/background/customerPathological/CustomerPathologicalBackground";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useUpdateCustomerPathologiesMutation } from "../../../modules/customer/background/medications/mutation";

interface Props {
  loading: boolean;
  pathologies: Schemas.CustomerPathologies | undefined;
  pathologiesOptions: string[];
}

export default function PersonalPathologicalBackgroundContainer({
  pathologies,
  pathologiesOptions,
  loading: loadingBackground,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id: code } = useParams() as any;

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries([
      ReactQueryKeys["current-patient-allergies-key"],
    ]);
  }, []);

  const { mutate } = useUpdateCustomerPathologiesMutation({
    onSuccess,
    showError: true,
  });

  const convertStringToArray = useCallback(
    (text: string | string[] | undefined) => {
      if (Array.isArray(text)) {
        return text;
      }
      if (text !== undefined) {
        return [`${text}`];
      }
      return [];
    },
    [],
  );

  const preparePathologyList = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (pathologies: Schemas.CustomerPathologyData[] | undefined) =>
      pathologies?.map((pathology) => ({
        pathology: pathology.pathology,
        notes: convertStringToArray(pathology.notes),
      })),
    [convertStringToArray],
  );

  const prepareDataToInsert = useCallback(
    (customerPathologies: Schemas.CustomerPathologies) => ({
      enabled: customerPathologies.enabled,
      pathologies: preparePathologyList(customerPathologies.pathologies),
    }),
    [preparePathologyList],
  );

  const handleOnUpdateCustomerPathology = useCallback(
    (customerPathologies: Schemas.CustomerPathologies) => {
      const data = prepareDataToInsert(customerPathologies);
      mutate({
        code,
        ...data,
      });
    },
    [code, mutate, prepareDataToInsert],
  );

  return (
    <CustomerPathologicalBackground
      customerPathologies={pathologies || { enabled: false, pathologies: [] }}
      pathologiesOptions={pathologiesOptions}
      loadingBackground={loadingBackground}
      updateCustomerPathology={handleOnUpdateCustomerPathology}
    />
  );
}
