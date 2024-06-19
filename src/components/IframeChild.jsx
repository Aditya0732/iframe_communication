import React, { useEffect, useState } from "react";

export const IframeChild = () => {
  const [recievedMessage, setRecievedMessage] = useState("");

  const sendMessage = () => {
    window.parent.postMessage("Hi Parent!", "http://localhost:3000");
  };

  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== "http://localhost:3000") return;
     
      if (typeof e.data === "string" && e.data.indexOf("webpackHotUpdate") !== 0) {
        setRecievedMessage("Got this message from parent: " + e.data);
      }
    });
  }, []);

  return (
    <div className="p-8 rounded-lg shadow-lg">
      <h2 className="text-white py-4 text-3xl font-semibold animate-pulse">
        Child iFrame
      </h2>
      <button
        className="bg-gray-700 text-white px-4 py-2 hover:bg-gray-600 transition-all duration-500 hover:scale-105 rounded-lg shadow-lg"
        onClick={sendMessage}
      >
        Send message to parent
      </button>
      <p className="text-white py-4 text-xl font-semibold animate-pulse">
        {recievedMessage}
      </p>
    </div>
  );
};