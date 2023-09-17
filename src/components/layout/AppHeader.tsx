import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { IconButton, Link, Stack } from '@mui/material';
import ROUTES from '@/routes/route';
import lightLogo from '@/assets/taai-x-small-light.png';
import darkLogo from '@/assets/taai-x-small-dark.png';
import HeaderNavBar from './HeaderNavBar';
import TimerLabel from '@/components/timer/TimerLabel';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { userActions } from '@/views/user/user.slice';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const Header = styled('header')(({ theme }) => [
  {
    position: 'sticky',
    top: 0,
    transition: theme.transitions.create('top'),
    zIndex: theme.zIndex.appBar,
    boxShadow: `inset 0px -0px 0px ${theme.palette.grey[200]}`,
  },
]);

const HEIGHT = 40;

export default function AppHeader() {
  const theme = useTheme();
  const mode = useAppSelector((state) => state.userReducer.mode) ?? 'dark';
  const logo = mode == 'dark' ? darkLogo : lightLogo;
  const dispatch = useAppDispatch();

  return (
    <Header>
      <GlobalStyles
        styles={{
          ':root': {
            '--MuiDocs-header-height': `${HEIGHT}px`,
          },
        }}
      />
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          paddingTop: 2,
          paddingBottom: 2,
          alignItems: 'center',
          justifyItems: 'center',
          justifyContent: 'left',
          minHeight: HEIGHT,
        }}
      >
        <Box
          component={Link}
          href={ROUTES.home}
          aria-label='Go to homepage'
          sx={{
            lineHeight: 0,
            mr: 2,
            color: theme.palette.text.primary,
          }}
        >
          <img src={logo} alt='Home Icon' />
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'initial' } }}>
          <HeaderNavBar />
        </Box>
        <Box sx={{ ml: 'auto' }} />
        <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
          <TimerLabel />
          <IconButton onClick={() => dispatch(userActions.changeMode())}>
            <Brightness4Icon
              sx={{
                transition: 'transform 0.4s',
                transform: mode === 'dark' ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            />
          </IconButton>
        </Stack>
      </Container>
    </Header>
  );
}
