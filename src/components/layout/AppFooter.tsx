import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Icon, Theme, useMediaQuery, useTheme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ROUTES from '@/routes/route';
import { useNavigate } from 'react-router-dom';

export default function AppFooter() {
  const theme = useTheme();
  const smMatch = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  return (
    <Container component='footer' sx={{ marginTop: 2 }} maxWidth={false}>
      <Divider sx={{ background: theme.palette.grey[200] }} />
      {smMatch && (
        <Box
          sx={{
            py: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <Typography variant='body2' color={theme.palette.text.secondary}>
            Copyright © {new Date().getFullYear()} AI Chứng Khoán - Technical Analysis AI (TAAI)
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography
              variant='body2'
              color={theme.palette.text.secondary}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}
              onClick={() => {
                window.location.href = `mailto:admin@aichungkhoan.info?subject=Contact Form Submission`;
              }}
            >
              <Icon sx={{ fontSize: '1.2rem', paddingRight: 3 }}>
                <EmailIcon />
              </Icon>
              {'admin@aichungkhoan.info'}
            </Typography>
            <Typography
              variant='body2'
              color={theme.palette.text.secondary}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                marginLeft: 2,
              }}
              onClick={() => {
                navigate(ROUTES.policy);
              }}
            >
              {'Chính sách bảo mật'}
            </Typography>
          </Box>
        </Box>
      )}
      {!smMatch && (
        <Box
          sx={{
            py: 1,
            display: { xs: 'block', sm: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant='body2'
            color={theme.palette.text.secondary}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
            onClick={() => {
              console.log('hello');
              window.location.href = `mailto:admin@aichungkhoan.info?subject=Contact Form Submission`;
            }}
          >
            <Icon sx={{ fontSize: '1.2rem', paddingRight: 3 }}>
              <EmailIcon />
            </Icon>
            {'admin@aichungkhoan.info'}
          </Typography>
          <Typography
            variant='body2'
            color={theme.palette.text.secondary}
            sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
          >
            Copyright © {new Date().getFullYear()} AI Chứng Khoán (TAAI)
          </Typography>
        </Box>
      )}
    </Container>
  );
}
