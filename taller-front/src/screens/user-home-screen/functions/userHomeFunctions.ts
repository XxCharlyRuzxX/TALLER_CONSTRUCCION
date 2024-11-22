import { ClientVehicle } from "../../../interfaces/ClientVehicle";
import { UserAccount } from "../../../interfaces/UserAccount";
import { getClientVehiclesByClientId } from "../../../services/vehicleService";

;

export const loadClientVehicles = async (userId: number): Promise<ClientVehicle[]> => {
  try {
    const fetchedVehicles = await getClientVehiclesByClientId(userId);
    return fetchedVehicles;
  } catch (err) {
    console.error("Error al cargar los vehículos:", err);
    throw new Error("Error al cargar los vehículos");
  }
};

export const updateClientVehicles = async (user: UserAccount, setVehicles: React.Dispatch<React.SetStateAction<ClientVehicle[]>>) => {
  try {
    const vehicles = await loadClientVehicles(user.userId);
    setVehicles(vehicles);
  } catch (err) {
    console.error("Error al actualizar los vehículos:", err);
  }
};
