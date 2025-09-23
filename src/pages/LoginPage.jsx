// src/pages/LoginPage.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const LoginPage = () => {
  const [name, setName] = useState("");
  const { login, setPopup } = useContext(AppContext); // ✅ include setPopup
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    login({ name });

    // ✅ Trigger welcome popup
    setPopup({
      type: "success",
      message: `Hi ${name}, welcome to StudySpot PH 👋`,
    });

    navigate("/dashboard/my-bookings");
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded w-full px-4 py-2"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};
