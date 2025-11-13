import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LaunchTokenPage from "../pages/LaunchTokenPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/launch-token" element={<LaunchTokenPage />} />
      </Routes>
    </BrowserRouter>
  );
}

