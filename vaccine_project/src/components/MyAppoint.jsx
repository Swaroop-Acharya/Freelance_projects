import React from 'react';

const MyAppoint = () => {
  // Dummy data for appointments
  const appointments = [
    { id: 1, name: 'John Doe', hospital: 'Hospital A', day: '2023-03-10', status: 'Pending' },
    { id: 2, name: 'Jane Smith', hospital: 'Hospital B', day: '2023-03-15', status: 'Completed' },
    { id: 3, name: 'Alice Johnson', hospital: 'Hospital C', day: '2023-03-20', status: 'Pending' },
  ];

  return (
    <div className="bg-custom-gray flex justify-center">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">My Appointments</h1>
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr>
              <th className="border border-gray-800 px-4 py-2">Name</th>
              <th className="border border-gray-800 px-4 py-2">Hospital</th>
              <th className="border border-gray-800 px-4 py-2">Day</th>
              <th className="border border-gray-800 px-4 py-2">Status</th>
              <th className="border border-gray-800 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td className="border border-gray-800 px-4 py-2">{appointment.name}</td>
                <td className="border border-gray-800 px-4 py-2">{appointment.hospital}</td>
                <td className="border border-gray-800 px-4 py-2">{appointment.day}</td>
                <td className="border border-gray-800 px-4 py-2">{appointment.status}</td>
                <td className="border border-gray-800 px-4 py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-2">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppoint;
