import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UserAccount } from "../../../interfaces/UserAccount";
import { registerNewVehicle } from "../functions/vehicleFunctions";
import { ClientVehicleDTO } from "../../../services/interfaces/VehicleInterfaces";
import { toast } from "sonner";

interface RegisterVehicleModalProps {
  userAccount: UserAccount;
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const RegisterVehicleModal: React.FC<RegisterVehicleModalProps> = ({ userAccount, open, onClose, onSave }) => {
  const initialVehicleData: ClientVehicleDTO = {
    clientId: userAccount.userId,
    brand: "",
    model: "",
    year: 0,
    licensePlate: "",
    mileage: 0,
    fuelLevel: 0,
    additionalObservations: "",
  };

  const [vehicleData, setVehicleData] = useState<ClientVehicleDTO>(initialVehicleData);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setVehicleData((prev) => ({
      ...prev,
      [name]: name === "year" || name === "mileage" || name === "fuelLevel" ? Number(value) || 0 : value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await registerNewVehicle(vehicleData);
      setVehicleData(initialVehicleData);
      toast.success("Vehiculo registrado correctamente.");
      onSave();
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error al registrar el vehiculo");
    } finally {
      setIsSaving(false);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <Card className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-auto py-0">
        <CardHeader className="flex flex-row items-start justify-between gap-3 border-b py-5">
          <div>
            <CardTitle>Registrar nuevo vehiculo</CardTitle>
            <CardDescription>Completa la informacion para agregarlo a tu cuenta.</CardDescription>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="brand">Marca</FieldLabel>
              <Input id="brand" name="brand" value={vehicleData.brand} onChange={handleChange} placeholder="Toyota" />
            </Field>

            <Field>
              <FieldLabel htmlFor="model">Modelo</FieldLabel>
              <Input id="model" name="model" value={vehicleData.model} onChange={handleChange} placeholder="Corolla" />
            </Field>

            <Field>
              <FieldLabel htmlFor="year">Año</FieldLabel>
              <Input
                id="year"
                type="number"
                name="year"
                value={vehicleData.year || ""}
                onChange={handleChange}
                placeholder="2023"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="licensePlate">Placa</FieldLabel>
              <Input
                id="licensePlate"
                name="licensePlate"
                value={vehicleData.licensePlate}
                onChange={handleChange}
                placeholder="ABC-123"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="mileage">Kilometraje</FieldLabel>
              <Input
                id="mileage"
                type="number"
                name="mileage"
                value={vehicleData.mileage || ""}
                onChange={handleChange}
                placeholder="48000"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="fuelLevel">Nivel de combustible (%)</FieldLabel>
              <Input
                id="fuelLevel"
                type="number"
                min={0}
                max={100}
                name="fuelLevel"
                value={vehicleData.fuelLevel || ""}
                onChange={handleChange}
                placeholder="50"
              />
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="additionalObservations">Observaciones adicionales</FieldLabel>
              <textarea
                id="additionalObservations"
                name="additionalObservations"
                value={vehicleData.additionalObservations}
                onChange={(event) =>
                  setVehicleData((prev) => ({
                    ...prev,
                    additionalObservations: event.target.value,
                  }))
                }
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-24 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2"
                placeholder="Ej. Presenta vibracion al frenar"
              />
            </Field>
          </FieldGroup>

          <div className="mt-6 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="button" onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterVehicleModal;
