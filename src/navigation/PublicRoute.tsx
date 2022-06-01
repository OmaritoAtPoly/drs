import React, { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useUpdateTabVisible } from "../components/bars/SideBar/query";

function PublicRoute({ children, path, ...rest }: RouteProps) {
  const { updateTabVisible } = useUpdateTabVisible();

  useEffect(() => {
    updateTabVisible(false);
  }, [path, updateTabVisible]);

  return (
    <Route path={`${process.env.PUBLIC_URL}${path}`} {...rest}>
      {children}
    </Route>
  );
}

export default PublicRoute;
