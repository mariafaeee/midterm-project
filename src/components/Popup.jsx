import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { PopupContent } from "./PopupContent";

export const Popup = () => {
  const { popup, setPopup } = useContext(AppContext);

  // Always call hook at top level
  useEffect(() => {
    if (!popup) return; // do nothing if no popup
    const timer = setTimeout(() => setPopup(null), 4000);
    return () => clearTimeout(timer);
  }, [popup, setPopup]);

  if (!popup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <PopupContent
        type={popup.type}
        message={popup.message}
        onClose={() => setPopup(null)}
      />
    </div>
  );
};
