import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import Colors from "../../../../utils/Colors";
import { ClientVehicle } from "../../../../interfaces/ClientVehicle";
import { deleteVehicle, getAllVehicles } from "../../../../services/carService";
import EditVehicleModal from "./EditVehicleModal";

const AdminVehiclesScreen: React.FC = () => {
  const [vehicles, setVehicles] = useState<ClientVehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<ClientVehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  const navigate = useNavigate();

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
    navigate("/add-vehicle");
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

  const handleVehicleUpdated = async () => {
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
        <TableContainer component={Paper} sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <Table>
            <TableHead sx={{ backgroundColor: Colors.HighlightGray }}>
              <TableRow>
                <TableCell align="center" sx={{ color: Colors.White }}>
                  <b>Placa</b>
                </TableCell>
                <TableCell align="center" sx={{ color: Colors.White }}>
                  <b>Marca</b>
                </TableCell>
                <TableCell align="center" sx={{ color: Colors.White }}>
                  <b>Modelo</b>
                </TableCell>
                <TableCell align="center" sx={{ color: Colors.White }}>
                  <b>Año</b>
                </TableCell>
                <TableCell align="center" sx={{ color: Colors.White }}>
                  <b>Kilometraje</b>
                </TableCell>
                <TableCell align="center" sx={{ color: Colors.White }}>
                  <b>Acciones</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((vehicle) => (
                <TableRow key={vehicle.idVehicle} hover>
                  <TableCell align="center">{vehicle.staticVehicleData.licensePlate}</TableCell>
                  <TableCell align="center">{vehicle.staticVehicleData.brand}</TableCell>
                  <TableCell align="center">{vehicle.staticVehicleData.model}</TableCell>
                  <TableCell align="center">{vehicle.staticVehicleData.year}</TableCell>
                  <TableCell align="center">{vehicle.nonStaticVehicleData.mileage} km</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => handleEditVehicle(vehicle.idVehicle)}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteVehicle(vehicle.idVehicle)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={filteredVehicles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_e, newPage) => setPage(newPage)}
            onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          />
        </TableContainer>
      )}

      <EditVehicleModal
        open={openModal}
        vehicleId={selectedVehicleId}
        onClose={handleModalClose}
        onVehicleUpdated={handleVehicleUpdated}
      />
    </Box>
  );
};

export default AdminVehiclesScreen;
