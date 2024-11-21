import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { MaintenanceAdvance } from "../../../../../../interfaces/MaintenanceAdvance";
import { getAllMaintenanceAdvances } from "../../../../../../services/maintenanceService";
import Colors from "../../../../../../utils/Colors";
import SearchBar from "../../../../../../components/SearchBar";
import MaintenanceConsultTable from "./components/MaintenanceConsultTable";


const MaintenanceConsultScreen: React.FC = () => {
  const [maintenances, setMaintenances] = useState<MaintenanceAdvance[]>([]);
  const [filteredMaintenances, setFilteredMaintenances] = useState<
    MaintenanceAdvance[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMaintenances = async () => {
      setLoading(true);
      try {
        const data = await getAllMaintenanceAdvances();
        setMaintenances(data);
        setFilteredMaintenances(data);
      } catch (error) {
        console.error("Error al cargar los avances de mantenimiento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenances();
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredMaintenances(maintenances);
    } else {
      const filtered = maintenances.filter((maintenance) =>
        maintenance.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMaintenances(filtered);
    }
  };


  return (
    <Box
      sx={{
        padding: "2rem",
        backgroundColor: Colors.PrimaryGray,
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Consultar Mantenimiento
      </Typography>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        placeholder="Buscar por descripción"
      />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <MaintenanceConsultTable
          maintenances={filteredMaintenances}
          onRowClick={() => {}}
        />
      )}
    </Box>
  );
};

export default MaintenanceConsultScreen;
