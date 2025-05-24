import React, { useEffect, useState } from "react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white px-6 py-4 shadow-lg flex flex-col md:flex-row justify-between items-center z-50">
      <p className="text-sm mb-2 md:mb-0">
        We use cookies to improve your experience. By using our site, you agree to our cookie policy.
      </p>
      <button
        onClick={handleAccept}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg"
      >
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;