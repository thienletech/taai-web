import React from 'react';
import { Box, Theme, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TickerBaseChart, { IOHLCData } from './TickerBaseChart';
import { timeParse } from 'd3-time-format';
import { StockPriceItemResponse } from '@/api/stock-api';
import { withSize } from 'react-financial-charts';
import { Opacity } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import Moment from 'moment';

const parseDate = timeParse('%Y-%m-%d');

const parseData = (prices: any, predictionOffset: number) => {
  const items = Object.entries<StockPriceItemResponse>(prices).map(([index, value]) => {
    let d = undefined;
    const date = parseDate(value.date);
    if (date === null) {
      d = new Date(Number(value.date));
    } else {
      d = new Date(date);
    }
    return {
      close: value.close,
      date: d,
      high: value.high,
      low: value.low,
      open: value.open,
      volume: value.volume,
    } as IOHLCData;
  });
  return items;
};

export default function TickerChart() {
  const theme = useTheme();
  const { predictionOffset, prices, ticker } = useSelector((state: any) => state.tickerChartReducer);
  const items = parseData(prices, predictionOffset);
  const offset = predictionOffset > 1 ? predictionOffset - 1 : predictionOffset;
  const predictionDate = items[offset]?.date ?? null;

  const smMatch = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const mdMatch = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const minHeight = mdMatch ? 600 : smMatch ? 400 : 200;

  const ChartWrapper = withSize({ style: { minHeight: minHeight } })(TickerBaseChart);
  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;

  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltipOpen = () => {
    setShowTooltip(true);
  };

  const handleTooltipClose = () => {
    setShowTooltip(false);
  };

  const { tickerInfo } = useSelector((state: any) => state.tickerInfoReducer);
  const updateDate = tickerInfo?.predictDate ? Moment(tickerInfo?.predictDate).format('DD/MM/YYYY') : null;

  return (
    <Box sx={{ position: 'relative', paddingTop: 1 }}>
      <Tooltip
        title={
          <Typography
            variant='body1'
            color={theme.palette.grey[100]}
            fontSize={14}
          >{`Cập nhập ngày ${updateDate}`}</Typography>
        }
        placement='left'
        arrow
        open={showTooltip}
        onClose={handleTooltipClose}
      >
        <InfoIcon
          onMouseEnter={handleTooltipOpen}
          onMouseLeave={handleTooltipClose}
          sx={{
            fontSize: '1.4rem',
            cursor: 'pointer',
            position: 'absolute',
            top: 15,
            right: 5,
          }}
        />
      </Tooltip>
      <Box
        sx={{
          marginTop: 4,
          background: theme.palette.background.chart,
          border: '1px solid',
          borderColor: theme.palette.divider,
          borderRadius: 1,
        }}
      >
        <ChartWrapper
          data={items}
          predictionDate={predictionDate}
          ticker={ticker}
          theme={theme}
          smMatch={smMatch}
          onReset={() => forceUpdate()}
        />
      </Box>
    </Box>
  );
}
