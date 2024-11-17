import React from "react";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
import { MaintenanceAdvance } from "../../../interfaces/MaintenanceAdvance";
import Colors from "../../../utils/Colors";

interface MaintenanceVehicleSectionProps {
  progresses: MaintenanceAdvance[];
}

const MaintenanceVehicleSection: React.FC<MaintenanceVehicleSectionProps> = ({ progresses }) => {
  return (
    <Paper sx={{ padding: 3 , backgroundColor: Colors.PrimaryGray}}>
      {progresses.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Fecha</b></TableCell>
              <TableCell><b>Descripción</b></TableCell>
              <TableCell><b>Imágenes</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {progresses.map((m) => (
              <TableRow key={m.idMaintenanceAdvance}>
                <TableCell>{new Date(m.date).toLocaleDateString()}</TableCell>
                <TableCell>{m.description}</TableCell>
                <TableCell>
                  {m.imagesAdvance.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Avance"
                      style={{ width: 50, height: 50, marginRight: 5 }}
                    />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>No hay avances de mantenimiento registrados.</Typography>
      )}
    </Paper>
  );
};

export default MaintenanceVehicleSection;
