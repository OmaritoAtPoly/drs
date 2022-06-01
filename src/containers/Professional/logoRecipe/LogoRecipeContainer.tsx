/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createRef, useCallback, useState } from "react";
import { queryCache } from "react-query";
import Logo from "../../../components/domains/customer/gridPanelActions/recipe/Logo";
import { ReactQueryKeys } from "../../../modules/apiTypes";
import useProfileCacheSelector from "../../../modules/profile/cacheSelector";
import { useUpdateProfessionalLogoMutation } from "../../../modules/profile/mutation";

const LogoContainer = () => {
  const { currentProfessional } = useProfileCacheSelector();
  const [image, setImageState] = useState<string>();
  const [imagen, setImageStaten] = useState<File>();
  const inputFileRefLogo = createRef<React.RefObject<HTMLInputElement>>();

  const cleanup = () => {
    URL.revokeObjectURL(image || "");
    (inputFileRefLogo.current as any).value = undefined;
  };

  const setImage = (newImage: any) => {
    if (image) {
      cleanup();
    }
    setImageState(newImage);
  };

  const handleOnChangeLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = event.target?.files?.[0] || "";

    if (newImage) {
      setImage(URL.createObjectURL(newImage));
      setImageStaten(newImage);
    }
  };

  const handleClickLogo = (
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

  const { mutate: signMutation, loading: mutationLoading } = useUpdateProfessionalLogoMutation({
    showError: true,
    onSuccess,
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

  return (
    <Logo
      image={image || ""}
      onClick={handleClickLogo}
      onChangeImage={handleOnChangeLogo}
      ref={(inputFileRefLogo as any) as React.RefObject<HTMLInputElement>}
      handleSendDigitalLogo={handleSendDigitalSignature}
      mutationLoading={mutationLoading}
      logoUrl={currentProfessional?.logoUrl}
    />
  );
};

export default LogoContainer;
