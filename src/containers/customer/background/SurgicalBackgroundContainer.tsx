import React, { useCallback, useState } from "react";
import { queryCache } from "react-query";
import { useParams } from "react-router-dom";
import CustomerSurgicalBackground from "../../../components/domains/customer/background/customerSurgical/CustomerSurgicalBackground";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import { useUpdateCustomerSurgicalMutation } from "../../../modules/customer/background/medications/mutation";

interface Props {
  loading: boolean;
  surgical: Schemas.CustomerSurgicalData | undefined;
}

export default function SurgicalBackgroundContainer({
  surgical,
  loading: loadingBackground,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id: code } = useParams() as any;
  const [mode, setMode] = useState<boolean>(false);

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries([
      ReactQueryKeys["current-patient-allergies-key"],
    ]);
    setMode(!mode);
  }, [mode]);

  const {
    mutate,
    loading: updatingSurgical,
  } = useUpdateCustomerSurgicalMutation({
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

  const prepareSurgicalList = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (surgeries?: Schemas.CustomerSurgicalItem[]) =>
      surgeries?.map((surgery) => ({
        surgical: surgery.surgical,
        dateTime: { ...surgery.dateTime, timeHour: 0, timeMinute: 0 },
        notes: convertStringToArray(surgery.notes),
      })),
    [convertStringToArray],
  );

  const prepareDataToInsert = useCallback(
    (customerSurgical: Schemas.CustomerSurgicalData) => ({
      enabled: customerSurgical.enabled,
      items: prepareSurgicalList(customerSurgical.items),
    }),
    [prepareSurgicalList],
  );

  const handleOnUpdateCustomerSurgical = useCallback(
    (customerSurgical: Schemas.CustomerSurgicalData) => {
      mutate({
        code,
        ...prepareDataToInsert(customerSurgical),
      });
    },
    [code, mutate, prepareDataToInsert],
  );

  return (
    <CustomerSurgicalBackground
      customerSurgical={surgical || { enabled: false, items: [] }}
      loadingBackground={loadingBackground}
      updatingSurgical={updatingSurgical}
      mode={mode}
      setMode={setMode}
      updateCustomerSurgical={handleOnUpdateCustomerSurgical}
    />
  );
}
