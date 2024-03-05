import React from 'react';

const PendingAppointment = () => {
  // Dummy data for pending appointments
  const appointments = [
    { id: 1, parentName: 'John Doe', childName: 'Alice Doe', phoneNumber: '123-456-7890', weight: '25 kg', age: '5 years', bloodGroup: 'A+', status: 'Pending' },
    { id: 2, parentName: 'Jane Smith', childName: 'Emily Smith', phoneNumber: '987-654-3210', weight: '30 kg', age: '6 years', bloodGroup: 'B+', status: 'Pending' },
    { id: 3, parentName: 'Alice Johnson', childName: 'Bob Johnson', phoneNumber: '456-789-0123', weight: '20 kg', age: '4 years', bloodGroup: 'O+', status: 'Pending' },
  ];

  return (
    <div className="bg-custom-gray flex justify-center">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4">Pending Appointments</h1>
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr>
              <th className="border border-gray-800 px-4 py-2">Parent Name</th>
              <th className="border border-gray-800 px-4 py-2">Child Name</th>
              <th className="border border-gray-800 px-4 py-2">Phone Number</th>
              <th className="border border-gray-800 px-4 py-2">Weight</th>
              <th className="border border-gray-800 px-4 py-2">Age</th>
              <th className="border border-gray-800 px-4 py-2">Blood Group</th>
              <th className="border border-gray-800 px-4 py-2">Status</th>
              <th className="border border-gray-800 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.id}>
                <td className="border border-gray-800 px-4 py-2">{appointment.parentName}</td>
                <td className="border border-gray-800 px-4 py-2">{appointment.childName}</td>
                <td className="border border-gray-800 px-4 py-2">{appointment.phoneNumber}</td>
                <td className="border border-gray-800 px-4 py-2">{appointment.weight}</td>
                <td className="border border-gray-800 px-4 py-2">{appointment.age}</td>
                <td className="border border-gray-800 px-4 py-2">{appointment.bloodGroup}</td>
                <td className="border border-gray-800 px-4 py-2">{appointment.status}</td>
                <td className="border border-gray-800 px-4 py-2">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
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

export default PendingAppointment;
