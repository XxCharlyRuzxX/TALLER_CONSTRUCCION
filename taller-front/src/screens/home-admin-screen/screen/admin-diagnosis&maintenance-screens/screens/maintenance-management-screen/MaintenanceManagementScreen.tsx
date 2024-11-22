import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { ClientVehicle } from "../../../../../../interfaces/ClientVehicle";
import SearchBar from "../../../../../../components/SearchBar";
import Colors from "../../../../../../utils/Colors";
import { getAllVehicles } from "../../../../../../services/vehicleService";

const MaintenanceManagementScreen: React.FC = () => {
  const [vehicles, setVehicles] = useState<ClientVehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<ClientVehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const data = await getAllVehicles();
        setVehicles(data);
        setFilteredVehicles(data);
      } catch (error) {
        console.error("Error al obtener los vehículos:", error);
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
          vehicle.staticVehicleData.licensePlate.toLowerCase().includes(query.toLowerCase()) ||
          vehicle.staticVehicleData.model.toLowerCase().includes(query.toLowerCase()) ||
          vehicle.staticVehicleData.brand.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVehicles(filtered);
    }
    setPage(0);
  };

  return (
    <Box sx={{ padding: "2rem", backgroundColor: Colors.PrimaryGray, minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4, color: "#333" }}>
        Gestión de Mantenimiento por Vehículo
      </Typography>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        placeholder="Buscar por matrícula, marca o modelo"
      />
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
                  <b>Vehículo</b>
                </TableCell>
                <TableCell align="center" sx={{ color: Colors.White }}>
                  <b>Matrícula</b>
                </TableCell>
                <TableCell align="center" sx={{ color: Colors.White }}>
                  <b>ID Cliente</b>
                </TableCell>
                <TableCell align="center" sx={{ color: Colors.White }}>
                  <b>Modelo</b>
                </TableCell>
                <TableCell align="center" sx={{ color: Colors.White }}>
                  <b>Marca</b>
                </TableCell>
                <TableCell align="center" sx={{ color: Colors.White }}>
                  <b>Estado de Mantenimiento</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((vehicle) => (
                <TableRow
                  key={vehicle.idVehicle}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => (window.location.href = `/vehicle/${vehicle.idVehicle}/maintenancemanagement`)}
                >
                  <TableCell align="center">
                    <DirectionsCarIcon sx={{ fontSize: "2rem", color: Colors.HighlightBlue }} />
                  </TableCell>
                  <TableCell align="center">{vehicle.staticVehicleData.licensePlate}</TableCell>
                  <TableCell align="center">{vehicle.clientId}</TableCell>
                  <TableCell align="center">{vehicle.staticVehicleData.model}</TableCell>
                  <TableCell align="center">{vehicle.staticVehicleData.brand}</TableCell>
                  <TableCell align="center">
                    {vehicle.maintenanceManager?.maintenanceStatus || "Sin información"}
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
    </Box>
  );
};

export default MaintenanceManagementScreen;
