// src/components/BookingForm.jsx
import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export const BookingForm = ({ space }) => {
  const navigate = useNavigate();
  const { user, addBooking, setPopup } = useContext(AppContext);

  const [date, setDate] = useState("");
  const [rawDate, setRawDate] = useState("");
  const [slot, setSlot] = useState("");
  const dateInputRef = useRef(null);

  const now = new Date();

  // --- helper: parse time string like "7pm" -> {hours, minutes}
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

  // get slot end datetime (if numeric)
  const getSlotEndDateTime = (slotStr, rawDateStr) => {
    if (!slotStr.includes("-")) return null; // not a range
    const [ , endStrRaw ] = slotStr.split("-").map((s) => s.trim());
    if (!endStrRaw) return null;

    // handle cases like "Night Owl Pass (9pm-6am)"
    const endMatch = endStrRaw.match(/(\d{1,2}(:\d{2})?\s*(am|pm))/i);
    if (!endMatch) return null;

    const parsedEnd = parseTime(endMatch[1]);
    if (!parsedEnd) return null;

    const [year, month, day] = rawDateStr.split("-");
    let endDate = new Date(year, month - 1, day, parsedEnd.hours, parsedEnd.minutes);

    // handle cross-midnight (e.g. 9pm-6am)
    const startMatch = slotStr.match(/(\d{1,2}(:\d{2})?\s*(am|pm))/i);
    if (startMatch) {
      const parsedStart = parseTime(startMatch[1]);
      if (parsedStart && parsedEnd.hours < parsedStart.hours) {
        endDate.setDate(endDate.getDate() + 1); // next day
      }
    }

    return endDate;
  };

  // open native date picker
  const openDatePicker = () => {
    const input = dateInputRef.current;
    if (!input) return;
    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }
    input.focus();
    try {
      input.click();
    } catch {}
  };

  // handle booking submission
  const handleBooking = (e) => {
    e.preventDefault();

    if (!user) {
      setPopup({
        type: "error",
        message: "You must log in first before booking a study space.",
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (!rawDate || !slot) {
      setPopup({ type: "error", message: "Please select a valid date and time." });
      return;
    }

    // validate slot
    const todayStr = now.toISOString().split("T")[0];
    const isToday = rawDate === todayStr;

    const slotEnd = getSlotEndDateTime(slot, rawDate);
    if (isToday && slotEnd && slotEnd <= now) {
      setPopup({
        type: "error",
        message: "You cannot book a time slot that has already ended.",
      });
      return;
    }

    const added = addBooking({
      id: Date.now(),
      space,
      time: slot,
      date: rawDate,
    });

    if (added) {
      setSlot("");
      setDate("");
      setRawDate("");
    }
  };

  return (
    <form
      onSubmit={handleBooking}
      className="mt-6 bg-white rounded-2xl shadow-lg p-6 space-y-4"
    >
      {/* Date Picker */}
      <label className="block relative">
        <span className="font-semibold">Choose Date:</span>
        <input
          ref={dateInputRef}
          type="date"
          value={rawDate}
          onChange={(e) => {
            const value = e.target.value;
            setRawDate(value);
            if (value) {
              const [year, month, day] = value.split("-");
              setDate(`${day}/${month}/${year}`);
            }
          }}
          required
          min={now.toISOString().split("T")[0]} // prevent selecting past days
          className="absolute opacity-0 pointer-events-none"
        />
        <div
          onClick={openDatePicker}
          className="flex items-center border rounded-md px-3 py-2 mt-2 bg-white shadow-sm cursor-pointer"
        >
          <input
            type="text"
            value={date}
            placeholder="Select date"
            readOnly
            className="w-full outline-none bg-transparent cursor-pointer"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-gray-500 hover:text-black ml-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 9h18M4.5 7.5h15a1.5 1.5 0 
                011.5 1.5v11.25a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 
                01-1.5-1.5V9a1.5 1.5 0 011.5-1.5z"
            />
          </svg>
        </div>
      </label>

      {/* Dynamic Time Slots */}
      <label className="block">
        <span className="font-semibold">Choose Time Slot:</span>
        <select
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
          required
          className="w-full border rounded-lg px-4 py-3 mt-2 outline-none transition focus:outline-none focus:ring-0 focus:border-gray-300"
        >
          <option value="">Select...</option>
          {space.time_slots.map((t, i) => {
            const todayStr = now.toISOString().split("T")[0];
            const isToday = rawDate === todayStr;

            let isPast = false;
            const slotEnd = getSlotEndDateTime(t, todayStr);

            if (isToday && slotEnd && slotEnd <= now) {
              isPast = true;
            }

            return (
              <option
                key={i}
                value={t}
                disabled={isPast}
                className={isPast ? "text-gray-400" : ""}
              >
                {t}
              </option>
            );
          })}
        </select>
      </label>

      <button
        type="submit"
        className="w-full bg-[#3A6F43] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#59AC77] transition"
      >
        Book Now
      </button>
    </form>
  );
};
