import { Route, Routes } from "react-router-dom";
import { Parent } from "./components/Parent";
import { IframeChild } from "./components/IframeChild";

export const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1b1b1b] to-[#2c2c2c] overflow-hidden">
      <div className="animate-pulse-slow">
        <Routes>
          <Route path="/" element={<Parent />} />
          <Route path="/iframe-child/" element={<IframeChild />} />
        </Routes>
      </div>
    </div>
  );
};