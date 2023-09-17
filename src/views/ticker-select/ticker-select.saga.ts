import { call, put, takeLatest } from 'redux-saga/effects';
import { tickerSelectActions } from './ticker-select.slice';
import { showApiError } from '@/utils.ts/common';
import stockApi, { StockItemResponse } from '@/api/stock-api';
import { ApiResponse } from '@/api/client';
import { DEFAULT_SELECTED_OPTION } from '@/constants/common';
import { tickerInfoActions } from '../ticker-info/ticker-info.slice';

function* handleGetTickers(action: any) {
  try {
    const res: ApiResponse = yield call(stockApi.searchTicker, action.payload);
    yield put(
      tickerSelectActions.getTickersSuccess({
        data: res.data,
        query: action.payload,
      })
    );
  } catch (error) {
    showApiError();
    yield put(tickerSelectActions.getTickersFailed(error));
  }
}

function* handleGetTickersSuccess(action: any) {
  const options = Object.entries<StockItemResponse>(action.payload.data).map(([index, value]) => {
    const ticker = value.ticker;
    const market = value.market ? ` (${value.market})` : '';
    const name = value.name ? ` - ${value.name}` : '';
    return {
      value: ticker,
      label: `${ticker}${market}${name}`,
      market: value.market,
    };
  });
  yield put(tickerSelectActions.setOptions(options));
}

function* handleGetTickersFailed(action: {}) {}

function* handleSetOptions(action: any) {
  yield put(tickerSelectActions.setSelectedOption(DEFAULT_SELECTED_OPTION));
}

function* handleSetSelectedOption(action: any) {
  yield put(
    tickerInfoActions.getInfo({
      ticker: action.payload.value,
      market: action.payload.market,
    })
  );
}

export default function* tickerSelectSaga() {
  yield takeLatest(tickerSelectActions.getTickers.type, handleGetTickers);
  yield takeLatest(tickerSelectActions.getTickersSuccess.type, handleGetTickersSuccess);
  yield takeLatest(tickerSelectActions.getTickersFailed.type, handleGetTickersFailed);
  yield takeLatest(tickerSelectActions.setOptions.type, handleSetOptions);
  yield takeLatest(tickerSelectActions.setSelectedOption.type, handleSetSelectedOption);
}
