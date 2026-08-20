// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryProvider } from "./app/providers/QueryProvider";
import App from "./app/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <App />
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>,
);
