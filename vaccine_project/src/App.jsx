import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import BookNow from "./components/BookNow";
import Hospital from "./components/Hospital";
import Login from "./components/Login";
import HospitalDashBoard from "./components/HospitalDashBoard";
import ParentDashBoard from "./components/ParentDashBoard";
import Vaccines from "./components/Vaccines";
import CompletedAppointment from "./components/CompletedAppointment";
import PendingAppointment from "./components/PendingAppointment";
import "./modern-normalise.css";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hospital-dashboard" element={<HospitalDashBoard/>} />
        <Route path="/parent-dashboard" element={<ParentDashBoard/>} />
        <Route path="/vaccines" element={<Vaccines />} />
        <Route path="/pending-appointments" element={<PendingAppointment />} />
        <Route path="/completed-appointments" element={<CompletedAppointment/>} />
      </Routes>
    </>
  );
}

export default App;
