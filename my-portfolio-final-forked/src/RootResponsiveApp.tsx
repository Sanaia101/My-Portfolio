import React, { useEffect, useState } from "react";
import App from "./App";
import AppMobile from "./AppMobile";

const RootResponsiveApp: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const ua = navigator.userAgent.toLowerCase();
      const isIPad = /ipad|macintosh/.test(ua) && "ontouchend" in document;
      const isIPhone = /iphone/.test(ua);
      const isAndroid = /android/.test(ua);

      // Treat anything < 1025px or iPad/iPhone/Android as mobile
      const shouldUseMobile =
        width < 1025 || isIPad || isIPhone || isAndroid;

      setIsMobile(shouldUseMobile);
    };

    checkDevice(); // run once on mount
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  if (isMobile === null) return null; // Optional loading state

  return isMobile ? <AppMobile /> : <App />;
};

export default RootResponsiveApp;
