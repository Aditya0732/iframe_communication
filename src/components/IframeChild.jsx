import React, { useEffect, useState } from "react";

export const IframeChild = () => {
  const [recievedMessage, setRecievedMessage] = useState("");
  const [messageToSend, setMessageToSend] = useState("");

  const sendMessage = () => {
    window.parent.postMessage(messageToSend, "https://iframe-communication.onrender.com");
  };

  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== "https://iframe-communication.onrender.com") return;
      if (typeof e.data === "string" && e.data.indexOf("webpackHotUpdate") !== 0) {
        setRecievedMessage(e.data);
      }
    });
  }, []);

  return (
    <div className="p-8 rounded-lg shadow-lg">
      <h2 className="text-white py-4 text-3xl font-semibold animate-pulse">Child iFrame</h2>
      <div className="flex items-center">
        <input
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          placeholder="Enter message to send to parent"
          className="bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-700 transition-all duration-500 hover:scale-105 shadow-lg"
        >
          Send
        </button>
      </div>
      <p className="text-white py-4 text-xl font-semibold animate-pulse">{recievedMessage}</p>
    </div>
  );
};