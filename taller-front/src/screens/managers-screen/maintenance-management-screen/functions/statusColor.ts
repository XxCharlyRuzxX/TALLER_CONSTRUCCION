import { MaintenanceStatus } from "../../../../interfaces/MaintenanceManager";
import Colors from "../../../../utils/Colors";

export const getStatusColor = (status: MaintenanceStatus) => {
  switch (status) {
    case MaintenanceStatus.PENDING:
      return Colors.HighlightRed;
    case MaintenanceStatus.IN_PROGRESS:
      return Colors.HighlightOrange;
    case MaintenanceStatus.COMPLETED:
      return Colors.HighlightGreen;
    default:
      return Colors.Black;
  }
};