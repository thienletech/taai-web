import { Box, Card, CardContent, CardHeader, Icon, Tooltip, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
import { useSelector } from 'react-redux';
import Moment from 'moment';

export default function AnalysisInfo() {
  const theme = useTheme();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltipOpen = () => {
    setShowTooltip(true);
  };

  const handleTooltipClose = () => {
    setShowTooltip(false);
  };

  const { tickerInfo } = useSelector((state: any) => state.tickerInfoReducer);
  const updateDate = tickerInfo?.recommendDate ? Moment(tickerInfo?.recommendDate).format('DD/MM/YYYY') : null;
  return (
    <Box>
      {tickerInfo?.recommendDate && (
        <Card
          sx={{
            background: theme.palette.background.chart,
            minWidth: 275,
            border: `1px solid ${theme.palette.grey[300]}`,
            borderRadius: theme.shape.borderRadius,
            margin: theme.spacing(3),
            padding: theme.spacing(2),
          }}
        >
          <CardHeader
            title={
              <div>
                {`Tư vấn bởi AI`}
                <Tooltip
                  title={
                    <Typography
                      variant='body1'
                      color={theme.palette.grey[100]}
                      fontSize={14}
                    >{`Cập nhập với ChatGPT ngày ${updateDate}`}</Typography>
                  }
                  placement='top'
                  arrow
                  open={showTooltip}
                  onClose={handleTooltipClose}
                >
                  <InfoIcon
                    onMouseEnter={handleTooltipOpen}
                    onMouseLeave={handleTooltipClose}
                    sx={{ fontSize: '1.4rem', cursor: 'pointer', marginLeft: 1, verticalAlign: 'top' }}
                  />
                </Tooltip>
              </div>
            }
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          />
          <CardContent>
            <Typography variant='h6' color={theme.palette.text.primary} gutterBottom sx={{ whiteSpace: 'pre-line' }}>
              {tickerInfo.recommendContent}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
