import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.jsx";        // IDO dashboard
import Landing from "./landing.jsx"; // Landing page

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* DEFAULT: Landing first */}
        <Route path="/" element={<Landing />} />
        {/* IDO app */}
        <Route path="/app" element={<App />} />
        {/* Fallback: send unknown routes to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
