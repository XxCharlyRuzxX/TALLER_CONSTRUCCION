import React, { useState } from "react";
import { CheckCircle2, Clock3, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VehicleDiagnosis } from "../../../interfaces/VehicleDiagnosis";
import Colors from "../../../utils/Colors";
import { MaintenanceStatus } from "../../../interfaces/MaintenanceManager";

interface DiagnosisVehicleSectionProps {
  diagnoses: VehicleDiagnosis[];
  maintenanceStatus: MaintenanceStatus;
  onAuthorize: (updatedDiagnoses: VehicleDiagnosis[]) => void;
  onStartMaintenance: () => void;
}

const getStatusProps = (status: MaintenanceStatus) => {
  switch (status) {
    case MaintenanceStatus.COMPLETED:
      return {
        color: Colors.HighlightGreen,
        label: "Completado",
        icon: <CheckCircle2 className="h-4 w-4" />,
      };
    case MaintenanceStatus.IN_PROGRESS:
      return {
        color: Colors.HighlightOrange,
        label: "En proceso",
        icon: <Clock3 className="h-4 w-4" />,
      };
    case MaintenanceStatus.PENDING:
      return {
        color: Colors.HighlightOrange,
        label: "No iniciado",
        icon: <AlertTriangle className="h-4 w-4" />,
      };
    default:
      return {};
  }
};


const DiagnosisVehicleSection: React.FC<DiagnosisVehicleSectionProps> = ({
  diagnoses,
  maintenanceStatus,
  onAuthorize,
  onStartMaintenance,
}) => {
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<number[]>([]);

  const { color, label, icon } = getStatusProps(maintenanceStatus);

  const handleDiagnosisSelection = (id: number) => {
    setSelectedDiagnoses((prev) =>
      prev.includes(id)
        ? prev.filter((diagnosisId) => diagnosisId !== id)
        : [...prev, id]
    );
  };

  const handleAuthorize = () => {
    const updatedDiagnoses = diagnoses.map((diagnosis) => ({
      ...diagnosis,
      authorized: selectedDiagnoses.includes(diagnosis.idDiagnosis),
    }));
    onAuthorize(updatedDiagnoses);
  };

  const renderDiagnosisRows = (filteredDiagnoses: VehicleDiagnosis[]) =>
    filteredDiagnoses.map((diagnosis) => (
      <tr key={diagnosis.idDiagnosis} className="border-t">
        <td className="px-3 py-3 text-sm">{diagnosis.problemDetail}</td>
        <td className="px-3 py-3 text-sm font-medium">${diagnosis.maintenanceCost.toFixed(2)}</td>
        <td className="px-3 py-3 text-sm">{diagnosis.authorized ? "Si" : "No"}</td>
        <td className="px-3 py-3 text-sm">
          {diagnosis.partsList.length > 0
            ? diagnosis.partsList.map((part, index) => (
                <p key={index} className="text-muted-foreground text-xs">
                  {part.partDetail} (${part.partCost.toFixed(2)})
                </p>
              ))
            : "Sin partes"}
        </td>
        {maintenanceStatus === MaintenanceStatus.PENDING && (
          <td className="px-3 py-3 text-center">
            <input
              type="checkbox"
              checked={selectedDiagnoses.includes(diagnosis.idDiagnosis)}
              onChange={() => handleDiagnosisSelection(diagnosis.idDiagnosis)}
              className="h-4 w-4 accent-green-600"
            />
          </td>
        )}
      </tr>
    ));

  return (
    <Card className="py-0">
      <CardHeader className="border-b py-5">
        <div className="flex items-center gap-2" style={{ color }}>
          {icon}
          <CardTitle>Diagnosticos</CardTitle>
        </div>
        <CardDescription>Estado actual: {label}</CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {diagnoses.length === 0 ? (
          <p className="text-muted-foreground text-sm">No hay diagnosticos disponibles.</p>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[680px] text-left">
                <thead className="bg-muted/60 text-muted-foreground text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Problema</th>
                    <th className="px-3 py-2 font-semibold">Costo</th>
                    <th className="px-3 py-2 font-semibold">Autorizado</th>
                    <th className="px-3 py-2 font-semibold">Partes</th>
                    {maintenanceStatus === MaintenanceStatus.PENDING && (
                      <th className="px-3 py-2 text-center font-semibold">Seleccionar</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {renderDiagnosisRows(
                    maintenanceStatus === MaintenanceStatus.PENDING
                      ? diagnoses
                      : diagnoses.filter((diagnosis) => diagnosis.authorized)
                  )}
                </tbody>
              </table>
            </div>

            {maintenanceStatus === MaintenanceStatus.PENDING && (
              <div className="mt-4 flex flex-col justify-end gap-2 sm:flex-row">
                <Button type="button" onClick={handleAuthorize} className="bg-green-600 hover:bg-green-700">
                  Autorizar diagnosticos
                </Button>
                <Button type="button" variant="destructive" onClick={onStartMaintenance}>
                  Iniciar mantenimiento
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DiagnosisVehicleSection;
