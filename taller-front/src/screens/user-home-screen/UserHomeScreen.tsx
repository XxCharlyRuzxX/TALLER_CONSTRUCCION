import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Avatar, CircularProgress } from "@mui/material";
import { PageItemPaper } from "../../components/PageItemPaper";
import { Colors } from "../../utils/Colors";
import { UserAccount } from "../../interfaces/UserAccount";
import { ClientVehicle } from "../../interfaces/ClientVehicle";
import ExpandableTableCard from "./components/ExpandedTableCar";
import RegisterVehicleModal from "./components/RegisterVehicleModal";
import { loadClientVehicles, updateClientVehicles } from "./functions/userHomeFunctions";

const UserHomePage: React.FC = () => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [vehicles, setVehicles] = useState<ClientVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
    } else {
      const parsedUser: UserAccount = JSON.parse(storedUser);
      setUser(parsedUser);
      loadVehicles(parsedUser);
    }
  }, [navigate]);

  const loadVehicles = async (user: UserAccount) => {
    setLoading(true);
    try {
      const fetchedVehicles = await loadClientVehicles(user.userId);
      setVehicles(fetchedVehicles);
    } catch (err) {
      console.error("Error al cargar los vehículos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCar = () => {
    setIsModalOpen(true);
  };

  const handleSaveVehicle = () => {
    if (user) {
      updateClientVehicles(user, setVehicles);
    }
    setIsModalOpen(false);
  };

  if (!user) return null;

  if (loading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#F5F1F1" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", backgroundColor: "#F5F1F1" }}>
      <Box sx={{ width: "100%", height: 100, backgroundColor: Colors.HighlightGray, display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
        <Typography variant="h5" sx={{ color: Colors.White }}>
          BIENVENIDO A MI TALLER
        </Typography>
        <img src="/taller.svg" alt="taller" style={{ width: "5vh" }} />
      </Box>

      <PageItemPaper sx={{ width: "80%", mt: 4, minHeight: "400px" }}>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ width: 56, height: 56, backgroundColor: Colors.HighlightBlue }}>
            {user.userName.charAt(0)}
          </Avatar>
          <Box ml={2}>
            <Typography variant="h6">{user.userName}</Typography>
            <Typography variant="body2" color="textSecondary">{user.accessCredentials.email}</Typography>
          </Box>
        </Box>
        <Box sx={{ paddingTop: 2 }}>
          <ExpandableTableCard cars={vehicles} title="Mis Vehículos" onAddCar={handleAddCar} />
        </Box>
      </PageItemPaper>
      <RegisterVehicleModal
        userAccount={user}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVehicle}
      />
    </Box>
  );
};

export default UserHomePage;
