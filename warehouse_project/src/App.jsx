import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
  
      <div className="">
        <Routes>
          <Route path="/login" element={<Login setLogin={setIsLoggedIn} />} />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Login setLogin={setIsLoggedIn} />}
          />
          <Route
            path="*"
            element={isLoggedIn ? <Home /> : <Login setLogin={setIsLoggedIn} />}
          />
        </Routes>
      </div>
   
  );
}

export default App;
