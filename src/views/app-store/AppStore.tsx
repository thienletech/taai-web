import React, { useState } from 'react';
import qrcode from 'qrcode';
import { Box, Link } from '@mui/material';

const AppStoreLink = () => {
  const [qrCodeData, setQrCodeData] = useState('');
  const appUrl = 'https://play.google.com/store/apps/details?id=info.aichungkhoan';
  qrcode.toDataURL(appUrl).then((value: string) => setQrCodeData(value));
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <img src={qrCodeData} alt='QR code' />
        <Box sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Link href={appUrl}>
            <img
              alt='Get it on Google Play'
              src='https://play.google.com/intl/vi_vn/badges/static/images/badges/en_badge_web_generic.png'
              width={'180px'}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default AppStoreLink;
