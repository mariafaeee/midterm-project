// AppContext.jsx 
import React, { createContext, useState, useEffect } from "react";
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(true);

  // new state for logout confirmation
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      const userBookings = localStorage.getItem(`bookings_${parsedUser.name}`);
      if (userBookings) {
        setBookings(JSON.parse(userBookings));
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && user?.name) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem(`bookings_${user.name}`, JSON.stringify(bookings));
    }
  }, [user, bookings, loading]);

  // helpers (parseTime, getSlotEndDateTime) ... keep as is
  const parseTime = (timeStr) => {
    const match = timeStr.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i);
    if (!match) return null;
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2] || "0", 10);
    const period = match[3].toLowerCase();
    if (period === "pm" && hours !== 12) hours += 12;
    if (period === "am" && hours === 12) hours = 0;
    return { hours, minutes };
  };

  const getSlotEndDateTime = (slotStr, rawDateStr) => {
    if (!slotStr.includes("-")) return null;
    const parts = slotStr.split("-");
    if (parts.length < 2) return null;
    const endRaw = parts[1].trim();
    const endMatch = endRaw.match(/(\d{1,2}(:\d{2})?\s*(am|pm))/i);
    if (!endMatch) return null;

    const parsedEnd = parseTime(endMatch[1]);
    if (!parsedEnd) return null;

    const [year, month, day] = rawDateStr.split("-");
    let endDate = new Date(year, month - 1, day, parsedEnd.hours, parsedEnd.minutes);

    const startMatch = slotStr.match(/(\d{1,2}(:\d{2})?\s*(am|pm))/i);
    if (startMatch) {
      const parsedStart = parseTime(startMatch[1]);
      if (parsedStart && parsedEnd.hours < parsedStart.hours) {
        endDate.setDate(endDate.getDate() + 1);
      }
    }

    return endDate;
  };

  // addBooking (unchanged)
  const addBooking = (booking) => {
    const now = new Date();
    const [year, month, day] = booking.date.split("-");
    const baseDate = new Date(year, month - 1, day);
    const slotEnd = getSlotEndDateTime(booking.time, booking.date);

    if (slotEnd) {
      if (slotEnd <= now) {
        setPopup({
          type: "error",
          message: "Booking failed: This time slot has already ended.",
        });
        return false;
      }
    } else {
      if (baseDate < new Date(now.toDateString())) {
        setPopup({
          type: "error",
          message: "Booking failed: You cannot book for a past date.",
        });
        return false;
      }
    }

    const duplicate = bookings.some(
      (b) => b.date === booking.date && b.time === booking.time
    );
    if (duplicate) {
      setPopup({
        type: "error",
        message: `Sorry, another booking already exists on ${booking.date} at ${booking.time}.`,
      });
      return false;
    }

    setBookings([...bookings, booking]);
    setPopup({
      type: "success",
      message: `Booking confirmed for ${booking.space.name} on ${booking.date} (${booking.time})`,
    });
    return true;
  };

  // --- auth functions
  const login = (userData) => {
    setUser(userData);
    const userBookings = localStorage.getItem(`bookings_${userData.name}`);
    setBookings(userBookings ? JSON.parse(userBookings) : []);
  };

  // show confirmation modal instead of direct logout
  const requestLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setUser(null);
    setBookings([]);
    localStorage.removeItem("user");
    setShowLogoutConfirm(false);
    setPopup({
      type: "success",
      message: "You have logged out successfully",
    });
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const cancelBooking = (id) =>
    setBookings(bookings.filter((b) => b.id !== id));

  return (
    <AppContext.Provider
      value={{
        user,
        bookings,
        login,
        logout: requestLogout, // 🔹 call requestLogout instead
        confirmLogout,
        cancelLogout,
        showLogoutConfirm,
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
