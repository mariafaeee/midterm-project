// src/pages/DashboardPage.jsx
import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export const DashboardPage = () => {
  const { bookings, cancelBooking } = useContext(AppContext);
  const [confirmId, setConfirmId] = useState(null);

  return (
    <div className="bg-gray-50 min-h-screen px-8 md:px-20 py-16">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-10">
        My Bookings
      </h1>

      {/* If no bookings */}
      {bookings.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow text-center">
          <p className="text-gray-600 text-lg">No bookings yet.</p>
          <p className="text-gray-400 text-sm mt-2">
            Start exploring spaces from the Home page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden flex flex-col justify-between"
            >
              {/* Space Thumbnail */}
              <img
                src={b.space.main_image}
                alt={b.space.name}
                className="w-full h-40 object-cover"
              />

              {/* Booking Info */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {b.space.name}
                </h3>
                <p className="text-gray-500 text-sm">{b.space.location}</p>
                <p className="mt-3 text-gray-700">
                  <span className="font-medium">Date:</span> {b.date}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Time:</span> {b.time}
                </p>

                {/* Cancel Button */}
                <button
                  onClick={() => setConfirmId(b.id)}
                  className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition self-start"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmId && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Cancel Booking?
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  cancelBooking(confirmId);
                  setConfirmId(null);
                }}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Confirm
              </button>
              <button
                onClick={() => setConfirmId(null)}
                className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
