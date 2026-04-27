import React from "react";
import { MaintenanceStatus } from "@/interfaces/MaintenanceManager";
import Colors from "@/utils/Colors";

interface MaintenanceStatusBadgeProps {
  status: MaintenanceStatus;
  darkMode: boolean;
}

const STATUS_LABELS: Record<MaintenanceStatus, string> = {
  [MaintenanceStatus.PENDING]: "No iniciado",
  [MaintenanceStatus.IN_PROGRESS]: "En proceso",
  [MaintenanceStatus.COMPLETED]: "Completado",
};

const MaintenanceStatusBadge: React.FC<MaintenanceStatusBadgeProps> = ({ status, darkMode }) => {
  const palette = Colors.MaintenanceStatusPalette[status];

  return (
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
      {STATUS_LABELS[status]}
    </span>
  );
};

export default MaintenanceStatusBadge;
