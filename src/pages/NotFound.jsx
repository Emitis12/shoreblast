import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
        Oops! Page not found.
      </p>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-full text-lg hover:bg-blue-700 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
