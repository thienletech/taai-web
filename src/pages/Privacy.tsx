import React from 'react';
import { Container, useTheme } from '@mui/material';
import { useAppSelector } from '@/app/store';
import PrivacyPolicy from '@/views/privacy/Policy';

const Privacy = () => {
  const mode = useAppSelector((state) => state.userReducer.mode) ?? 'dark';
  return (
    <Container className={mode === 'dark' ? 'dark' : ''}>
      <PrivacyPolicy></PrivacyPolicy>
    </Container>
  );
};

export default Privacy;
