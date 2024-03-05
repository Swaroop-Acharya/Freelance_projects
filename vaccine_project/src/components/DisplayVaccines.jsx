import React from 'react';

const DisplayVaccines = () => {
  // Dummy data for vaccines
  const vaccines = [
    { id: 1, vaccineName: 'Vaccine A', description: 'Description A' },
    { id: 2, vaccineName: 'Vaccine B', description: 'Description B' },
    { id: 3, vaccineName: 'Vaccine C', description: 'Description C' },
  ];

  return (
    <div className="bg-custom-gray flex justify-center">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">List of Vaccines</h1>
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr>
              <th className="border border-gray-800 px-4 py-2">Vaccine Name</th>
              <th className="border border-gray-800 px-4 py-2">Description</th>
              <th className="border border-gray-800 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vaccines.map((vaccine) => (
              <tr key={vaccine.id}>
                <td className="border border-gray-800 px-4 py-2">{vaccine.vaccineName}</td>
                <td className="border border-gray-800 px-4 py-2">{vaccine.description}</td>
                <td className="border border-gray-800 px-4 py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    Edit
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline ml-2">
                    Delete
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

export default DisplayVaccines;
