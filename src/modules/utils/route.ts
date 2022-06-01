/* eslint-disable import/prefer-default-export */
import { useLocation } from "react-router-dom";
import { DEFAULT_PAGE_SIZE } from "../../utils/constants";
import useProfileCacheSelector from "../profile/cacheSelector";

export const useSearch = () => {
  const { currentProfessional } = useProfileCacheSelector();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const pageSize = (params.get("pageSize") as string) || `${DEFAULT_PAGE_SIZE}`;
  const page = (params.get("page") as string) || "0";
  const searchParams = params.get("search");
  const filter = params.get("filter") || "";
  const city = params.get("city") || "";
  const gender = params.get("gender") || "";
  const year = params.get("year") || "";
  const insurance = params.get("insurance") || "";
  const edit = params.get("edit") || false;
  const requestType = params.get("requestType") || "";
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const seen = params.get("seen") || false;

  const firstNameAssistant = currentProfessional?.assistantName || "";
  const emailAssistant = currentProfessional?.assistantEmail || "";

  return {
    // eslint-disable-next-line radix
    pageSize: parseInt(pageSize),
    // eslint-disable-next-line radix
    page: parseInt(page),
    search: searchParams || undefined,
    filter,
    city,
    gender,
    // eslint-disable-next-line radix
    year: parseInt(year),
    insurance,
    firstNameAssistant,
    emailAssistant,
    edit,
    requestType,
    from,
    to,
    seen: !!seen,
  };
};
