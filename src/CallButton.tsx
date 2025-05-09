import { useState } from "react";

/** extracted verbatim – no functional changes */
export function CallButton() {
  const now = new Date();
  const hour = now.getHours();
  const isSchoolHours = hour >= 8 && hour <= 16;
  const isUnavailableHours = hour >= 23 || hour < 8;
  const [isShaking, setIsShaking] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (isSchoolHours || isUnavailableHours) {
      e.preventDefault();
      setIsShaking(true);
      setShowMessage(true);
      setTimeout(() => setIsShaking(false), 500);
      setTimeout(() => setShowMessage(false), 5000);
    }
  };

  return (
    <>
      <a
        href="tel:4706418216"
        onClick={handleClick}
        className={`fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-transform ${
          isShaking ? "animate-[shake_0.5s_ease-in-out]" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
          />
        </svg>
      </a>
      {showMessage && (
        <div className="fixed bottom-24 right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs animate-fade-in">
          <p className="text-gray-800 mb-2">
            {isSchoolHours
              ? "I'm currently in class at Creekview! 📚"
              : "Sorry, I'm catching some Z's right now! 😴"}
          </p>
          <p className="text-gray-600 text-sm">
            Please book a consultation or email me at{" "}
            <a
              href="mailto:noahjehova@gmail.com"
              className="text-blue-600 hover:underline"
            >
              noahjehova@gmail.com
            </a>
          </p>
        </div>
      )}
    </>
  );
}
