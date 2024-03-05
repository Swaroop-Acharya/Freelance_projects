import React, { useState } from "react";
import AddVaccine from "./AddVaccine";
import DisplayVaccines from "./DisplayVaccines";

const Vaccines = () => {
  const [activeSection, setActiveSection] = useState("display");

  return (
    <div className="bg-blue-100 border flex justify-center min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-center mb-4">
          <button
            className={`text-sm font-semibold ${
              activeSection === "add"
                ? "bg-purple-600 text-white"
                : "bg-purple-300 text-gray-800"
            } p-2 mr-4 rounded`}
            onClick={() => setActiveSection("add")}
          >
            Add Vaccine
          </button>
          <button
            className={`text-sm font-semibold ${
              activeSection === "display"
                ? "bg-purple-600 text-white"
                : "bg-purple-300 text-gray-800"
            } p-2 rounded`}
            onClick={() => setActiveSection("display")}
          >
            Display Vaccines
          </button>
        </div>
        {activeSection === "add" && <AddVaccine />}
        {activeSection === "display" && <DisplayVaccines />}
      </div>
    </div>
  );
};

export default Vaccines;
