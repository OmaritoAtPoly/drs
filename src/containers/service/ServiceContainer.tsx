import React, { useCallback, useState } from "react";
import Service from "../../components/domains/services/Service";
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useEditServiceMutation,
} from "../../modules/service/mutation";
import { useServiceCacheSelector } from "../../modules/service/serviceCacheSelector";
import { useAddLastAlerts } from "../../modules/utils/error/handleError";
import { defaultServiceRequest } from "../../utils/defaultData";
import STRINGS from "../../utils/strings";

export default function ServiceContainer() {
  const [open, setOpen] = useState<boolean>(false);
  const { addLastAlerts } = useAddLastAlerts();
  const [
    serviceRequest,
    setServiceRequest,
  ] = useState<Schemas.ProfessionalProductRequest>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editMode, setEditMode] = useState<boolean>(false);
  const {
    loading,
    activeFilter,
    taxPercent,
    invalidateQuery,
    setActiveFilter,
    setTaxPercent,
    handleOnFilterChange,
    canFetchMore,
    fetchMore,
    isFetchingMore,
    items,
  } = useServiceCacheSelector();

  const handleOnOpenServiceDialog = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const handleOnSuccess = useCallback(() => {
    editMode && setEditMode(false);
    addLastAlerts({
      name: "",
      message: STRINGS.service.SUCCESS,
      severity: "success",
    });
    editMode && setEditMode(false);
    open && handleOnOpenServiceDialog();
    invalidateQuery();
  }, [
    addLastAlerts,
    editMode,
    handleOnOpenServiceDialog,
    invalidateQuery,
    open,
  ]);

  const handleOnDeleteSuccess = useCallback(() => {
    addLastAlerts({
      name: "",
      message: STRINGS.service.DELETE_SUCCESS,
      severity: "success",
    });
    invalidateQuery();
  }, [addLastAlerts, invalidateQuery]);

  const {
    loading: creatingService,
    mutate: createNewServiceMutation,
  } = useCreateServiceMutation({
    showError: true,
    onSuccess: handleOnSuccess,
  });

  const {
    loading: editingService,
    mutate: editServiceMutation,
  } = useEditServiceMutation({
    showError: true,
    onSuccess: handleOnSuccess,
  });

  const { mutate: deleteServiceMutation } = useDeleteServiceMutation({
    showError: true,
    onSuccess: handleOnDeleteSuccess,
  });

  const handleOnAddService = useCallback(
    (request: Schemas.ProfessionalProductRequest) => {
      if (editMode) {
        editServiceMutation({
          ...request,
          code: request.code || "",
          basePrice: parseFloat(`${request.basePrice}` || "0"),
        });
      } else {
        createNewServiceMutation({
          ...request,
          basePrice: parseFloat(`${request.basePrice}` || "0"),
        });
      }
    },
    [createNewServiceMutation, editMode, editServiceMutation],
  );

  const handleOnActiveStatusChange = useCallback(
    (value: boolean) => {
      setActiveFilter(value);
    },
    [setActiveFilter],
  );
  const handleOnTaxChange = useCallback(
    (value: string) => {
      setTaxPercent(parseFloat(value));
    },
    [setTaxPercent],
  );

  const handleOnEdit = useCallback(
    (service: Schemas.ProfessionalProductData, active?: boolean) => {
      if (active !== undefined) {
        editServiceMutation({
          basePrice: service.basePrice,
          code: service.code || "",
          description: service.description,
          enabled: active,
          name: service.name,
          taxPercent: service.taxPercent,
        });
      } else {
        setServiceRequest({
          basePrice: service.basePrice,
          code: service.code,
          description: service.description,
          enabled: service.enabled,
          name: service.name,
          taxPercent: service.taxPercent,
        });
        setEditMode(true);
        setOpen(!open);
      }
    },
    [editServiceMutation, open],
  );

  const handleOnDelete = useCallback(
    (service: Schemas.ProfessionalProductData) => {
      deleteServiceMutation({ code: service.code || "" });
    },
    [deleteServiceMutation],
  );

  return (
    <Service
      creatingOrEditingService={creatingService || editingService}
      open={open}
      hasNextPage={!!canFetchMore}
      loadingServices={loading || !!isFetchingMore}
      services={items}
      initialValues={serviceRequest || defaultServiceRequest}
      active={activeFilter}
      taxPercent={taxPercent.toString()}
      handleOnOpenServiceDialog={handleOnOpenServiceDialog}
      handleOnAddService={handleOnAddService}
      handleOnActiveStatusChange={handleOnActiveStatusChange}
      handleOnTaxChange={handleOnTaxChange}
      fetchMore={fetchMore}
      handleOnEdit={handleOnEdit}
      handleOnDelete={handleOnDelete}
      handleOnFilterChange={handleOnFilterChange}
    />
  );
}
