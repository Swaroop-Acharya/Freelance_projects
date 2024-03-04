import React, { useState } from "react";
import LoginParent from "./LoginParent";
import LoginHospital from "./LoginHospital";

const Login = () => {
  const [loginType, setLoginType] = useState("parent");

  const handleParentLogin = () => {
    setLoginType("parent");
  };

  const handleHospitalLogin = () => {
    setLoginType("hospital");
  };

  return (
    <div className="bg-custom-gray">
      <div className="max-w-6xl flex flex-col justify-center  mx-auto px-4 py-8">
        <div className="flex justify-center mb-4">
          <button
            className={`text-lg font-semibold ${
              loginType === "parent"
                ? "text-white  bg-purple-500 p-3 mr-4 rounded"
                : "text-black bg-purple-600 p-3 mr-4 rounded"
            }`}
            onClick={handleParentLogin}
          >
            Login as Parent
          </button>
          <button
            className={`text-lg font-semibold ${
              loginType === "hospital"
                ? "text-white  bg-purple-500 p-3 rounded"
                : "text-black bg-purple-600 p-3 rounded"
            }`}
            onClick={handleHospitalLogin}
          >
            Login as Hospital
          </button>
        </div>
        <div>
          {loginType === "parent" ? <LoginParent /> : <LoginHospital />}
        </div>
      </div>
    </div>
  );
};

export default Login;
