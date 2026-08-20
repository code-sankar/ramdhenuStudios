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

/* Tell the boot splash the app is up. Two frames, because render() only
   schedules the work — the first frame commits it, the second is the one the
   visitor actually sees painted. Optional-called: the splash removes itself
   after one session, so on most page views this function no longer exists. */
requestAnimationFrame(() => requestAnimationFrame(() => window.__ramdhenuReady?.()));
