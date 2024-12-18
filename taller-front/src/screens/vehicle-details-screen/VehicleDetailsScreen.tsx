import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Alert, CircularProgress } from "@mui/material";
import Colors from "../../utils/Colors";
import SummarySection from "./components/SummarySection";
import GeneralVehicleData from "./components/GeneralVehicleData";
import DiagnosisVehicleSection from "./components/DiagnosisVehicleSection";
import MaintenanceVehicleSection from "./components/MaintenanceVehicleSection";
import { PageItemPaper } from "../../components/PageItemPaper";
import { VehicleDiagnosis } from "../../interfaces/VehicleDiagnosis";
import { updateMaintenanceStatus } from "../../services/maintenanceService";
import { MaintenanceStatus } from "../../interfaces/MaintenanceManager";
import SurveyModal from "./components/SurveyModal";
import { createSurvey } from "../../services/surveyService";
import { downloadFile } from "../../utils/downloadFile";
import { getVehicleByVehicleId } from "../../services/vehicleService";
import { calculateAuthorizedCost, calculateTotalCost, updateDiagnosis } from "../../services/diagnosisService";
import { generateReport } from "../../services/reportService";
import { ReportType } from "../../services/interfaces/ReportInterfaces";
import { ClientVehicle } from "../../interfaces/ClientVehicle";

const VehicleDetailsScreen: React.FC = () => {
  const { idVehicle } = useParams<{ idVehicle: string }>();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState<ClientVehicle | null>(null);
  const [diagnoses, setDiagnoses] = useState<VehicleDiagnosis[]>([]);
  const [maintenanceStatus, setMaintenanceStatus] = useState<MaintenanceStatus>(MaintenanceStatus.PENDING);
  const [totalCost, setTotalCost] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);

  const handleOpenSurveyModal = () => setIsSurveyModalOpen(true);
  const handleCloseSurveyModal = () => setIsSurveyModalOpen(false);

  const handleSubmitSurvey = async (rating: number | null, feedback: string) => {
    if (!rating || !vehicle) {
      alert("Por favor, selecciona una calificación y asegúrate de que los datos del vehículo estén cargados.");
      return;
    }
    try {
      await createSurvey({
        rating,
        feedback,
        clientId: vehicle.clientId,
      });

      alert("¡Gracias por tu retroalimentación!");
      handleCloseSurveyModal();
    } catch (error) {
      console.error("Error al enviar la encuesta:", error);
      alert("Hubo un problema al enviar la encuesta. Intenta nuevamente.");
    }
  };

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
              ...part,
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

  const handleRequestReport = async () => {
    if (!idVehicle) {
      alert("El ID del vehículo no está disponible.");
      return;
    }
    try {
      const pdfBlob = await generateReport(idVehicle, "FULL_REPORT" as ReportType);
      downloadFile(pdfBlob, `Reporte_Vehiculo_${idVehicle}.pdf`);
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      alert("No se pudo generar el reporte. Intenta nuevamente.");
    }
  };

  useEffect(() => {
    _initializeData();
  }, [idVehicle]);

  if (loading) {
    return (
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
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
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
            onRequestReport={handleRequestReport}
            onSubmitSurvey={handleOpenSurveyModal}
            onCustomerSupport={() => console.log("Soporte al cliente")}
          />
          <SurveyModal
            open={isSurveyModalOpen}
            onClose={handleCloseSurveyModal}
            onSubmit={handleSubmitSurvey}
          />
        </Box>
      </Box>
    </PageItemPaper>
  );
};

export default VehicleDetailsScreen;
