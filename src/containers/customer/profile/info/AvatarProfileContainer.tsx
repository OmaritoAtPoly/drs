/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef, useCallback, useState } from "react";
import { queryCache } from "react-query";
import AvatarProfile from "../../../../components/domains/customer/profile/AvatarProfile";
import { ReactQueryKeys } from "../../../../modules/apiTypes";
import { usePatientCacheSelector } from "../../../../modules/customer/profile/cacheSelector";
import { useUpdateCustomerAvatarMutation } from "../../../../modules/customer/signUp/mutation";
import { useSignUpCustomerCacheSelector } from "../../../../modules/customer/signUp/signUpCustomerCacheSelector";
import { convertFileToBase64 } from "../../../../utils/file";

const AvatarProfileContainer = () => {
  const inputFileRef = createRef<React.RefObject<HTMLInputElement>>();
  const { patientLegalId, currentPatient, loading } = usePatientCacheSelector(
    {},
  );
  const [image, setImageState] = useState<string | undefined>();
  const { saveCustomerAvatarRequest } = useSignUpCustomerCacheSelector();

  const cleanup = useCallback(() => {
    URL.revokeObjectURL(image || "");
    (inputFileRef.current as any).value = undefined;
  }, [image, inputFileRef]);

  const setImage = useCallback(
    (newImage: any) => {
      image && cleanup();
      setImageState(newImage);
    },
    [cleanup, image],
  );

  const onSuccess = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/dot-notation
    queryCache.invalidateQueries(ReactQueryKeys["patients"]);
  }, []);

  const { mutate: updateCustomerAvatar } = useUpdateCustomerAvatarMutation({
    showError: true,
    onSuccess,
  });

  const handleOnUpdateAvatar = useCallback(
    async (file: File) => {
      const base64 = await convertFileToBase64(file);
      updateCustomerAvatar({
        code: patientLegalId,
        base64: base64 as string,
        name: file.name,
      });
    },
    [patientLegalId, updateCustomerAvatar],
  );

  const handleOnSaveAvatarRequestOnCache = useCallback(
    async (file: File) => {
      const base64 = await convertFileToBase64(file);
      saveCustomerAvatarRequest({
        name: file.name,
        base64: base64 as string,
      });
    },
    [saveCustomerAvatarRequest],
  );

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newImage = event.target?.files?.[0];
      if (newImage) {
        patientLegalId
          ? handleOnUpdateAvatar(newImage)
          : handleOnSaveAvatarRequestOnCache(newImage);
        setImage(URL.createObjectURL(newImage));
      }
    },
    [
      handleOnSaveAvatarRequestOnCache,
      handleOnUpdateAvatar,
      patientLegalId,
      setImage,
    ],
  );

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (image) {
      event.preventDefault();
      setImageState("");
    }
  };

  return (
    <AvatarProfile
      loading={loading}
      image={image || currentPatient?.avatarUrl}
      onClick={handleClick}
      onChangeImage={handleOnChange}
      ref={(inputFileRef as any) as React.RefObject<HTMLInputElement>}
    />
  );
};

export default AvatarProfileContainer;
