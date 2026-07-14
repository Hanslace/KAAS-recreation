import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@fontsource/urbanist/400.css";
import "@fontsource/urbanist/500.css";
import "@fontsource/urbanist/600.css";
import "@fontsource/urbanist/700.css";
import App from "./App";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary";


// Add this helper snippet directly at the top level of your src/main.jsx file
window.addEventListener('unhandledrejection', (event) => {
  console.error('🌐 Silent Async API Crash Detected:', event.reason);
  // Optional: Trigger a browser alert during migration to instantly notice it
  alert(`Async Error: ${event.reason?.message || event.reason}`);
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);