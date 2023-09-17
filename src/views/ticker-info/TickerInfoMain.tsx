import { formatNumber, getPriceProps } from '@/utils.ts/common';
import { Box, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

export default function TickerInfoMain() {
  const theme = useTheme();
  const { market, tickerInfo } = useSelector((state: any) => state.tickerInfoReducer);
  const change = tickerInfo?.close - tickerInfo?.reference;
  const changePercent = (change / tickerInfo?.reference) * 100;
  const { color } = getPriceProps(theme, tickerInfo?.close, tickerInfo?.reference, market);

  return (
    <Box
      sx={{
        marginTop: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h3' color={color}>
        {formatNumber(tickerInfo?.close, 1)}
      </Typography>
      <Typography variant='h6' color={color}>
        {`${formatNumber(change, 1)} (${formatNumber(changePercent, 1)}%)`}
      </Typography>
      <Typography variant='h6' color={theme.palette.text.primary}>
        {tickerInfo?.date}
      </Typography>
    </Box>
  );
}
