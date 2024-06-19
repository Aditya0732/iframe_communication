import React, { useRef, useEffect, useState } from "react";

export const Parent = () => {
  const iFrameRef = useRef(null);
  const [recievedMessage, setRecievedMessage] = useState("");
  const [messageToSend, setMessageToSend] = useState("");

  const sendMessage = () => {
    if (!iFrameRef.current) return;
    iFrameRef.current.contentWindow.postMessage(messageToSend, "https://iframe-communication.onrender.com");
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
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-white py-4 text-3xl font-semibold animate-pulse">Parent iFrame</h1>
      <div className="flex items-center">
        <input
          type="text"
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          placeholder="Enter message to send to child"
          className="bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-gray-800 text-white px-4 py-2 rounded-r-lg hover:bg-gray-700 transition-all duration-500 hover:scale-105 shadow-lg"
        >
          Send
        </button>
      </div>
      <br />
      <br />
      <iframe
        ref={iFrameRef}
        src="/iframe-child/"
        width="600"
        height="300"
        title="Child iframe"
        className="rounded-lg shadow-lg"
      ></iframe>
      <p className="text-white py-4 text-xl font-semibold animate-pulse">{recievedMessage}</p>
    </div>
  );
};