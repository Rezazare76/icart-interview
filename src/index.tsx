import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";
import "atropos/css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
