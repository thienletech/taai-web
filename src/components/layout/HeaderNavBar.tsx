import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Link } from '@mui/material';
import ROUTES from '@/routes/route';
import { useNavigate } from 'react-router-dom';

const Navigation = styled('nav')(({ theme }) => [
  {
    '& ul': {
      padding: 0,
      margin: 0,
      listStyle: 'none',
      display: 'flex',
    },
    '& li': {
      color: theme.palette.text.primary,
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightBold,
      '& > a, & > div': {
        display: 'inline-block',
        color: 'inherit',
        textDecoration: 'none',
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        '&:hover, &:focus': {
          backgroundColor: theme.palette.grey[50],
          color: theme.palette.grey[700],
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: 'initial',
          },
        },
      },
      '& > div': {
        cursor: 'default',
      },
    },
  },
]);

export default function HeaderNavBar() {
  const navRef = React.useRef<HTMLUListElement | null>(null);
  const navigate = useNavigate();
  return (
    <Navigation>
      <ul ref={navRef} role='menubar'>
        <li role='none'>
          <Link role='menuitem' href={ROUTES.home}>
            {'Trang chủ'}
          </Link>
        </li>
        <li role='none'>
          <Link
            role='menuitem'
            onClick={() => {
              navigate(ROUTES.tickerChart.location);
            }}
          >
            {'Biểu đồ'}
          </Link>
        </li>
        <li role='none'>
          <Link
            role='menuitem'
            onClick={() => {
              navigate(ROUTES.analysisInfo.location);
            }}
          >
            {'Phân tích'}
          </Link>
        </li>
        <li role='none'>
          <Link
            role='menuitem'
            onClick={() => {
              navigate(ROUTES.chartInfo.location);
            }}
          >
            {'Thông tin'}
          </Link>
        </li>
        <li role='none'>
          <Link role='menuitem' href={ROUTES.contact}>
            {'Liên hệ'}
          </Link>
        </li>
      </ul>
    </Navigation>
  );
}
