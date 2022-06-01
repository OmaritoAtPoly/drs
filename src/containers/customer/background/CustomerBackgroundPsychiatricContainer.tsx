import React, { useCallback } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import CustomerPsychiatricBackground from "../../../components/domains/customer/background/customerPsychiatric/CustomerPsychiatricBackground";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useUpdateCustomerBackgroundPsychiatricMutation } from "../../../modules/customer/background/medications/mutation";

interface Props {
  loading: boolean;
  psychiatric: Schemas.CustomerPsychiatricData | undefined;
  psychiatricOptions: string[];
}

export default function CustomerBackgroundPsychiatricContainer({
  psychiatric,
  psychiatricOptions,
  loading: loadingBackground,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id: code } = useParams() as any;

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries([
      ReactQueryKeys["current-patient-allergies-key"],
    ]);
  }, []);

  const { mutate } = useUpdateCustomerBackgroundPsychiatricMutation({
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

  const preparePsychiatricList = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (items: Schemas.CustomerPsychiatricItem[] | undefined) =>
      items?.map((item) => ({
        disorder: item.disorder,
        notes: convertStringToArray(item.notes),
      })),
    [convertStringToArray],
  );

  const prepareDataToInsert = useCallback(
    (customerPsychiatric: Schemas.CustomerPsychiatricData) => ({
      enabled: customerPsychiatric.enabled,
      items: preparePsychiatricList(customerPsychiatric.items),
    }),
    [preparePsychiatricList],
  );

  const handleOnUpdateCustomerPsychiatric = useCallback(
    (customerPsychiatric: Schemas.CustomerPsychiatricData) => {
      const data = prepareDataToInsert(customerPsychiatric);
      mutate({
        code,
        ...data,
      });
    },
    [code, mutate, prepareDataToInsert],
  );

  return (
    <CustomerPsychiatricBackground
      customerPsychiatric={psychiatric || { enabled: false, items: [] }}
      loadingBackground={loadingBackground}
      psychiatricOptions={psychiatricOptions}
      updateCustomerPsychiatric={handleOnUpdateCustomerPsychiatric}
    />
  );
}
