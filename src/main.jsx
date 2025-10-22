import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { VideosProvider } from "./context/VideosContext";
import { ToastProvider } from "./context/ToastContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ToastProvider>
        <AuthProvider>
          <VideosProvider>
            <App />
          </VideosProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  </React.StrictMode>
);
