import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { UserAccount } from "../../interfaces/UserAccount";
import { ClientVehicle } from "../../interfaces/ClientVehicle";
import ExpandableTableCard from "./components/ExpandedTableCar";
import RegisterVehicleModal from "./components/RegisterVehicleModal";
import { loadClientVehicles, updateClientVehicles } from "./functions/userHomeFunctions";
import UserHomeStats from "./components/UserHomeStats";
import UserHomeHeader from "./components/UserHomeHeader";

const CLIENT_THEME_KEY = "client-user-theme";

const UserHomePage: React.FC = () => {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [vehicles, setVehicles] = useState<ClientVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem(CLIENT_THEME_KEY) === "dark";
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem(CLIENT_THEME_KEY, darkMode ? "dark" : "light");

    return () => {
      document.documentElement.classList.remove("dark");
    };
  }, [darkMode]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/");
    } else {
      const parsedUser: UserAccount = JSON.parse(storedUser);
      setUser(parsedUser);
      loadVehicles(parsedUser);
    }
  }, [navigate]);

  const loadVehicles = async (user: UserAccount) => {
    setLoading(true);
    try {
      const fetchedVehicles = await loadClientVehicles(user.userId);
      setVehicles(fetchedVehicles);
    } catch (err) {
      console.error("Error al cargar los vehículos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCar = () => {
    setIsModalOpen(true);
  };

  const handleSaveVehicle = () => {
    if (user) {
      updateClientVehicles(user, setVehicles);
    }
    setIsModalOpen(false);
  };

  if (!user) return null;

  if (loading) {
    return (
      <main className="bg-background text-foreground flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground text-sm">Cargando vehiculos...</p>
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <UserHomeHeader
          user={user}
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode((previous) => !previous)}
        />

        <Card className="py-0">
          <CardContent className="flex items-center gap-3 p-5">
            <span className="inline-flex rounded-full border p-3">
              <User className="h-4 w-4" />
            </span>
            <div>
              <p className="font-semibold leading-tight">{user.userName}</p>
              <p className="text-muted-foreground text-sm">{user.accessCredentials.email}</p>
            </div>
          </CardContent>
        </Card>

        <UserHomeStats vehicles={vehicles} darkMode={darkMode} />

        <ExpandableTableCard
          cars={vehicles}
          title="Mis vehiculos"
          onAddCar={handleAddCar}
          darkMode={darkMode}
        />
      </div>

      <RegisterVehicleModal
        userAccount={user}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVehicle}
      />
    </main>
  );
};

export default UserHomePage;
