import React, { useState } from "react";
import CompletedAppointment from "./CompletedAppointment";
import PendingAppointment from "./PendingAppointment";
import Vaccines from "./Vaccines";

const Login = () => {
  const [loginType, setLoginType] = useState("parent");

  const handleParentLogin = () => {
    setLoginType("parent");
  };

  const handleHospitalLogin = () => {
    setLoginType("hospital");
  };

  const handleCompletedAppointment = () => {
    setLoginType("completed");
  };

  return (
    <div className="bg-custom-gray">
      <div className="max-w-6xl flex flex-col justify-center  mx-auto px-4 py-8">
        <div className="flex justify-center mb-4">
          <button
            className={`text-lg font-semibold ${
              loginType === "hospital"
                ? "text-white  bg-purple-500 p-3 mr-4 rounded"
                : "text-black bg-purple-600 p-3 mr-4 rounded"
            }`}
            onClick={handleHospitalLogin}
          >
           Pending Appointments
          </button>
          <button
            className={`text-lg font-semibold ${
              loginType === "parent"
                ? "text-white  bg-purple-500 p-3 mr-4 rounded"
                : "text-black bg-purple-600 p-3 mr-4 rounded"
            }`}
            onClick={handleParentLogin}
          >
            Vaccines
          </button>
          <button
            className={`text-lg font-semibold ${
              loginType === "completed"
                ? "text-white  bg-purple-500 p-3 rounded"
                : "text-black bg-purple-600 p-3 rounded"
            }`}
            onClick={handleCompletedAppointment}
          >
            Completed Appointments
          </button>
        </div>
        <div>
          {loginType === "parent" ? <Vaccines /> : loginType === "hospital" ? <PendingAppointment /> : <CompletedAppointment />}
        </div>
        
      </div>
    </div>
  );
};

export default Login;
