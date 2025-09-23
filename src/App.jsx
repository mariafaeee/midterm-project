// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { SpaceDetailPage } from "./pages/SpaceDetailPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { AppContext } from "./context/AppContext";
import { Popup } from "./components/Popup";


const App = () => {
  const { user, loading } = useContext(AppContext);

  if (loading) {
    // ✅ Show loader while restoring session
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Popup />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/space/:spaceId" element={<SpaceDetailPage />} />
        <Route
          path="/dashboard/my-bookings"
          element={user ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
