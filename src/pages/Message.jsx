import React from "react";
import ceoImage from "../images/message.png"; // Make sure this is correct

const MessageFromCEO = () => {
  return (
    <div className="pt-70 w-full bg-gray-400 bg-repeat py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-10">
          Message from the CEO
        </h1>

        <img
          src={ceoImage}
          alt="CEO Portrait"
          className="w-full max-w-3xl mx-auto rounded-lg shadow-2xl border-4 border-blue-600"
        />
      </div>
    </div>
  );
};

export default MessageFromCEO;
