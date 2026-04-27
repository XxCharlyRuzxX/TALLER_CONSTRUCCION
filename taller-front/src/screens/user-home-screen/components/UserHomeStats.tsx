import React from "react";
import { Car, CheckCircle2, Clock3, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ClientVehicle } from "@/interfaces/ClientVehicle";
import { MaintenanceStatus } from "@/interfaces/MaintenanceManager";
import Colors from "@/utils/Colors";

interface UserHomeStatsProps {
  vehicles: ClientVehicle[];
  darkMode: boolean;
}

interface StatItemProps {
  label: string;
  value: number;
  darkMode: boolean;
  icon: React.ReactNode;
  accentColor: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, darkMode, icon, accentColor }) => {
  return (
    <Card className="py-0">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">{label}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
        <div
          className="rounded-lg border p-2"
          style={{
            color: accentColor,
            borderColor: darkMode ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.1)",
            backgroundColor: darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
          }}
        >
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

const UserHomeStats: React.FC<UserHomeStatsProps> = ({ vehicles, darkMode }) => {
  const pendingCount = vehicles.filter(
    (vehicle) => vehicle.maintenanceManager.maintenanceStatus === MaintenanceStatus.PENDING
  ).length;

  const inProgressCount = vehicles.filter(
    (vehicle) => vehicle.maintenanceManager.maintenanceStatus === MaintenanceStatus.IN_PROGRESS
  ).length;

  const completedCount = vehicles.filter(
    (vehicle) => vehicle.maintenanceManager.maintenanceStatus === MaintenanceStatus.COMPLETED
  ).length;

  return (
    <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <StatItem
        label="Total"
        value={vehicles.length}
        darkMode={darkMode}
        icon={<Car className="h-4 w-4" />}
        accentColor={Colors.HighlightGray}
      />
      <StatItem
        label="No iniciado"
        value={pendingCount}
        darkMode={darkMode}
        icon={<Clock3 className="h-4 w-4" />}
        accentColor={Colors.HighlightOrange}
      />
      <StatItem
        label="En proceso"
        value={inProgressCount}
        darkMode={darkMode}
        icon={<Wrench className="h-4 w-4" />}
        accentColor={Colors.HighlightBlue}
      />
      <StatItem
        label="Completado"
        value={completedCount}
        darkMode={darkMode}
        icon={<CheckCircle2 className="h-4 w-4" />}
        accentColor={Colors.HighlightGreen}
      />
    </section>
  );
};

export default UserHomeStats;
