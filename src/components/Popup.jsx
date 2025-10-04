// src/components/Popup.jsx
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { PopupContent } from "./PopupContent";


export const Popup = () => {
  const { popup, setPopup } = useContext(AppContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!popup) {
      setVisible(false);
      return;
    }

    // show the toast
    setVisible(true);

    // auto hide after 4s (start exit animation then clear)
    const hideTimer = setTimeout(() => {
      setVisible(false);
      // wait for animation to finish (300ms) before removing from context
      setTimeout(() => setPopup(null), 300);
    }, 4000);

    return () => {
      clearTimeout(hideTimer);
    };
  }, [popup, setPopup]);

  if (!popup) return null;

  return (
    // container: top center, doesn't block page (pointer-events-none)
    <div className="fixed inset-x-0 top-6 flex justify-center z-50 pointer-events-none px-4">
      <div
        // the inner toast should accept pointer events
        className={`pointer-events-auto transform transition-all duration-300 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <PopupContent
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup(null)}
        />
      </div>
    </div>
  );
};
