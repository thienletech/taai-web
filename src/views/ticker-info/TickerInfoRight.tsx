import { Box, useTheme } from '@mui/material';
import TickerInfoItem from './TickerInfoItem';
import { useSelector } from 'react-redux';
import { formatNumber } from '@/utils.ts/common';

export default function TickerInfoRight() {
  const theme = useTheme();
  const { tickerInfo } = useSelector((state: any) => state.tickerInfoReducer);
  return (
    <Box
      sx={{
        marginTop: 1,
        flexGrow: 1,
      }}
    >
      <TickerInfoItem
        title='KLGD'
        value={formatNumber(tickerInfo?.volume, 0)}
        valueColor={theme.palette.text.primary}
      />
      <TickerInfoItem
        title='Cao nhất 52 tuần'
        value={formatNumber(tickerInfo?.high52w, 1)}
        valueColor={theme.palette.text.primary}
      />
      <TickerInfoItem
        title='Thấp nhất 52 tuần'
        value={formatNumber(tickerInfo?.low52w, 1)}
        valueColor={theme.palette.text.primary}
      />
      <TickerInfoItem
        title='KLGD bình quân 52 tuần'
        value={formatNumber(tickerInfo?.volume52w, 0)}
        valueColor={theme.palette.text.primary}
      />
    </Box>
  );
}
