import { Box, useTheme } from '@mui/material';
import TickerInfoItem from './TickerInfoItem';
import { useSelector } from 'react-redux';
import { formatNumber, getPriceProps } from '@/utils.ts/common';

export default function TickerInfoLeft() {
  const theme = useTheme();
  const { market, tickerInfo } = useSelector((state: any) => state.tickerInfoReducer);
  const { color } = getPriceProps(theme, tickerInfo?.close, tickerInfo?.reference, market);

  return (
    <Box
      sx={{
        marginTop: 1,
        flexGrow: 1,
      }}
    >
      <TickerInfoItem title='Mở cửa' value={formatNumber(tickerInfo?.open, 1)} valueColor={color} />
      <TickerInfoItem title='Cao nhất' value={formatNumber(tickerInfo?.high, 1)} valueColor={color} />
      <TickerInfoItem title='Thấp nhất' value={formatNumber(tickerInfo?.low, 1)} valueColor={color} />
      <TickerInfoItem title='Đóng của' value={formatNumber(tickerInfo?.close, 1)} valueColor={color} />
    </Box>
  );
}
