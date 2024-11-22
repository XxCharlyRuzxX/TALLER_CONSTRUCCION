import React, { useState, useEffect } from "react";
import { Box, Typography, Button, TextField, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { deleteVehicle, getAllVehicles } from "../../../../services/vehicleService";
import Colors from "../../../../utils/Colors";
import { ClientVehicle } from "../../../../interfaces/ClientVehicle";
import VehiclesTable from "./components/VehiclesTable";
import EditVehicleModal from "./components/EditVehicleModal";
import AddVehicleModal from "./components/AddVehicleModal";

const AdminVehiclesScreen: React.FC = () => {
  const [vehicles, setVehicles] = useState<ClientVehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<ClientVehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const vehiclesData = await getAllVehicles();
        setVehicles(vehiclesData);
        setFilteredVehicles(vehiclesData);
      } catch (error) {
        console.error("Error al cargar los vehículos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredVehicles(vehicles);
    } else {
      const filtered = vehicles.filter(
        (vehicle) =>
          vehicle.staticVehicleData.brand.toLowerCase().includes(query.toLowerCase()) ||
          vehicle.staticVehicleData.model.toLowerCase().includes(query.toLowerCase()) ||
          vehicle.staticVehicleData.licensePlate.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVehicles(filtered);
    }
    setPage(0);
  };

  const handleAddVehicle = () => {
    setOpenAddModal(true);
  };

  const handleEditVehicle = (vehicleId: string) => {
    setSelectedVehicleId(vehicleId);
    setOpenModal(true);
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    try {
      await deleteVehicle(vehicleId);
      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.idVehicle !== vehicleId)
      );
      setFilteredVehicles((prevFiltered) =>
        prevFiltered.filter((vehicle) => vehicle.idVehicle !== vehicleId)
      );
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedVehicleId(null);
  };

  const handleAddModalClose = () => {
    setOpenAddModal(false);
  };

  const handleVehicleUpdated = async () => {
    const updatedVehicles = await getAllVehicles();
    setVehicles(updatedVehicles);
    setFilteredVehicles(updatedVehicles);
  };

  const handleVehicleAdded = async () => {
    const updatedVehicles = await getAllVehicles();
    setVehicles(updatedVehicles);
    setFilteredVehicles(updatedVehicles);
  };

  return (
    <Box sx={{ padding: "2rem", backgroundColor: Colors.PrimaryGray, minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Gestión de Vehículos
      </Typography>
      <Box sx={{ mb: 2, display: "flex" }}>
        <TextField
          variant="outlined"
          placeholder="Buscar por marca, modelo o placa"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{
            width: "100%",
            mx: "auto",
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            border: "none",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddVehicle}
          sx={{ ml: 2, minWidth: "200px" }}
        >
          Agregar Vehículo
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <VehiclesTable
          vehicles={vehicles}
          filteredVehicles={filteredVehicles}
          page={page}
          rowsPerPage={rowsPerPage}
          handleEditVehicle={handleEditVehicle}
          handleDeleteVehicle={handleDeleteVehicle}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
      )}

      <EditVehicleModal
        open={openModal}
        vehicleId={selectedVehicleId}
        onClose={handleModalClose}
        onVehicleUpdated={handleVehicleUpdated}
      />

      <AddVehicleModal
        open={openAddModal}
        onClose={handleAddModalClose}
        onVehicleAdded={handleVehicleAdded}
      />
    </Box>
  );
};

export default AdminVehiclesScreen;
