/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef, useCallback, useEffect, useState } from "react";
import { queryCache } from "react-query";
import { useHistory } from "react-router-dom";
import EditPublicProfile from "../../../components/domains/Professional/EditProfessionalForm/editPublicProfile/EditPublicProfile";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import useSignUpCacheSelector from "../../../modules/auth/signUp/cacheSelector";
import { useSpecialtyCacheSelector } from "../../../modules/operationData/specialtyCacheSelector";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import { useUpdateProfessionalMutation } from "../../../modules/profile/mutation";
import useUpdateProfessionalAvatarMutation from "../../../modules/profile/publicProfile/mutation";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import { defaultProfessionalData } from "../../../utils/defaultData";
import STRINGS from "../../../utils/strings";

const EditPublicProfileContainer = () => {
  const { currentProfessional } = useProfileCacheSelector();
  const { addLastAlerts } = useAddLastAlerts();

  const {
    languagesData,
    pureInsurances,
    contactPerson,
  } = useSignUpCacheSelector();
  const inputFileRef = createRef<React.RefObject<HTMLInputElement>>();
  const [image, setImageState] = useState<string>();
  const [file, setFile] = useState<File>();

  const { goBack } = useHistory();

  const onSuccess = useCallback(() => {
    queryCache.invalidateQueries([ReactQueryKeys["professional-me"]], {
      exact: true,
      refetchActive: true,
      refetchInactive: true,
    });
    addLastAlerts({
      message: STRINGS.account.SUCCESS_PUBLIC_PROFILE_UPDATED,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const { mutate, loading: loadingMutation } = useUpdateProfessionalMutation({
    showError: true,
    onSuccess,
  });

  const healthCentersCleaner = useCallback(
    (value?: Schemas.ProfessionalHealthCenterRequest[]) =>
      value?.filter((a) => a.name !== ""),
    [],
  );

  const cleaner = useCallback(
    (value?: string[]) => value?.filter((a) => a !== ""),
    [],
  );

  const prepareData = useCallback(
    (value: Schemas.ProfessionalRequest) => {
      const newHealthCenter = healthCentersCleaner(value.healthCenters);
      const newSpecialties = cleaner(value.specialties);
      const newLanguages = cleaner(value.languages) || [];
      const newInsurances = cleaner(value.insurances);
      const newCurriculum = cleaner(value.curriculum);

      const languages = newLanguages?.map(
        (l) => languagesData?.find((d) => d.label === l)?.value || l,
      );

      const insurances = newInsurances?.map(
        (i) => pureInsurances?.find((d) => d.name === i)?.code || i,
      );

      const finalData = {
        ...value,
        healthCenters: newHealthCenter,
        specialties: newSpecialties,
        languages: cleaner(languages),
        insurances: cleaner(insurances),
        curriculum: newCurriculum,
      };
      return finalData;
    },
    [healthCentersCleaner, cleaner, languagesData, pureInsurances],
  );

  const {
    data: specialties,
    loading: loadingSpecialties,
    setProfession,
    handleSetFilter,
  } = useSpecialtyCacheSelector();

  const onSpecialtyDebounceSearch = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      handleSetFilter(event.target.value);
    },
    [handleSetFilter],
  );

  useEffect(() => {
    if (currentProfessional && currentProfessional.profession) {
      setProfession(currentProfessional.profession);
    }
  }, [currentProfessional, setProfession]);

  const handleSubmitForm = useCallback(
    (value: Schemas.ProfessionalRequest) => {
      const result = prepareData(value);
      mutate(result);
    },
    [mutate, prepareData],
  );

  const cleanup = useCallback(() => {
    URL.revokeObjectURL(image || "");
    if (inputFileRef && inputFileRef.current) {
      (inputFileRef.current as any).value = undefined;
    }
  }, [image, inputFileRef]);

  const setImage = useCallback(
    (newImage: any) => {
      if (image) {
        cleanup();
      }
      setImageState(newImage);
    },
    [cleanup, image],
  );

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = event.target?.files?.[0] || "";

    if (newImage) {
      setImage(URL.createObjectURL(newImage));
      setFile(newImage);
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (image) {
      event.preventDefault();
      setImageState("");
    }
  };

  const onAvatarUpdated = useCallback(() => {
    queryCache.invalidateQueries(ReactQueryKeys["professional-me"], {
      exact: true,
    });
    addLastAlerts({
      message: STRINGS.account.SUCCESS_PUBLIC_PROFILE_UPDATED,
      severity: "success",
      name: "",
    });
    setImage("");
    setFile(undefined);
  }, [addLastAlerts, setImage]);

  const {
    mutate: updateAvatarMutation,
    loading: updatingAvatar,
  } = useUpdateProfessionalAvatarMutation({
    showError: true,
    onSuccess: onAvatarUpdated,
  });

  const handleUpdateProfessionalAvatar = useCallback(async () => {
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const body = new FormData();

      body.append("name", file?.name);
      body.append("avatar", reader.result as any);

      updateAvatarMutation({
        base64: reader.result as string,
        name: file?.name,
      });
    };
  }, [updateAvatarMutation, file]);

  const handleGoBack = useCallback(() => goBack(), [goBack]);

  return (
    <EditPublicProfile
      contactPerson={contactPerson || []}
      pureInsurances={pureInsurances || []}
      languages={languagesData || []}
      handleSubmitForm={handleSubmitForm}
      loading={loadingMutation}
      professional={currentProfessional || defaultProfessionalData}
      onSpecialtyDebounceSearch={onSpecialtyDebounceSearch}
      specialties={specialties || []}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={(inputFileRef as any) as React.RefObject<HTMLInputElement>}
      onClick={handleClick}
      onChangeImage={handleOnChange}
      image={image || ""}
      file={file}
      handleUpdateProfessionalAvatar={handleUpdateProfessionalAvatar}
      loadingSpecialties={loadingSpecialties}
      updatingAvatar={updatingAvatar}
      handleGoBack={handleGoBack}
    />
  );
};
export default EditPublicProfileContainer;
