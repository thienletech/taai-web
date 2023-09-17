import { fetch } from '@/api/client';

const stockApi = {
  searchTicker: async (query: string) => {
    const url = `/web/stocks/autocomplete?query=${query ?? ''}`;
    return fetch('get', url, {});
  },
  getStockInfo: async (ticker: string) => {
    const url = `/web/stock-prices/info?ticker=${ticker}`;
    return fetch('get', url, {});
  },
  getStockPrices: async (ticker: string) => {
    const url = `/web/stock-prices/prediction?ticker=${ticker}`;
    return fetch('get', url, {});
  },
};

export interface StockItemResponse {
  ticker: string;
  name: string;
  market: string;
}

export interface StockInfoResponse {
  ticker: string;
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  high52w: number;
  low52w: number;
  volume52w: number;
  totalVolume52w: number;
  totalCount52w: number;
  ceiling: number;
  floor: number;
  reference: number;
  recommendContent: string;
  recommendDate: Date;
  predictDate: Date;
}

export interface StockPriceItemResponse {
  ticker: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export default stockApi;
