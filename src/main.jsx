import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";  // <-- Add this line
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // optional, for dropdowns/modals

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
