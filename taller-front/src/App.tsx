import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginScreen from "./screens/login-screen/LoginScreen";
import UserHomeScreen from "./screens/user-home-screen/UserHomeScreen";
import VehicleDetailsScreen from "./screens/vehicle-details-screen/VehicleDetailsScreen";
import RegisterScreen from "./screens/login-screen/RegisterScreen";
import HomeAdminScreen from "./screens/home-admin-screen/HomeAdminScreen";
import AdminVehiclesScreen from "./screens/home-admin-screen/screen/admin-vehicles-screens/AdminVehiclesScreen";
import AdminUsersScreen from "./screens/home-admin-screen/screen/admin-users-screens/AdminUsersScreen";
import DiagnosticsMaintenanceScreen from "./screens/home-admin-screen/screen/admin-diagnosis&maintenance-screens/DiagnosticsMaintenanceScreen";
import DiagnosisConsultScreen from "./screens/home-admin-screen/screen/admin-diagnosis&maintenance-screens/screens/diagnosis-consult-screen/DiagnosisConsultScreen";
import MaintenanceConsultScreen from "./screens/home-admin-screen/screen/admin-diagnosis&maintenance-screens/screens/maintenance-consult-screen/MaintenanceConsultScreen";
import DiagnosisManagementScreen from "./screens/home-admin-screen/screen/admin-diagnosis&maintenance-screens/screens/diagnosis-management-screen/DiagnosisManagementScreen";
import VehicleDiagnosisManagement from "./screens/managers-screen/vehicle-diagnosis-management-screen/VehicleDiagnosisManagement";
import MaintenanceManagementScreen from "./screens/home-admin-screen/screen/admin-diagnosis&maintenance-screens/screens/maintenance-management-screen/MaintenanceManagementScreen";
import MaintenanceManagement from "./screens/managers-screen/maintenance-management-screen/MaintenanceManagement";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/userHome" element={<UserHomeScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/vehicle/:idVehicle" element={<VehicleDetailsScreen />} />
        <Route path="/homeadmin" element={<HomeAdminScreen />} />
        <Route path="/homeadmin/users" element={<AdminUsersScreen />} />
        <Route path="/homeadmin/vehicles" element={<AdminVehiclesScreen />} />
        <Route path="/homeadmin/diagnosis&maintenance" element={<DiagnosticsMaintenanceScreen/>} />
        <Route path="/homeadmin/diagnosis&maintenance/consultdiagnosis" element={<DiagnosisConsultScreen/>} />
        <Route path="/homeadmin/diagnosis&maintenance/consultmaintenance" element={<MaintenanceConsultScreen/>} />
        <Route path="/homeadmin/diagnosis&maintenance/managmentdiagnosis" element={<DiagnosisManagementScreen/>} />
        <Route path="/homeadmin/diagnosis&maintenance/managmentmaintenance" element={<MaintenanceManagementScreen />} />
        <Route path="/vehicle/:idVehicle/diagnosismanagement" element={<VehicleDiagnosisManagement />} />
        <Route path="/vehicle/:idVehicle/maintenancemanagement" element={<MaintenanceManagement />} />
      </Routes>
    </Router>
  );
};


export default App;

