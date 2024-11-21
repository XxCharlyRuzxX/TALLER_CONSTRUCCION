import PeopleIcon from "@mui/icons-material/People";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PaymentIcon from "@mui/icons-material/Payment";
import BarChartIcon from "@mui/icons-material/BarChart";
import Colors from "../../../utils/Colors";

export const sections = [
  {
    title: "Gestión de Usuarios",
    action: "Gestionar",
    icon: <PeopleIcon sx={{ fontSize: "8rem", color: Colors.HighlightBlue }} />,
    route: "/homeadmin/users",
  },
  {
    title: "Gestión de Vehículos",
    action: "Gestionar",
    icon: (
      <DirectionsCarIcon sx={{ fontSize: "8rem", color: Colors.DarkBlue }} />
    ),
    route: "/homeadmin/vehicles",
  },
  {
    title: "Diagnósticos y Mantenimiento",
    action: "Gestionar",
    icon: (
      <BuildCircleIcon sx={{ fontSize: "8rem", color: Colors.HighlightRed }} />
    ),
    route: "/homeadmin/diagnosis&maintenance",
  },
  {
    title: "Generación de Facturas",
    action: "Gestionar",
    icon: (
      <ReceiptIcon sx={{ fontSize: "8rem", color: Colors.HighlightGray }} />
    ),
    route: "",
  },
  {
    title: "Gestión de Pagos",
    action: "Gestionar",
    icon: (
      <PaymentIcon sx={{ fontSize: "8rem", color: Colors.HighlightOrange }} />
    ),
    route: "",
  },
  {
    title: "Generación de Reportes",
    action: "Consultar",
    icon: (
      <BarChartIcon sx={{ fontSize: "8rem", color: Colors.HighlightGreen }} />
    ),
    route: "",
  },
];
