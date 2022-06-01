/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider } from "@material-ui/core/styles";
import "moment/locale/es";
import React from "react";
import { ReactQueryConfigProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import WrapperApp from "./components/wrappers/WrapperApp";
import "./custom.css";
import { ReactQueryCacheTime, ReactQueryStaleTime } from "./modules/apiTypes";
import Routes from "./navigation/Routes";
import theme from "./styles/theme";
import { BASE_NAME_PATH } from "./utils/constants";

const disableReactDevTools = (): void => {
  const noop = (): void => undefined;
  // eslint-disable-next-line no-underscore-dangle
  // eslint-disable-next-line no-underscore-dangle
  const DEV_TOOLS = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (typeof DEV_TOOLS === "object") {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(DEV_TOOLS)) {
      DEV_TOOLS[key] = typeof value === "function" ? noop : null;
    }
  }
};
disableReactDevTools();

function App() {
  return (
    <ReactQueryConfigProvider
      config={{
        queries: {
          cacheTime: ReactQueryCacheTime.NEVER,
          staleTime: ReactQueryStaleTime.NEVER,
          retry: false,
        },
      }}>
      <ThemeProvider theme={theme}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter basename={`/${BASE_NAME_PATH}`}>
          <WrapperApp>
            <Routes />
          </WrapperApp>
        </BrowserRouter>
      </ThemeProvider>
    </ReactQueryConfigProvider>
  );
}

export default App;
