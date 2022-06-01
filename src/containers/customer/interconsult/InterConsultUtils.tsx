import { useCallback, useState } from "react";
import { convertFileToBase64 } from "../../../utils/file";

const useAddAttachment = () => {
  const [localBase64, setLocalBase64] = useState<Schemas.ResultFileRequest[]>(
    [],
  );

  const uploadLocalProfessionalFile = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      const base64 = file && ((await convertFileToBase64(file)) as string);

      const existingNames = localBase64.map((a) => a.name);
      const value = existingNames.indexOf(file?.name);

      value === -1 &&
        base64 &&
        setLocalBase64([...localBase64, { base64, name: file?.name }]);
    },
    [localBase64],
  );

  const handleResetUpload = useCallback(() => {
    setLocalBase64([]);
  }, []);

  const deleteAttachmentItem = useCallback(
    (name: string) => {
      const newLocalBase64 = localBase64.filter((a) => a.name !== name);
      setLocalBase64([...newLocalBase64]);
    },
    [localBase64],
  );

  return {
    localBase64,
    uploadLocalProfessionalFile,
    handleResetUpload,
    deleteAttachmentItem,
    setLocalBase64,
  };
};

export default useAddAttachment;
