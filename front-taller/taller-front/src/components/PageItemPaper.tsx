import { Paper, PaperProps } from '@mui/material';

interface Props extends PaperProps {
  disableShadows?: boolean;
}

export const PageItemPaper = ({ disableShadows, children, ...res}: Props) => {
  return (
    <Paper
      {...res}
      sx={{
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        overflow: 'hidden',
        boxShadow: disableShadows ? 'none' : '0px 4px 10px 0px rgba(0, 0, 0, 0.03)',
        ...res.sx,
      }}
    >
      {children}
    </Paper>
  )
};
