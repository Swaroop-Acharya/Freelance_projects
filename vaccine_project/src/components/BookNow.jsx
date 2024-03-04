import React, { useState } from 'react';

const BookNow = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    adharNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate Adhar Number
    if (name === 'adharNumber' && (isNaN(value) || value.length !== 16)) {
      setFormError('Adhar Number must be a 16-digit number');
    } else if (name === 'phoneNumber' && (isNaN(value) || value.length !== 10)) {
      setFormError('Phone Number must be a 10-digit number');
    } else {
      setFormError('');
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.fullName.trim() === '' ||
      formData.phoneNumber.trim() === '' ||
      formData.adharNumber.trim() === '' ||
      formData.address.trim() === '' ||
      formData.password.trim() === '' ||
      formData.confirmPassword.trim() === ''
    ) {
      setFormError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Password and Confirm Password do not match');
      return;
    }

    // Perform form submission logic here
    console.log(formData);
  };

  return (
    <div className="bg-custom-gray flex justify-center">
      <div className="max-w-6xl mx-auto px-4 py-8 flex">
        <div className="w-1/2">
          <h1 className="text-3xl font-semibold mb-4">Book a Vaccination Appointment</h1>
          <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius justo sit amet turpis tristique, at varius odio interdum.</p>
        </div>
        <div className="w-1/2">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-semibold mb-4">Register as Parent</h2>
            {formError && <p className="text-red-500 mb-4">{formError}</p>}
            <div className="mb-4 flex">
              <div className="w-1/2 pr-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/2 pl-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phoneNumber"
                  type="tel"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="adharNumber">
                Adhar Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="adharNumber"
                type="text"
                placeholder="Adhar Number"
                name="adharNumber"
                value={formData.adharNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 flex">
              <div className="w-1/2 pr-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/2 pl-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-custom-green bg-purple-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
