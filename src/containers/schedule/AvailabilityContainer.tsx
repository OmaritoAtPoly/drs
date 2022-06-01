import React, { useMemo } from "react";
import Availability from "../../components/schedule/availability/Availability";
import useProfileCacheSelector from "../../modules/profile/cacheSelector";

export default function AvailabilityContainer() {
  const { loadingUserMe, currentProfessional } = useProfileCacheSelector();

  const healthCenters = useMemo(
    () => (loadingUserMe ? [] : currentProfessional?.healthCenters || []),
    [currentProfessional?.healthCenters, loadingUserMe],
  );
  return (
    <Availability
      healthCenters={healthCenters}
      durationTime={currentProfessional?.appointmentDurationInMinutes || 30}
    />
  );
}
