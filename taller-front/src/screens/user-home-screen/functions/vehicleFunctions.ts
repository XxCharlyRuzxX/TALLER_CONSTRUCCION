import { ClientVehicleDTO } from "../../../services/interfaces/VehicleInterfaces";
import { registerVehicle } from "../../../services/vehicleService";

export const registerNewVehicle = async (vehicleData: ClientVehicleDTO) => {
  try {
    await registerVehicle(vehicleData);
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Error al registrar el vehículo");
  }
};
