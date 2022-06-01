import React, { useCallback } from "react";
import { queryCache } from "react-query";
import HealthCenterUrl from "../../../components/domains/Professional/healthCenterUrl/HealthCenterUrl";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import { useUpdateProfessionalMutation } from "../../../modules/profile/mutation";

const HealthCenterUrlContainer = () => {
  const { currentProfessional } = useProfileCacheSelector();

  const preventDefault = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries(ReactQueryKeys["professional-me"], {
      exact: true,
    });
  }, []);

  const { mutate, loading } = useUpdateProfessionalMutation({
    onSuccess,
    showError: true,
  });

  const handleUrl = useCallback((value: string) => {
    if (currentProfessional) {
      mutate({
        ...currentProfessional,
        url: value,
      });
    }
  }, [currentProfessional, mutate]);

  return (
    <div>
      <HealthCenterUrl
        loading={loading}
        handleUrl={handleUrl}
        preventDefault={preventDefault}
      />
    </div>
  );
};

export default HealthCenterUrlContainer;
