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
  const { user, loading, showLogoutConfirm, confirmLogout, cancelLogout } =
    useContext(AppContext);

  if (loading) {
    // Show loader while restoring session
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

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[350px] text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Logout?
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
              >
                Confirm
              </button>
              <button
                onClick={cancelLogout}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

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
