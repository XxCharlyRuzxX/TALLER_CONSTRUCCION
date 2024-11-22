export interface ClientVehicleDTO {
  clientId: number;
  brand: string;
  model: string;
  year: number | string;
  licensePlate: string;
  mileage: number | string;
  fuelLevel: number | string;
  additionalObservations: string;
}

