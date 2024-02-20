import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Admin from "../Admin/Admin";
import BuyGoods from "../BuyGoods/BuyGoods";
import MainContent from "../MainContent/MainContent";
import Security from "../Security/Security";

function Home() {
  const handleLogout = () => {
    // Handle logout logic here
  };

  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar */}
      <div className="bg-white border-r border-gray-200 w-1/5 min-h-screen sticky top-0">
        <div className="py-4">
          <Link to="/main">
            <button className="block w-full py-2 text-left px-4 hover:bg-gray-200">
              Home
            </button>
          </Link>
          <Link to="/admin">
            <button className="block w-full py-2 text-left px-4 hover:bg-gray-200">
              Admin
            </button>
          </Link>
          <Link to="/security">
            <button className="block w-full py-2 text-left px-4 hover:bg-gray-200">
              Security
            </button>
          </Link>
          <Link to="/buy">
            <button className="block w-full py-2 text-left px-4 hover:bg-gray-200">
              Buy Goods
            </button>
          </Link>
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-col w-full ">
        <div className="">
          {/* Navbar */}
          <div className="bg-white border-b border-gray-200 p-4 flex justify-between">
            <div>Warehouse Management System</div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
        <Routes>
          <Route path="/main" element={<MainContent />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/security/*" element={<Security/>}/>
          <Route path="/buy" element={<BuyGoods />} />
        </Routes>
        {location.pathname === "/*" && <MainContent />}
      </div>
    </div>
  );
}

export default Home;
