// src/context/AppContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      // ✅ load bookings only for this user
      const userBookings = localStorage.getItem(`bookings_${parsedUser.name}`);
      if (userBookings) {
        setBookings(JSON.parse(userBookings));
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && user) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem(`bookings_${user.name}`, JSON.stringify(bookings));
    }
  }, [user, bookings, loading]);

  const login = (userData) => {
    setUser(userData);
    // ✅ load this user's bookings
    const userBookings = localStorage.getItem(`bookings_${userData.name}`);
    setBookings(userBookings ? JSON.parse(userBookings) : []);
  };

  const logout = () => {
    setUser(null);
    setBookings([]); // clear bookings when logging out
    localStorage.removeItem("user");
  };

  const addBooking = (booking) => {
    const duplicate = bookings.some(
      (b) => b.date === booking.date && b.time === booking.time
    );
    if (duplicate) {
      setPopup({
        type: "error",
        message: `Sorry, booking can't be made. Another booking exists on ${booking.date} at ${booking.time}.`,
      });
      return false;
    }
    setBookings([...bookings, booking]);
    setPopup({
      type: "success",
      message: `Booking confirmed for ${booking.space.name} on ${booking.date} (${booking.time}) 🎉`,
    });
    return true;
  };

  const cancelBooking = (id) =>
    setBookings(bookings.filter((b) => b.id !== id));

  return (
    <AppContext.Provider
      value={{
        user,
        bookings,
        login,
        logout,
        addBooking,
        cancelBooking,
        popup,
        setPopup,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
