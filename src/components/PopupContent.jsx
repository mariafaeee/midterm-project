import React from "react";

export const PopupContent = ({ type, message, onClose }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center">
      <h2
        className={`text-lg font-semibold mb-2 ${
          type === "error" ? "text-red-600" : "text-green-600"
        }`}
      >
        {type === "error" ? "Booking Error" : "Success"}
      </h2>
      <p className="text-gray-700 mb-4">{message}</p>
      <button
        onClick={onClose}
        className={`px-4 py-2 rounded-lg transition ${
          type === "error"
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
      >
        Close
      </button>
    </div>
  );
};
