import React from "react";
import { useState,useEffect } from "react";

export default function MainContent() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (date) => {
    const options = { hour: "numeric", minute: "numeric", second: "numeric" };
    return date.toLocaleTimeString("en-US", options);
  };

  return (
 
      <div>
        {/* Content */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white border border-gray-200 p-4 rounded-md">
              <div className="text-lg font-bold">Date</div>
              <div>{formatDate(currentDateTime)}</div>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-md">
              <div className="text-lg font-bold">Time</div>
              <div>{formatTime(currentDateTime)}</div>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-md">
              <div className="text-lg font-bold">Total Products</div>
              <div className="text-3xl">100</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 p-4 rounded-md">
              <div className="text-lg font-bold">Total Categories</div>
              <div className="text-3xl">5</div>
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-md">
              <div className="text-lg font-bold">Total Transactions</div>
              <div className="text-3xl">50</div>
            </div>
          </div>
        </div>
      </div>

  );
}
