import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/* theme.css pulls in Tailwind, the token bridge, and the Industry system (into
   the components layer, so utilities can override it). app.css is the thin
   residual layer for what utilities cannot express. */
import "./styles/theme.css";
import "./styles/app.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
