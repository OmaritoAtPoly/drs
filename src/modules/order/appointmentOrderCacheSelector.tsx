import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useAppointmentOrderQuery } from "./query";

// eslint-disable-next-line import/prefer-default-export
export const useAppointmentOrderCacheSelector = () => {
  const { appointmentId } = useParams<{ appointmentId: string }>();

  const { loading, data } = useAppointmentOrderQuery({
    showError: true,
    code: appointmentId,
  });

  const products = useMemo<Schemas.AppointmentOrderProductData[]>(
    () => (!loading && data && data.products ? data.products : []),
    [data, loading],
  );

  const discount = useMemo(
    () => (!loading && data && data.discount ? data.discount : 0),
    [data, loading],
  );

  const subtotal = useMemo(
    () => (!loading && data && data.subtotal ? data.subtotal : 0),
    [data, loading],
  );

  const total = useMemo(
    () => (!loading && data && data.total ? data.total : 0),
    [data, loading],
  );

  return { loading, data, discount, subtotal, total, products };
};
