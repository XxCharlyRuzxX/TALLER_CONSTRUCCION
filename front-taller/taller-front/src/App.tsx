import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/login-screen/LoginScreen";
import UserHomeScreen from "./screens/user-home-screen/UserHomeScreen";
//import RegisterCarScreen from "./screens/register-car-screen/RegisterCarScreen";
//import RequestMaintenanceScreen from "./screens/request-maintenance-screen/RequestMaintenanceScreen";
//import MaintenanceProcessScreen from "./screens/maintenance-process-screen/MaintenanceProcessScreen";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/userHome" element={<UserHomeScreen />} />

      </Routes>
    </Router>
  );
};

export default App;


//<Route path="/register-vehicle" element={<RegisterCarScreen/>} />
//<Route path="/request-maintenance" element={<RequestMaintenanceScreen />} />
//<Route path="/maintenance-process" element={<MaintenanceProcessScreen />} />