import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./screens/login-screen/LoginScreen";
import UserHomeScreen from "./screens/user-home-screen/UserHomeScreen";
import VehicleDetailsScreen from "./screens/vehicle-details-screen/VehicleDetailsScreen";
import RegisterScreen from "./screens/login-screen/RegisterScreen";
//import RegisterCarScreen from "./screens/register-car-screen/RegisterCarScreen";
//import RequestMaintenanceScreen from "./screens/request-maintenance-screen/RequestMaintenanceScreen";
//import MaintenanceProcessScreen from "./screens/maintenance-process-screen/MaintenanceProcessScreen";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/userHome" element={<UserHomeScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/vehicle/:idVehicle" element={<VehicleDetailsScreen />} />
      </Routes>
    </Router>
  );
};

export default App;


//<Route path="/register-vehicle" element={<RegisterCarScreen/>} />
//<Route path="/request-maintenance" element={<RequestMaintenanceScreen />} />
//<Route path="/maintenance-process" element={<MaintenanceProcessScreen />} />