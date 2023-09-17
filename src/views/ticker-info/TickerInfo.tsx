import { Box, Container, Grid, Theme, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TickerInfoMain from './TickerInfoMain';
import TickerInfoRight from './TickerInfoRight';
import TickerInfoLeft from './TickerInfoLeft';
import TickerInfoItem from './TickerInfoItem';
import { formatNumber, getPriceProps } from '@/utils.ts/common';

export default function TickerInfo() {
  const theme = useTheme();
  const initialFlexDirection = window.innerWidth < 768 ? 'column' : 'row';
  const [flexDirection, setFlexDirection] = useState(initialFlexDirection);
  const { market, tickerInfo } = useSelector((state: any) => state.tickerInfoReducer);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setFlexDirection('column');
      } else {
        setFlexDirection('row');
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { color } = getPriceProps(theme, tickerInfo?.close, tickerInfo?.reference, market);

  const smMatch = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const mdMatch = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        marginTop: 2,
        display: tickerInfo ? 'flex' : 'none',
        flexDirection: flexDirection,
      }}
    >
      {smMatch && (
        <Grid container spacing={2}>
          <Grid item xs={4} sx={{ maxWidth: '100px' }}>
            <TickerInfoMain />
          </Grid>
          <Grid item xs={4}>
            <TickerInfoItem title='Mở cửa' value={formatNumber(tickerInfo?.open, 1)} valueColor={color} />
            <TickerInfoItem title='Cao nhất' value={formatNumber(tickerInfo?.high, 1)} valueColor={color} />
            <TickerInfoItem title='Thấp nhất' value={formatNumber(tickerInfo?.low, 1)} valueColor={color} />
            <TickerInfoItem title='Đóng của' value={formatNumber(tickerInfo?.close, 1)} valueColor={color} />
          </Grid>
          <Grid item xs={4}>
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
              title='KLGDTB 52 tuần'
              value={formatNumber(tickerInfo?.volume52w, 0)}
              valueColor={theme.palette.text.primary}
            />
          </Grid>
        </Grid>
      )}

      {!smMatch && (
        <Grid container spacing={2}>
          <Grid item xs={12} >
            <TickerInfoMain />
            <TickerInfoItem title='Mở cửa' value={formatNumber(tickerInfo?.open, 1)} valueColor={color} />
            <TickerInfoItem title='Cao nhất' value={formatNumber(tickerInfo?.high, 1)} valueColor={color} />
            <TickerInfoItem title='Thấp nhất' value={formatNumber(tickerInfo?.low, 1)} valueColor={color} />
            <TickerInfoItem title='Đóng của' value={formatNumber(tickerInfo?.close, 1)} valueColor={color} />
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
              title='KLGDTB 52 tuần'
              value={formatNumber(tickerInfo?.volume52w, 0)}
              valueColor={theme.palette.text.primary}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
