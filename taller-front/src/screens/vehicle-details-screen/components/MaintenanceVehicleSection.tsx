import React from "react";
import { CheckCircle2, Clock3, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MaintenanceAdvance } from "../../../interfaces/MaintenanceAdvance";
import Colors from "../../../utils/Colors";
import { MaintenanceStatus } from "../../../interfaces/MaintenanceManager";

interface MaintenanceVehicleSectionProps {
  progresses: MaintenanceAdvance[];
  maintenanceStatus: MaintenanceStatus;
}

const STATUS_MAP = {
  [MaintenanceStatus.COMPLETED]: {
    color: Colors.HighlightGreen,
    label: "Completado",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  [MaintenanceStatus.IN_PROGRESS]: {
    color: Colors.HighlightOrange,
    label: "En proceso",
    icon: <Clock3 className="h-4 w-4" />,
  },
  [MaintenanceStatus.PENDING]: {
    color: Colors.HighlightRed,
    label: "No iniciado",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
};

const MaintenanceVehicleSection: React.FC<MaintenanceVehicleSectionProps> = ({
  progresses,
  maintenanceStatus,
}) => {
  const { color, label, icon } = STATUS_MAP[maintenanceStatus];

  return (
    <Card className="py-0">
      <CardHeader className="border-b py-5">
        <div className="flex items-center gap-2" style={{ color }}>
          {icon}
          <CardTitle>Mantenimiento</CardTitle>
        </div>
        <CardDescription>Estado actual: {label}</CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        {progresses.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-160">
              <thead className="bg-muted/60 text-muted-foreground text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Fecha</th>
                  <th className="px-3 py-2 text-left font-semibold">Descripcion</th>
                  <th className="px-3 py-2 text-left font-semibold">Imagenes</th>
                </tr>
              </thead>
              <tbody>
                {progresses.map((maintenanceAdvance) => (
                  <tr key={maintenanceAdvance.idMaintenanceAdvance} className="border-t align-top">
                    <td className="px-3 py-3 text-sm">{new Date(maintenanceAdvance.date).toLocaleDateString()}</td>
                    <td className="px-3 py-3 text-sm">{maintenanceAdvance.description}</td>
                    <td className="px-3 py-3">
                      {maintenanceAdvance.imagesAdvance && maintenanceAdvance.imagesAdvance.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {maintenanceAdvance.imagesAdvance.map((image, idx) => (
                            <img
                              key={idx}
                              src={image}
                              alt="Avance"
                              className="h-14 w-14 rounded-md border object-cover"
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-xs">Imagenes del mantenimiento no disponibles</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No hay avances de mantenimiento registrados.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MaintenanceVehicleSection;
