import React, { useEffect, useState } from "react";
import App from "./App";
import AppMobile from "./AppMobile";

const RootResponsiveApp: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth <= 768);
    checkSize(); // initial check
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  if (isMobile === null) return null; // or show a loading screen

  return isMobile ? <AppMobile /> : <App />;
};

export default RootResponsiveApp;
