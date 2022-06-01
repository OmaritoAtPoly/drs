import React, { useEffect, useMemo } from "react";
import avatar from "../assert/avatar.jpeg";
import Banner from "../components/Banner";
import { useAppDataQuery } from "../modules/appData/query";
import { API_BASIC_URL } from "../utils/constants";

export default function BannerContainer() {
  const { loading, data, refetch } = useAppDataQuery({
    showError: true,
  });

  const url = useMemo(
    // eslint-disable-next-line no-confusing-arrow
    () => {
      if (loading || !data?.professionalWebBannerUrl) return "";
      const src = data.professionalWebBannerUrl;
      // eslint-disable-next-line no-nested-ternary
      return src
        ? src.slice(0, 4) === "http" || src.slice(0, 5) === "blob:"
          ? src
          : `${API_BASIC_URL}${src}`
        : avatar;
    },
    [data, loading],
  );

  useEffect(() => {
    url !== "" && refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetch]);

  return <Banner url={url} loading={loading} />;
}
