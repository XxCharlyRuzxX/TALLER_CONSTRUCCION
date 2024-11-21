import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import { VehicleDiagnosis } from "../../../../../../interfaces/VehicleDiagnosis";
import { getAllDiagnoses } from "../../../../../../services/diagnosisService";
import DiagnosisDetailsModal from "./components/DiagnosisConsultModal";
import SearchBar from "../../../../../../components/SearchBar";
import Colors from "../../../../../../utils/Colors";
import DiagnosisConsultTable from "./components/DiagnosisConsultTable";


const DiagnosisConsultScreen: React.FC = () => {
  const [diagnoses, setDiagnoses] = useState<VehicleDiagnosis[]>([]);
  const [filteredDiagnoses, setFilteredDiagnoses] = useState<VehicleDiagnosis[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState<VehicleDiagnosis | null>(null);

  const fetchDiagnoses = async () => {
    setLoading(true);
    try {
      const allDiagnoses = await getAllDiagnoses();
      setDiagnoses(allDiagnoses);
      setFilteredDiagnoses(allDiagnoses);
    } catch (error) {
      console.error("Error al cargar los diagnósticos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiagnoses();
    const interval = setInterval(fetchDiagnoses, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredDiagnoses(diagnoses);
    } else {
      const filtered = diagnoses.filter(
        (diagnosis) =>
          diagnosis.problemDetail.toLowerCase().includes(query.toLowerCase()) ||
          diagnosis.evaluationDate.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDiagnoses(filtered);
    }
  };

  const handleRowClick = (diagnosis: VehicleDiagnosis) => {
    setSelectedDiagnosis(diagnosis);
    setOpenModal(true);
  };

  return (
    <Box sx={{ padding: "2rem", backgroundColor: Colors.PrimaryGray, minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        Consultar Diagnósticos
      </Typography>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        placeholder="Buscar por detalle del problema o fecha"
      />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DiagnosisConsultTable
          diagnoses={filteredDiagnoses}
          onRowClick={handleRowClick}
        />
      )}
      <DiagnosisDetailsModal
        open={openModal}
        diagnosis={selectedDiagnosis}
        onClose={() => setOpenModal(false)}
      />
    </Box>
  );
};

export default DiagnosisConsultScreen;
