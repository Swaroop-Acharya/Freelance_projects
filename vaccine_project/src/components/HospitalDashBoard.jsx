import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Vaccines from "./Vaccines";
import PendingAppointment from "./PendingAppointment";
import CompletedAppointment from "./CompletedAppointment";

const ParentDashboard = () => {
  const handleLogout = () => {
    // Handle logout logic here
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar */}
      <div className="bg-white border-r border-gray-200 w-1/5 min-h-screen sticky top-0">
        <div className="py-4">
          <Link to="/vaccines">
            <button className="block w-full py-2 text-left px-4 hover:bg-gray-200">
              Vaccines
            </button>
          </Link>
          <Link to="/pending-appointments">
            <button className="block w-full py-2 text-left px-4 hover:bg-gray-200">
              Pending Appointments
            </button>
          </Link>
          <Link to="/completed-appointments">
            <button className="block w-full py-2 text-left px-4 hover:bg-gray-200">
              Completed Appointments
            </button>
          </Link>
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-col w-full">
        <div className="">
          {/* Navbar */}
          <div className="bg-white border-b border-gray-200 p-4 flex justify-between">
            <div>Parent Dashboard</div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex flex-grow p-4">
          <Routes>
            <Route path="/vaccines" element={<Vaccines />} />
            <Route
              path="/pending-appointments"
              element={<PendingAppointment />}
            />
            <Route
              path="/completed-appointments"
              element={<CompletedAppointment />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
