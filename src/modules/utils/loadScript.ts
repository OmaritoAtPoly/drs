/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const useLoadScript = (urls: string) => {
  const [status, setStatus] = useState(urls ? "loading" : "idle");

  useEffect(() => {
    if (!urls) {
      setStatus("idle");
      return;
    }
    let script = document.querySelector(
      `script[src="${urls}"]`,
    ) as HTMLScriptElement;

    if (script === null) {
      script = document.createElement("script");
      script.src = urls;
      script.async = true;
      script.setAttribute("data-status", "loading");
      document.body.appendChild(script);

      const setAttributeFromEvent = (event: { type: string }) => {
        script.setAttribute(
          "data-status",
          event.type === "load" ? "ready" : "error",
        );
      };
      script.addEventListener("load", setAttributeFromEvent);
      script.addEventListener("error", setAttributeFromEvent);
    } else {
      setStatus(script.getAttribute("data-status") as any);
    }

    const setStateFromEvent = (event: { type: string }) => {
      setStatus(event.type === "load" ? "ready" : "error");
    };
    script.addEventListener("load", setStateFromEvent);
    script.addEventListener("error", setStateFromEvent);

    // eslint-disable-next-line consistent-return
    return () => {
      if (script) {
        script.removeEventListener("load", setStateFromEvent);
        script.removeEventListener("error", setStateFromEvent);
      }
    };
  }, [urls]);

  // useEffect(() => {
  //   const scripts: HTMLScriptElement[] = [];

  //   urls.forEach((url) => {
  //     const script = document.createElement("script");
  //     script.src = url;
  //     script.async = true;
  //     document.body.appendChild(script);
  //     scripts.push(script);
  //   });

  //   return () => {
  //     scripts.forEach((script) => {
  //       document.body.removeChild(script);
  //     });
  //   };
  // }, [urls]);
  return status;
};

export default useLoadScript;
