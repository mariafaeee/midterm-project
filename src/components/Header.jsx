// src/components/Header.jsx
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const Header = () => {
  const { user, logout } = useContext(AppContext);
  const location = useLocation();

  const navLinkClass = (path) =>
    `relative px-2 py-1 transition 
     ${location.pathname === path ? "text-black font-semibold" : "text-gray-600"}
     hover:text-black 
     after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-black after:left-0 after:-bottom-1 
     after:transition-all after:duration-300 hover:after:w-full`;

  return (
    <header className="bg-[#F9F5F0] text-gray-800 px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
      <Link
        to="/"
        className="font-bold text-2xl tracking-wide hover:scale-105 transition-transform"
      >
        StudySpot PH
      </Link>

      <nav className="space-x-6 flex items-center">
        <Link to="/" className={navLinkClass("/")}>
          Home
        </Link>
        {user && (
          <Link
            to="/dashboard/my-bookings"
            className={navLinkClass("/dashboard/my-bookings")}
          >
            Dashboard
          </Link>
        )}
        {user ? (
          <button
            onClick={logout}
            className="ml-4 bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800 transition transform active:scale-95"
          >
            Logout ({user.name})
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-black text-white px-3 py-1 rounded-lg hover:bg-gray-800 transition transform active:scale-95"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};
