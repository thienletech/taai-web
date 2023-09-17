import { Box, Typography, useTheme } from '@mui/material';

interface TickerInfoItemProps {
  title: string;
  value: string;
  valueColor?: string;
}

export default function TickerInfoItem({ title, value, valueColor }: TickerInfoItemProps) {
  const theme = useTheme();
  const color = valueColor ?? theme.palette.text.primary;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1,
      }}
    >
      <Typography variant='h6' color={theme.palette.text.primary}>
        {title}
      </Typography>
      <Typography variant='h6' color={color}>
        {value}
      </Typography>
    </Box>
  );
}
