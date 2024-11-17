import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Alert } from "@mui/material";
import Colors from "../../utils/Colors";

import SummarySection from "./components/SummarySection";
import GeneralVehicleData from "./components/GeneralVehicleData";
import DiagnosisVehicleSection from "./components/DiagnosisVehicleSection";
import MaintenanceVehicleSection from "./components/MaintenanceVehicleSection";

import { ClientVehicle } from "../../interfaces/ClientVehicle";
import {
  calculateTotalCost,
  updateDiagnosis,
} from "../../services/diagnosisService";
import { PageItemPaper } from "../../components/PageItemPaper";
import { VehicleDiagnosis } from "../../interfaces/VehicleDiagnosis";

const VehicleDetailsScreen: React.FC = () => {
  const { state } = useLocation();
  const vehicle: ClientVehicle = state?.vehicle;

  const [diagnoses, setDiagnoses] = useState(vehicle.diagnosisManager.diagnoses);
  const [totalCost, setTotalCost] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (vehicle) {
      calculateTotalCost(vehicle.diagnosisManager.idDiagnosisManager)
        .then((cost) => setTotalCost(cost))
        .catch((err) => setError("Error al calcular el costo total."));
    }
  }, [vehicle]);

  const handleAuthorizeDiagnoses = async (updatedDiagnoses: VehicleDiagnosis[]) => {
    try {
      for (const diagnosis of updatedDiagnoses) {
        const transformedPartsList = diagnosis.partsList.map((part) => ({
          partDetail: part.partDetail,
          partCost: part.partCost,
          estimatedArrivalDate: part.estimatedArrivalDate,
          shippingStatus: part.shippingStatus,
        }));
        console.log("Datos enviados:", {
          problemDetail: diagnosis.problemDetail,
          maintenanceCost: diagnosis.maintenanceCost,
          authorized: diagnosis.authorized,
          evaluationDate: diagnosis.evaluationDate,
          partsList: transformedPartsList,
        });
        await updateDiagnosis(
          vehicle.diagnosisManager.idDiagnosisManager,
          diagnosis.idDiagnosis,
          {
            idDiagnosis: diagnosis.idDiagnosis,
            problemDetail: diagnosis.problemDetail,
            maintenanceCost: diagnosis.maintenanceCost,
            evaluationDate: diagnosis.evaluationDate,
            partsList: transformedPartsList,
            authorized: diagnosis.authorized,
          }
        );
      }

      // Actualiza el estado local después de la API
      setDiagnoses((prevDiagnoses) =>
        prevDiagnoses.map((diagnosis) => ({
          ...diagnosis,
          isAuthorized: updatedDiagnoses.some(
            (updated) => updated.idDiagnosis === diagnosis.idDiagnosis && updated.authorized
          ),
        }))
      );

      alert("Diagnósticos autorizados exitosamente");
    } catch (error) {
      console.error(error);
      setError("Error al autorizar diagnósticos. Intenta nuevamente.");
    }
  };

  if (!vehicle) {
    return <Alert severity="error">No se encontraron datos del vehículo.</Alert>;
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
        {/* Header */}
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

        {/* General Data */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Datos Generales
          </Typography>
          <GeneralVehicleData vehicle={vehicle} />
        </Box>

        {/* Diagnoses */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Diagnósticos
          </Typography>
          <DiagnosisVehicleSection
            diagnoses={diagnoses}
            maintenanceStatus={vehicle.maintenanceManager.maintenanceStatus}
            onAuthorize={handleAuthorizeDiagnoses}
          />
        </Box>

        {/* Maintenance */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Mantenimiento
          </Typography>
          <MaintenanceVehicleSection progresses={vehicle.maintenanceManager.maintenanceProgresses} />
        </Box>

        {/* Summary */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Resumen
          </Typography>
          <SummarySection totalToPay={totalCost} />
        </Box>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Box>
    </PageItemPaper>
  );
};


export default VehicleDetailsScreen;
