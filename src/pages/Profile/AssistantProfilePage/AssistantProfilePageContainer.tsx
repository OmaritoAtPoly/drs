import React, { useEffect } from "react";
import { queryCache } from "react-query";
import { useUpdateTabVisible } from "../../../components/bars/SideBar/query";
import AssistantProfilePage from "./AssistantProfilePage";

const AssistantProfilePageContainer = () => {
  const { updateTabVisible } = useUpdateTabVisible();
  useEffect(() => {
    localStorage.clear();
    updateTabVisible(false);
    queryCache.clear();
  }, [updateTabVisible]);
  return <AssistantProfilePage />;
};

export default AssistantProfilePageContainer;
