import React, { useCallback } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import GynecologyBackground from "../../../components/domains/customer/background/customerGynecology/GynecologyBackground";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useUpdateCustomerBackgroundGynecologyMutation } from "../../../modules/customer/background/medications/mutation";
import { defaultGynecologyObject } from "../../../utils/defaultData";

interface Props {
  loading: boolean;
  gynecology: Schemas.CustomerGynecologyData | undefined;
}

export default function CustomerGynecologyBackgroundContainer({
  gynecology,
  loading: loadingBackground,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id: code } = useParams() as any;

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries([
      ReactQueryKeys["current-patient-allergies-key"],
    ]);
  }, []);

  const { mutate } = useUpdateCustomerBackgroundGynecologyMutation({
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

  const prepareDataToInsert = useCallback(
    (
      gynecologyData: Schemas.CustomerGynecologyData,
    ): Schemas.CustomerGynecologyData => ({
      ...gynecologyData,
      ets: convertStringToArray(gynecologyData.ets),
    }),
    [convertStringToArray],
  );

  const handleOnUpdateCustomerGynecology = useCallback(
    (gynecologyData: Schemas.CustomerGynecologyData) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data = prepareDataToInsert(gynecologyData);
      mutate({
        code,
        ...data,
      });
    },
    [prepareDataToInsert, mutate, code],
  );

  return (
    <GynecologyBackground
      loadingBackground={loadingBackground}
      gynecology={gynecology || defaultGynecologyObject}
      emptyGynecologyData={!gynecology}
      handleOnSubmit={handleOnUpdateCustomerGynecology}
    />
  );
}
