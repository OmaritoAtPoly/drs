import React from "react";
import Background from "../../../components/domains/customer/background/Background";
import { useBackgroundPatientCacheSelector } from "../../../modules/customer/background/cacheSelector";
import { useFetchPatientBackgroundDataQuery } from "../../../modules/customer/background/query";
import { defaultBackgroundData } from "../../../utils/defaultData";

export default function BackgroundContainer() {
  const { customerBackground, loading } = useBackgroundPatientCacheSelector();
  const {
    loading: loadingBackgroundData,
    data,
  } = useFetchPatientBackgroundDataQuery({ showError: true });
  return (
    <Background
      customerBackground={customerBackground}
      customerBackgroundData={data || defaultBackgroundData}
      loading={loading || loadingBackgroundData}
    />
  );
}
