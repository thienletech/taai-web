import React, { useEffect, useRef } from 'react';
import { Box, Container } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '@/app/store';
import TickerSelect from '@/views/ticker-select/TickerSelect';
import { tickerSelectActions } from '@/views/ticker-select/ticker-select.slice';
import TickerInfo from '@/views/ticker-info/TickerInfo';
import TickerChart from '@/views/ticker-chart/TickerChart';
import ChartInfo from '@/views/chart-info/ChartInfo';
import AnalysisInfo from '@/views/ticker-info/AnalysisInfo';
import { useLocation } from 'react-router-dom';
import ROUTES from '@/routes/route';
import AppStoreLink from '@/views/app-store/AppStore';

const Home = () => {
  const mode = useAppSelector((state) => state.userReducer.mode) ?? 'dark';
  const dispatch = useAppDispatch();
  const { hash } = useLocation();
  const tickerChartRef = useRef<HTMLElement>(null);
  const chartInfoRef = useRef<HTMLElement>(null);
  const analysisInfoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (hash === ROUTES.tickerChart.hash) {
      tickerChartRef?.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === ROUTES.chartInfo.hash) {
      chartInfoRef?.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === ROUTES.analysisInfo.hash) {
      analysisInfoRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  useEffect(() => {
    dispatch(tickerSelectActions.getTickers(''));
  }, []);

  return (
    <Box ref={tickerChartRef}>
      <Container maxWidth={false} sx={{ paddingTop: 2, paddingBottom: 2 }} className={mode === 'dark' ? 'dark' : ''}>
        <TickerSelect />
        <TickerInfo />
        <TickerChart />
      </Container>

      <Box ref={analysisInfoRef}>
        <AnalysisInfo />
      </Box>

      <Box ref={chartInfoRef}>
        <ChartInfo />
      </Box>
      <Container>
        <AppStoreLink></AppStoreLink>
      </Container>
    </Box>
  );
};

export default Home;
