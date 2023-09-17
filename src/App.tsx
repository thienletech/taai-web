import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, styled } from '@mui/material';
import Routing from '@/routes/Routing';
import AppHeader from '@/components/layout/AppHeader';
import AppFooter from '@/components/layout/AppFooter';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import bg from '@/assets/bg.jpg';

const Background = styled('div')(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    background: theme.palette.background.primary,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.4,
    zIndex: -1,
  },
}));

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Background>
        <AppHeader />
        <Routing />
        <AppFooter />
        <ToastContainer newestOnTop />
      </Background>
    </BrowserRouter>
  );
};

export default App;
