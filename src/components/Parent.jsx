import React, { useRef, useEffect, useState } from "react";

export const Parent = () => {
  const iFrameRef = useRef(null);
  const [recievedMessage, setRecievedMessage] = useState("");

  const sendMessage = () => {
    if (!iFrameRef.current) return;
    iFrameRef.current.contentWindow.postMessage(
      "Hello Child!",
      "http://localhost:3000"
    );
  };

  useEffect(() => {
    window.addEventListener("message", function (e) {
      if (e.origin !== "http://localhost:3000") return;

      if (typeof e.data === "string" && e.data.indexOf("webpackHotUpdate") !== 0) {
        setRecievedMessage("Got this message from child: " + e.data);
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-white py-4 text-3xl font-semibold animate-pulse">
        Parent window
      </h1>
      <button
        onClick={() => {
          sendMessage();
        }}
        className="bg-gray-800 text-white px-4 py-2 hover:bg-gray-700 transition-all duration-500 hover:scale-105 rounded-lg shadow-lg"
      >
        Send message to child
      </button>
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
      <p className="text-white py-4 text-xl font-semibold animate-pulse">
        {recievedMessage}
      </p>
    </div>
  );
};