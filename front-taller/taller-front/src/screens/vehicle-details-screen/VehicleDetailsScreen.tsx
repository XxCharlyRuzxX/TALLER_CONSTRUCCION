import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Alert, CircularProgress } from "@mui/material";
import Colors from "../../utils/Colors";
import SummarySection from "./components/SummarySection";
import GeneralVehicleData from "./components/GeneralVehicleData";
import DiagnosisVehicleSection from "./components/DiagnosisVehicleSection";
import MaintenanceVehicleSection from "./components/MaintenanceVehicleSection";
import { ClientVehicle } from "../../interfaces/ClientVehicle";
import { calculateAuthorizedCost, calculateTotalCost, updateDiagnosis } from "../../services/diagnosisService";
import { getVehicleByVehicleId } from "../../services/carService";
import { PageItemPaper } from "../../components/PageItemPaper";
import { VehicleDiagnosis } from "../../interfaces/VehicleDiagnosis";
import { updateMaintenanceStatus } from "../../services/maintenanceService";
import { MaintenanceStatus } from "../../interfaces/MaintenanceManager";

const VehicleDetailsScreen: React.FC = () => {
  const { idVehicle } = useParams<{ idVehicle: string }>();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState<ClientVehicle | null>(null);
  const [diagnoses, setDiagnoses] = useState<VehicleDiagnosis[]>([]);
  const [maintenanceStatus, setMaintenanceStatus] = useState<MaintenanceStatus>(
    MaintenanceStatus.PENDING
  );
  const [totalCost, setTotalCost] = useState(0); // Nuevo estado para el costo
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const _initializeData = async () => {
    if (!idVehicle) {
      setError("El ID del vehículo no está definido.");
      navigate("/error");
      return;
    }
    setLoading(true);
    try {
      const fetchedVehicle = await getVehicleByVehicleId(idVehicle);
      setVehicle(fetchedVehicle);
      setDiagnoses(fetchedVehicle.diagnosisManager.diagnoses);
      setMaintenanceStatus(fetchedVehicle.maintenanceManager.maintenanceStatus);

      // Calcular el costo inicial
      await _calculateCost(
        fetchedVehicle.diagnosisManager.idDiagnosisManager,
        fetchedVehicle.maintenanceManager.maintenanceStatus
      );

      setError(null);
    } catch (err) {
      console.error("Error al obtener los datos del vehículo:", err);
      setError("Error al cargar los datos del vehículo.");
    } finally {
      setLoading(false);
    }
  };

  const _calculateCost = async (
    diagnosisManagerId: number,
    maintenanceStatus: MaintenanceStatus
  ) => {
    try {
      if (
        maintenanceStatus === MaintenanceStatus.IN_PROGRESS ||
        maintenanceStatus === MaintenanceStatus.COMPLETED
      ) {
        const authorizedCost = await calculateAuthorizedCost(diagnosisManagerId);
        setTotalCost(authorizedCost);
      } else {
        const totalCost = await calculateTotalCost(diagnosisManagerId);
        setTotalCost(totalCost);
      }
    } catch (err) {
      console.error("Error al calcular el costo:", err);
      setError("Error al calcular el costo total.");
    }
  };

  const handleAuthorizeDiagnoses = async (
    updatedDiagnoses: VehicleDiagnosis[]
  ) => {
    try {
      for (const diagnosis of updatedDiagnoses) {
        await updateDiagnosis(
          vehicle!.diagnosisManager.idDiagnosisManager,
          diagnosis.idDiagnosis,
          {
            ...diagnosis,
            partsList: diagnosis.partsList.map((part) => ({
              partDetail: part.partDetail,
              partCost: part.partCost,
              estimatedArrivalDate: part.estimatedArrivalDate,
              shippingStatus: part.shippingStatus,
            })),
          }
        );
      }
      await _initializeData();
      alert("Diagnósticos autorizados exitosamente.");
    } catch (error) {
      console.error("Error al autorizar diagnósticos:", error);
      setError("Error al autorizar diagnósticos. Intenta nuevamente.");
    }
  };

  const handleStartMaintenance = async () => {
    try {
      await updateMaintenanceStatus(
        vehicle!.maintenanceManager.idMaintenanceManager,
        MaintenanceStatus.IN_PROGRESS
      );
      await _initializeData();
      alert("El proceso de mantenimiento ha comenzado.");
      setMaintenanceStatus(MaintenanceStatus.IN_PROGRESS);
    } catch (error) {
      console.error("Error al iniciar el mantenimiento:", error);
      setError("Error al iniciar el proceso de mantenimiento.");
    }
  };

  const _renderLoading = () => (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );

  const _renderError = () => <Alert severity="error">{error}</Alert>;

  // Render del contenido principal
  const _renderContent = () => (
    <PageItemPaper>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 4,
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
            Detalles del Vehículo
          </Typography>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Datos Generales
          </Typography>
          <GeneralVehicleData vehicle={vehicle!} />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Diagnósticos
          </Typography>
          <DiagnosisVehicleSection
            diagnoses={diagnoses}
            maintenanceStatus={maintenanceStatus}
            onAuthorize={handleAuthorizeDiagnoses}
            onStartMaintenance={handleStartMaintenance}
          />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Mantenimiento
          </Typography>
          <MaintenanceVehicleSection
            progresses={vehicle!.maintenanceManager.maintenanceProgresses}
            maintenanceStatus={maintenanceStatus}
          />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Resumen General
          </Typography>
          <SummarySection
            totalToPay={totalCost}
            onRequestReport={() => console.log("Reporte solicitado")}
            onSubmitSurvey={() => console.log("Encuesta iniciada")}
            onCustomerSupport={() => console.log("Soporte al cliente")}
          />
        </Box>
      </Box>
    </PageItemPaper>
  );

  useEffect(() => {
    _initializeData();
  }, [idVehicle]);

  if (loading) return _renderLoading();
  if (error) return _renderError();
  return _renderContent();
};

export default VehicleDetailsScreen;
