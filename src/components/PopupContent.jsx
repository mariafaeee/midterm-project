// src/components/PopupContent.jsx
import React from "react";
export const PopupContent = ({ type = "success", message = "", onClose }) => {
  const isError = type === "error";

  const outerBorder = isError ? "border-red-200" : "border-green-200";
  const circleBg = isError ? "bg-red-50" : "bg-green-50";
  const iconColor = isError ? "text-red-600" : "text-green-600";
  const titleText = isError ? "Error" : "Success!";
  const subtitleColor = isError ? "text-red-700" : "text-green-700";

  return (
    <div
      className={`max-w-3xl w-full bg-white border-2 ${outerBorder} rounded-2xl shadow-sm
                 px-4 md:px-6 py-4 md:py-5 flex items-center gap-4`}
      role="status"
      aria-live="polite"
    >
      {/* Left icon circle */}
      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${circleBg} shrink-0`}>
        {isError ? (
          // error icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 ${iconColor}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.582c.75 1.334-.213 2.986-1.742 2.986H3.48c-1.53 0-2.492-1.652-1.742-2.986L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a.75.75 0 01-.75-.75V7.25c0-.414.336-.75.75-.75s.75.336.75.75v3.0A.75.75 0 0110 11z" clipRule="evenodd" />
          </svg>
        ) : (
          // success icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 h-6 ${iconColor}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`text-lg md:text-xl font-semibold text-gray-900`}>
              <span className={subtitleColor}>{titleText}</span>
            </h3>
            <p className="mt-1 text-gray-700 text-sm md:text-base break-words">
              {message}
            </p>
          </div>

          {/* Small close button  */}
          <button
            onClick={onClose}
            aria-label="Close notification"
            className="ml-4 shrink-0 p-1 rounded-full hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
