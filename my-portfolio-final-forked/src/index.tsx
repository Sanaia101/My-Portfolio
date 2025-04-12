import React from "react";
import ReactDOM from "react-dom/client";
import RootResponsiveApp from "./RootResponsiveApp";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<RootResponsiveApp />);

root.render(
  <React.StrictMode>
    <RootResponsiveApp />
  </React.StrictMode>
);
