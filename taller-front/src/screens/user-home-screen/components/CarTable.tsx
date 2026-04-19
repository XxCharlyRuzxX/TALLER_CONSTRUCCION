import React from "react";
import { CarFront, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClientVehicle } from "@/interfaces/ClientVehicle";
import MaintenanceStatusBadge from "./MaintenanceStatusBadge";

interface CarTableProps {
  cars: ClientVehicle[];
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchTerm?: string;
  darkMode?: boolean;
}

const CarTable: React.FC<CarTableProps> = ({
  cars,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  searchTerm = "",
  darkMode = false,
}) => {
  const navigate = useNavigate();

  const handleRowClick = (vehicle: ClientVehicle) => {
    navigate(`/vehicle/${vehicle.idVehicle}`, { state: { vehicle } });
  };

  const normalizedQuery = searchTerm.trim().toLowerCase();
  const filteredCars = cars.filter((car) => {
    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      car.staticVehicleData.licensePlate,
      car.staticVehicleData.brand,
      car.staticVehicleData.model,
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  const totalPages = Math.max(1, Math.ceil(filteredCars.length / rowsPerPage));
  const safePage = Math.min(page, totalPages - 1);
  const visibleCars = filteredCars.slice(safePage * rowsPerPage, safePage * rowsPerPage + rowsPerPage);

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full min-w-180 text-sm">
          <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Vehiculo</th>
              <th className="px-4 py-3 text-left font-semibold">Placa</th>
              <th className="px-4 py-3 text-left font-semibold">Año</th>
              <th className="px-4 py-3 text-left font-semibold">Kilometraje</th>
              <th className="px-4 py-3 text-left font-semibold">Combustible</th>
              <th className="px-4 py-3 text-left font-semibold">Diagnosticos</th>
              <th className="px-4 py-3 text-left font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {visibleCars.map((car) => (
              <tr
                key={car.idVehicle}
                onClick={() => handleRowClick(car)}
                className="hover:bg-muted/60 cursor-pointer border-t transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-muted text-muted-foreground inline-flex rounded-md p-2">
                      <CarFront className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-medium">
                        {car.staticVehicleData.brand} {car.staticVehicleData.model}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs">{car.staticVehicleData.licensePlate}</td>
                <td className="px-4 py-3">{car.staticVehicleData.year}</td>
                <td className="px-4 py-3">{car.nonStaticVehicleData.mileage.toLocaleString()} km</td>
                <td className="px-4 py-3">{Math.round(car.nonStaticVehicleData.fuelLevel)}%</td>
                <td className="px-4 py-3">{car.diagnosisManager.diagnoses.length}</td>
                <td className="px-4 py-3">
                  <MaintenanceStatusBadge
                    status={car.maintenanceManager.maintenanceStatus}
                    darkMode={darkMode}
                  />
                </td>
              </tr>
            ))}
            {visibleCars.length === 0 && (
              <tr>
                <td colSpan={7} className="text-muted-foreground px-4 py-10 text-center text-sm">
                  No se encontraron vehiculos para la busqueda actual.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="text-muted-foreground text-sm">
          Mostrando {visibleCars.length} de {filteredCars.length} vehiculos
        </div>

        <div className="flex items-center gap-3">
          <label className="text-muted-foreground text-sm" htmlFor="rowsPerPage">
            Filas
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={(event) =>
              onRowsPerPageChange(event as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            className="bg-background h-9 rounded-md border px-2 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>

          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={safePage <= 0}
            onClick={() => onPageChange({}, safePage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            {safePage + 1}/{totalPages}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={safePage >= totalPages - 1}
            onClick={() => onPageChange({}, safePage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarTable;
