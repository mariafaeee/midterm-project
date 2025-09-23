// src/pages/SpaceDetailPage.jsx
import React, { useContext, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import studySpaces from "../data/Spaces.json";
import { AppContext } from "../context/AppContext";

export const SpaceDetailPage = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { user, addBooking, setPopup } = useContext(AppContext);

  const space = studySpaces.find((s) => s.id.toString() === spaceId);

  const [date, setDate] = useState("");     
  const [rawDate, setRawDate] = useState(""); 
  const [slot, setSlot] = useState("");
  const dateInputRef = useRef(null);

  if (!space) return <div className="p-8">Space not found.</div>;

  const openDatePicker = () => {
    const input = dateInputRef.current;
    if (!input) return;
    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }
    input.focus();
    try { input.click(); } catch {}
  };

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
    <div className="p-8 max-w-3xl mx-auto">
      {/* Main Image */}
      <img
        src={space.main_image.startsWith("/") ? space.main_image : `/${space.main_image}`}
        alt={space.name}
        className="w-full h-64 object-cover rounded-lg shadow-md"
      />

      {/* Additional Images Gallery */}
      {space.images && space.images.length > 0 && (
        <div className="mt-4 flex gap-2 overflow-x-auto">
          {space.images.map((img, index) => (
            <img
              key={index}
              src={img.startsWith("/") ? img : `/${img}`}
              alt={`${space.name} image ${index + 1}`}
              className="w-32 h-24 object-cover rounded-md flex-shrink-0"
            />
          ))}
        </div>
      )}

      <h1 className="text-3xl font-bold mt-4">{space.name}</h1>
      <p className="text-gray-600">{space.location}</p>
      <p className="mt-4">{space.description}</p>

      {/* Booking Form */}
      <form
        onSubmit={handleBooking}
        className="mt-6 bg-white rounded-2xl shadow-lg p-6 space-y-4"
      >
        {/* Custom Date Picker */}
        <label className="block relative">
          <span className="font-semibold">Choose Date:</span>
          <input
            ref={dateInputRef}
            type="date"
            value={rawDate}
            onChange={(e) => {
              const value = e.target.value;
              setRawDate(value);
              const [year, month, day] = value.split("-");
              setDate(`${day}/${month}/${year}`);
            }}
            required
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

        {/* Time Slot */}
        <label className="block">
          <span className="font-semibold">Choose Time Slot:</span>
          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-3 mt-2 outline-none transition focus:outline-none focus:ring-0 focus:border-gray-300"
          >
            <option value="">Select...</option>
            <option value="Morning (8 AM – 12 PM)">Morning (8 AM – 12 PM)</option>
            <option value="Afternoon (1 PM – 5 PM)">Afternoon (1 PM – 5 PM)</option>
            <option value="Evening (6 PM – 10 PM)">Evening (6 PM – 10 PM)</option>
            <option value="Full Day (8 AM – 10 PM)">Full Day (8 AM – 10 PM)</option>
          </select>
        </label>

        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};
