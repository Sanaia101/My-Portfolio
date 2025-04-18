import React, { useEffect, useState } from "react";
import App from "./App";
import AppMobile from "./AppMobile";

const RootResponsiveApp: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <AppMobile /> : <App />;
};

export default RootResponsiveApp;
