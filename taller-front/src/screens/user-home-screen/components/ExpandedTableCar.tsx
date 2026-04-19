import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CarTable from "./CarTable";
import { ClientVehicle } from "../../../interfaces/ClientVehicle";

interface ExpandableTableProps {
  cars: ClientVehicle[];
  title: string;
  onAddCar: () => void;
  searchTerm?: string;
  darkMode?: boolean;
}

export const ExpandableTableCard: React.FC<ExpandableTableProps> = ({
  cars,
  title,
  onAddCar,
  searchTerm = "",
  darkMode = false,
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-row items-start justify-between gap-3 border-b py-5">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>Selecciona un vehiculo para ver su detalle y avance.</CardDescription>
        </div>
        <Button type="button" onClick={onAddCar} className="shrink-0">
          <Plus className="h-4 w-4" />
          Agregar
        </Button>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <CarTable
          cars={cars}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          searchTerm={searchTerm}
          darkMode={darkMode}
        />
      </CardContent>
    </Card>
  );
};

export default ExpandableTableCard;
