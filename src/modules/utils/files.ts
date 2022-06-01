/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRef, useCallback, useState } from "react";

// eslint-disable-next-line import/prefer-default-export
export const useUploadFile = () => {
  const [image, setImageState] = useState<string>();
  const inputFileRef = createRef<React.RefObject<HTMLInputElement>>();

  const cleanup = useCallback(() => {
    URL.revokeObjectURL(image || "");
    (inputFileRef.current as any).value = undefined;
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

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newImage = event.target?.files?.[0];
      if (newImage) {
        setImage(URL.createObjectURL(newImage));
      }
    },
    [setImage],
  );

  // inputFileRef.current && (inputFileRef.current as any).onChange = handleOnChange;

  const openSelector = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (image) {
        event.preventDefault();
        setImageState("");
      }
    },
    [image],
  );

  return { inputFileRef, image, openSelector, handleOnChange };
};
