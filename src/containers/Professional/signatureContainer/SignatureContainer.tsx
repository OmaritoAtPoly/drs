/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef, useCallback, useState } from "react";
import { queryCache } from "react-query";
import Signature from "../../../components/domains/customer/gridPanelActions/recipe/Signature";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import { useDigitalProfessionalSignMutation, useUpdateProfessionalMutation } from "../../../modules/profile/mutation";
import { useAddLastAlerts } from "../../../modules/utils/error/handleError";
import STRINGS from "../../../utils/strings";

const SignatureContainer = () => {
  const { currentProfessional } = useProfileCacheSelector();
  const [image, setImageState] = useState<string>();
  const [imagen, setImageStaten] = useState<File>();
  const inputFileRef = createRef<React.RefObject<HTMLInputElement>>();

  const { addLastAlerts } = useAddLastAlerts();

  const cleanup = () => {
    URL.revokeObjectURL(image || "");
    (inputFileRef.current as any).value = undefined;
  };

  const setImage = (newImage: any) => {
    if (image) {
      cleanup();
    }
    setImageState(newImage);
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = event.target?.files?.[0] || "";

    if (newImage) {
      setImage(URL.createObjectURL(newImage));
      setImageStaten(newImage);
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

  const onSuccess = useCallback(() =>
    queryCache.invalidateQueries(ReactQueryKeys["professional-me"], {
      exact: true,
    }), []);

  const { mutate: signMutation, loading: mutationLoading } = useDigitalProfessionalSignMutation({
    showError: true,
    onSuccess,
  });

  const onSuccessChangeSignatureVisibility = useCallback(() => {
    queryCache.invalidateQueries(ReactQueryKeys["professional-me"], {
      exact: true,
    });
    addLastAlerts({
      message: STRINGS.account.UPDATED_CORRECTLY,
      severity: "success",
      name: "",
    });
  }, [addLastAlerts]);

  const { mutate: mutateShowSignature, loading: enablingSignature } =
    useUpdateProfessionalMutation({
      showError: true,
      onSuccess: onSuccessChangeSignatureVisibility,
    });

  const handleSendDigitalSignature = useCallback(async () => {
    if (!imagen) return;
    const reader = new FileReader();
    reader.readAsDataURL(imagen);
    reader.onload = () => {
    const body = new FormData();

      body.append("name", imagen?.name);
      body.append("digitalSign", reader.result as any);

      signMutation({
        base64: reader.result as string,
        name: imagen?.name,
      });
    };
  }, [signMutation, imagen]);

  const handleEnableProfessionalSignature = useCallback(() => {
    currentProfessional && mutateShowSignature({
      ...currentProfessional,
      digitalSignEnabled: !currentProfessional.digitalSignEnabled,
    });
  }, [currentProfessional, mutateShowSignature]);

  return (
    <Signature
      image={image || ""}
      onClick={handleClick}
      onChangeImage={handleOnChange}
      ref={(inputFileRef as any) as React.RefObject<HTMLInputElement>}
      handleSendDigitalSignature={handleSendDigitalSignature}
      digitalSignUrl={currentProfessional?.digitalSignUrl}
      mutationLoading={mutationLoading}
      agreeToShowSignature={currentProfessional?.digitalSignEnabled}
      enablingSignature={enablingSignature}
      handleEnableProfessionalSignature={handleEnableProfessionalSignature}
    />
  );
};

export default SignatureContainer;
