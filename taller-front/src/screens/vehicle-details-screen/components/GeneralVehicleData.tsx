import React from "react";
import { Calendar, CarFront, Fuel, Gauge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ClientVehicle } from "../../../interfaces/ClientVehicle";
import { MaintenanceStatus } from "@/interfaces/MaintenanceManager";
import Colors from "../../../utils/Colors";

interface GeneralVehicleDataProps {
  vehicle: ClientVehicle;
  maintenanceStatus: MaintenanceStatus;
  darkMode: boolean;
}

const STATUS_LABELS: Record<MaintenanceStatus, string> = {
  [MaintenanceStatus.PENDING]: "No iniciado",
  [MaintenanceStatus.IN_PROGRESS]: "En proceso",
  [MaintenanceStatus.COMPLETED]: "Completado",
};

const GeneralVehicleData: React.FC<GeneralVehicleDataProps> = ({ vehicle, maintenanceStatus, darkMode }) => {
  const palette = Colors.MaintenanceStatusPalette[maintenanceStatus];

  return (
    <Card className="py-0">
      <CardContent className="space-y-6 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-muted text-muted-foreground inline-flex h-16 w-16 items-center justify-center rounded-xl border">
              <CarFront className="h-8 w-8" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                {vehicle.staticVehicleData.brand} {vehicle.staticVehicleData.model}
              </h2>
              <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {vehicle.staticVehicleData.year}
                </span>
                <span className="font-mono text-xs">{vehicle.staticVehicleData.licensePlate}</span>
              </div>
            </div>
          </div>

          <span
            className="inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold"
            style={{
              backgroundColor: darkMode ? palette.darkBg : palette.lightBg,
              borderColor: darkMode ? palette.darkBorder : palette.lightBorder,
              color: darkMode ? palette.darkText : palette.lightText,
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: darkMode ? palette.darkDot : palette.lightDot }}
            />
            {STATUS_LABELS[maintenanceStatus]}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="bg-muted/40 rounded-lg border p-3">
            <p className="text-muted-foreground text-[11px] uppercase tracking-wider">Kilometraje</p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold">
              <Gauge className="h-3.5 w-3.5" />
              {vehicle.nonStaticVehicleData.mileage.toLocaleString()} km
            </p>
          </div>

          <div className="bg-muted/40 rounded-lg border p-3">
            <p className="text-muted-foreground text-[11px] uppercase tracking-wider">Combustible</p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold">
              <Fuel className="h-3.5 w-3.5" />
              {Math.round(vehicle.nonStaticVehicleData.fuelLevel)}%
            </p>
          </div>

          <div className="bg-muted/40 rounded-lg border p-3 sm:col-span-1">
            <p className="text-muted-foreground text-[11px] uppercase tracking-wider">Observaciones</p>
            <p className="mt-1 text-sm font-medium">
              {vehicle.nonStaticVehicleData.additionalObservations || "Sin observaciones adicionales"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralVehicleData;
