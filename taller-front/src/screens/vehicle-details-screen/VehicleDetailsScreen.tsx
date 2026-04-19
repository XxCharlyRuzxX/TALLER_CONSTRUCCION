import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import SummarySection from "./components/SummarySection";
import GeneralVehicleData from "./components/GeneralVehicleData";
import DiagnosisVehicleSection from "./components/DiagnosisVehicleSection";
import MaintenanceVehicleSection from "./components/MaintenanceVehicleSection";
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
import { toast } from "sonner";
import ClientThemeToggle from "../user-home-screen/components/ClientThemeToggle";

const CLIENT_THEME_KEY = "client-user-theme";

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
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem(CLIENT_THEME_KEY) === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem(CLIENT_THEME_KEY, darkMode ? "dark" : "light");

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [darkMode]);

  const handleOpenSurveyModal = () => setIsSurveyModalOpen(true);
  const handleCloseSurveyModal = () => setIsSurveyModalOpen(false);

  const handleSubmitSurvey = async (rating: number | null, feedback: string) => {
    if (!rating || !vehicle) {
      toast.warning("Por favor, selecciona una calificacion y asegurese de que los datos del vehiculo esten cargados.");
      return;
    }
    try {
      await createSurvey({
        rating,
        feedback,
        clientId: vehicle.clientId,
      });

      toast.success("Gracias por tu retroalimentacion.");
      handleCloseSurveyModal();
    } catch (error) {
      console.error("Error al enviar la encuesta:", error);
      toast.error("Hubo un problema al enviar la encuesta. Intenta nuevamente.");
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
      toast.success("Diagnosticos autorizados exitosamente.");
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
      toast.success("El proceso de mantenimiento ha comenzado.");
      setMaintenanceStatus(MaintenanceStatus.IN_PROGRESS);
    } catch (error) {
      console.error("Error al iniciar el mantenimiento:", error);
      setError("Error al iniciar el proceso de mantenimiento.");
    }
  };

  const handleRequestReport = async () => {
    if (!idVehicle) {
      toast.error("El ID del vehiculo no esta disponible.");
      return;
    }
    try {
      const pdfBlob = await generateReport(idVehicle, "FULL_REPORT" as ReportType);
      downloadFile(pdfBlob, `Reporte_Vehiculo_${idVehicle}.pdf`);
    } catch (error) {
      console.error("Error al generar el reporte:", error);
      toast.error("No se pudo generar el reporte. Intenta nuevamente.");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    _initializeData();
  }, [idVehicle]);

  if (loading) {
    return (
      <main className="bg-background text-foreground flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">Cargando detalles del vehiculo...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-background text-foreground flex min-h-screen items-center justify-center px-6">
        <div className="space-y-3 text-center">
          <p className="text-destructive text-sm font-medium">{error}</p>
          <Button type="button" variant="outline" onClick={_initializeData}>
            Reintentar
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex rounded-lg border p-2">
              <Wrench className="h-4 w-4" />
            </span>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-wider">Portal del cliente</p>
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Detalle del vehiculo</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={() => navigate("/userHome")}>
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <ClientThemeToggle darkMode={darkMode} onToggle={() => setDarkMode((prev) => !prev)} />
          </div>
        </header>

        <GeneralVehicleData vehicle={vehicle!} maintenanceStatus={maintenanceStatus} darkMode={darkMode} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <DiagnosisVehicleSection
              diagnoses={diagnoses}
              maintenanceStatus={maintenanceStatus}
              onAuthorize={handleAuthorizeDiagnoses}
              onStartMaintenance={handleStartMaintenance}
            />

            <MaintenanceVehicleSection
              progresses={vehicle!.maintenanceManager.maintenanceProgresses}
              maintenanceStatus={maintenanceStatus}
            />
          </div>

          <SummarySection
            totalToPay={totalCost}
            onRequestReport={handleRequestReport}
            onSubmitSurvey={handleOpenSurveyModal}
            onCustomerSupport={() => toast.info("Pronto habilitaremos soporte al cliente.")}
          />
        </div>

        <SurveyModal
          open={isSurveyModalOpen}
          onClose={handleCloseSurveyModal}
          onSubmit={handleSubmitSurvey}
        />
      </div>
    </main>
  );
};

export default VehicleDetailsScreen;
