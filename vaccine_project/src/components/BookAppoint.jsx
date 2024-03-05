import React, { useState } from 'react';

const BookAppoint = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    weight: '',
    bloodGroup: '',
    hospital: '',
    day: '',
    vaccine: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'day') {
      const selectedDate = new Date(value);
      const today = new Date();
      if (selectedDate < today) {
        alert('Please select today or a future date for the appointment.');
        // Prevent selecting past dates
        return;
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log(formData);
    // Reset form fields
    setFormData({
      name: '',
      dob: '',
      weight: '',
      bloodGroup: '',
      hospital: '',
      day: '',
      vaccine: '',
    });
  };

  return (
    <div className="bg-custom-gray flex justify-center">
      <div className="max-w-6xl mx-auto px-4 py-8 flex">
        <div className="w-full">
          <h1 className="text-3xl font-semibold mb-4">Book an Appointment</h1>
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4 flex">
              <div className="w-1/3 pr-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/3 pr-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dob"
                  type="date"
                  placeholder="Date of Birth"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/3 pl-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="day">
                  Appointment Day
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="day"
                  type="date"
                  placeholder="Day"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-4 flex">
              <div className="w-1/2 pr-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
                  Weight
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="weight"
                  type="text"
                  placeholder="Weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-1/2 pl-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vaccine">
                  Select Vaccine
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="vaccine"
                  name="vaccine"
                  value={formData.vaccine}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Vaccine</option>
                  <option value="Vaccine A">Vaccine A</option>
                  <option value="Vaccine B">Vaccine B</option>
                  <option value="Vaccine C">Vaccine C</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="w-1/2 pl-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloodGroup">
                  Blood Group
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="bloodGroup"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
            <div className="mb-4 flex">
              <div className="w-1/2 pr-3">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hospital">
                  Select Hospital
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Hospital</option>
                  <option value="Hospital A">Hospital A</option>
                  <option value="Hospital B">Hospital B</option>
                  <option value="Hospital C">Hospital C</option>
                  <option value="Hospital D">Hospital D</option>
                </select>
              </div>
             
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-custom-green bg-purple-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppoint;
