import { useEffect } from "react";

const useScript = (urls: string[]) => {
  useEffect(() => {
    const scripts: HTMLScriptElement[] = [];
    urls.forEach((url) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = false;
      document.body.appendChild(script);
      scripts.push(script);
    });

    return () => {
      scripts.forEach((script) => {
        document.body.removeChild(script);
      });
    };
  }, [urls]);
};

export default useScript;
