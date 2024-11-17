import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Avatar } from "@mui/material";
import { PageItemPaper } from "../../components/PageItemPaper";
import { Colors } from "../../utils/Colors";
import ConstructionIcon from "@mui/icons-material/Construction";
import { UserAccount } from "../../interfaces/UserAccount";
import { ClientVehicle } from "../../interfaces/ClientVehicle";
import { getClientVehiclesById } from "../../services/carService";
import ExpandableTableCard from "./components/ExpandedTableCar";
import RegisterVehicleModal from "./components/RegisterVehicleModal";

const UserHomePage: React.FC = () => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [vehicles, setVehicles] = useState<ClientVehicle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
    } else {
      const parsedUser: UserAccount = JSON.parse(storedUser);
      setUser(parsedUser);
      loadClientVehicles(parsedUser.userId);
    }
  }, [navigate]);

  const loadClientVehicles = async (userId: number) => {
    try {
      const fetchedVehicles = await getClientVehiclesById(userId);
      setVehicles(fetchedVehicles);
    } catch (err) {
      console.error("Error al cargar los vehículos:", err);
    }
  };

  const handleAddCar = () => {
    setIsModalOpen(true);
  };

  const handleSaveVehicle = () => {
    if (user) {
      loadClientVehicles(user.userId);
    }
    setIsModalOpen(false);
  };

  if (!user) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#F5F1F1",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 100,
          backgroundColor: Colors.HighlightGray,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "white" }}>
          BIENVENIDO A MI TALLER
        </Typography>
        <ConstructionIcon sx={{ color: Colors.HighlightRed, fontSize: 40, ml: 2 }} />
      </Box>

      <PageItemPaper sx={{ width: "80%", mt: 4, minHeight: "400px" }}>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ width: 56, height: 56 }}>U</Avatar>
          <Box ml={2}>
            <Typography variant="h6">{user.userName}</Typography>
            <Typography variant="body2" color="textSecondary">
              {user.accessCredentials.email}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ paddingTop: 2 }}>
          <ExpandableTableCard cars={vehicles} title="Mis Vehículos" onAddCar={handleAddCar}/>
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
