import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-custom-navy shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-white">Child Vaccination Booking</h1>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-custom-purple text-lg px-4 py-2">Home</Link>
          <Link to="/book-now" className="text-white hover:text-custom-purple text-lg px-4 py-2">Book Now</Link>
          <Link to="/hospital" className="text-white hover:text-custom-purple text-lg px-4 py-2">Hospital</Link>
          <Link to="/login" className="text-white hover:text-custom-purple text-lg px-4 py-2">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
