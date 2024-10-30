import { Avatar, Typography, Box } from '@mui/material';
import { PageItemPaper } from '../../components/PageItemPaper';
import { ExpandableTableCard } from './components/ExpandedTableCar';
import {Colors} from '../../utils/Colors';
import ConstructionIcon from '@mui/icons-material/Construction';

const cars = [
  { plate: 'XZT435', model: 'Honda Civic', status: 'Activo' },
  { plate: 'GHT235', model: 'Toyota Corolla', status: 'Inactivo' },
  { plate: 'HTY678', model: 'Ford Fiesta', status: 'Activo' },
  { plate: 'PLM543', model: 'Nissan Sentra', status: 'Activo' },
  { plate: 'NBV987', model: 'Chevrolet Cruze', status: 'Inactivo' },
];

const handleAddCar = () => {
  console.log('Agregar auto');
}

export default function MainScreen() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', backgroundColor: '#F5F1F1' }}>
      <Box sx={{ width: '100%', height: 100, backgroundColor: Colors.HighlightGray, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" sx={{ color: 'white' }}>
          BIENVENIDO A MI TALLER
        </Typography>
        <ConstructionIcon sx={{ color: Colors.HighlightRed, fontSize: 40, ml: 2 }} />
      </Box>

      <PageItemPaper sx={{ width: '80%', mt: 4 , minHeight: '400px'}}>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ width: 56, height: 56 }}>U</Avatar>
          <Box ml={2}>
            <Typography variant="h6">Nombre Usuario</Typography>
            <Typography variant="body2" color="textSecondary">Correo Electrónico Usuario</Typography>
          </Box>
        </Box>
        <Box sx={{ paddingTop: 2 }}>
        <ExpandableTableCard cars={cars} title="Mis Carros" onAddCar={handleAddCar}/>
          </Box>
      </PageItemPaper>
    </Box>
  );
}
