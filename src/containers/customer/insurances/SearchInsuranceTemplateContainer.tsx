import React, { useCallback } from "react";
import SearchInsuranceTemplate from "../../../components/domains/customer/insurances/SearchInsuranceTemplate";
import { useDownLoadInsuranceMutation } from "../../../modules/customer/insurances/mutation";
import { useCacheInsuranceSelector } from "../../../modules/search/cacheSelector";
import useHandlerError from "../../../modules/utils/error/handleError";
import { showFile } from "../../../utils/document";
import STRINGS from "../../../utils/strings";

interface Props {
  handleShow: () => void;
  open: boolean;
}

export default function SearchInsuranceTemplateContainer({
  handleShow,
  open,
}: Props) {
  const {
    items: insurances,
    isFetchingMore: isFetchingMoreInsurances,
    canFetchMore,
    fetchMore,
    loading: loadingInsurances,
    setFilter: setFilterInsurances,
  } = useCacheInsuranceSelector({ alwaysEnabled: true });
  const { handlerError } = useHandlerError();
  const onSuccess = useCallback((blob: Blob, { name }) => {
    // always is .pdf
    const fileName = `${name}.pdf`;
    showFile(blob, fileName, blob.type);
  }, []);

  const { mutate, loading: loadingDownload } = useDownLoadInsuranceMutation({
    showError: true,
    onSuccess,
  });

  const onDownloadTemplate = useCallback(
    (insurance: Schemas.HealthInsuranceData) => () => {
      if (insurance.hasTemplate) {
        mutate({ code: insurance.code || "", name: insurance.name || "" });
      } else {
        handlerError(STRINGS.error.DON_T_EXIST_TEMPLATE_TO_SELECTED_INSURANCE);
      }
    },
    [handlerError, mutate],
  );

  const onDebounceInsurances = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setFilterInsurances(event.target.value);
    },
    [setFilterInsurances],
  );

  const onChange = useCallback(
    (value: Schemas.HealthInsuranceData) => {
      setFilterInsurances(value && value.name ? value.name : "");
    },
    [setFilterInsurances],
  );

  return (
    <SearchInsuranceTemplate
      open={open}
      handleShow={handleShow}
      insurances={insurances || []}
      onDebounceInsurances={onDebounceInsurances}
      onChange={onChange}
      loadingInsurances={loadingInsurances || !!isFetchingMoreInsurances}
      fetchMore={fetchMore}
      hasNextPage={canFetchMore}
      loadingDownload={loadingDownload}
      onDownloadTemplate={onDownloadTemplate}
    />
  );
}
