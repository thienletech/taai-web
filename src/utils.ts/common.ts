import { Theme } from '@mui/material';
import { toast } from 'react-toastify';

const TOAST_OPTIONS = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showApiError = (msg = 'API error') => {
  toast.error(msg, TOAST_OPTIONS);
};

const roundNumber = (num: number, decimalPlaces: number) =>
  Math.round(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

const ceilingNumber = (num: number, decimalPlaces: number) =>
  Math.ceil(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

const floorNumber = (num: number, decimalPlaces: number) =>
  Math.floor(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);

const absMaxChangePercent = (martket: String) => {
  switch (martket) {
    case 'HSX':
      return 0.07;
    case 'HNX':
      return 0.1;
    case 'UPCOM':
      return 0.15;
    default:
      return 0.07;
  }
};

const ceilingPrice = (reference: number, maxChangePercent: number) => {
  return ceilingNumber(reference * (1 + maxChangePercent), 1);
};

const floorPrice = (reference: number, maxChangePercent: number) => {
  return floorNumber(reference * (1 - maxChangePercent), 1);
};

export const getPriceProps = (theme: Theme, close: number, reference: number, martket: string) => {
  const ref = roundNumber(reference, 1);
  const price = roundNumber(close, 1);
  const maxChangePercent = absMaxChangePercent(martket);
  const ceiling = ceilingPrice(ref, maxChangePercent);
  const floor = floorPrice(ref, maxChangePercent);

  let color = theme.palette.text.primary;
  switch (true) {
    case price >= ceiling:
      color = theme.palette.priceColor.ceiling;
      break;
    case price <= floor:
      color = theme.palette.priceColor.floor;
      break;
    case price > floor && price < ref:
      color = theme.palette.priceColor.decrease;
      break;
    case price < ceiling && price > ref:
      color = theme.palette.priceColor.increase;
      break;
    default:
      color = theme.palette.priceColor.reference;
      break;
  }
  return { ceiling, floor, color };
};

export const formatNumber = (num: number, maxFractionDigits: number = 0) => {
  return num?.toLocaleString('vi-VN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractionDigits,
  }) ?? "";
};
