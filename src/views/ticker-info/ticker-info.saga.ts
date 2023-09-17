import { call, put, takeLatest } from 'redux-saga/effects';
import { showApiError } from '@/utils.ts/common';
import stockApi from '@/api/stock-api';
import { ApiResponse } from '@/api/client';
import { tickerInfoActions } from './ticker-info.slice';
import { tickerChartActions } from '@/views/ticker-chart/ticker-chart.slice';

function* handleGetInfo({ payload }: any) {
  try {
    const res: ApiResponse = yield call(stockApi.getStockInfo, payload.ticker);
    yield put(tickerInfoActions.getInfoSuccess(res.data));
  } catch (error) {
    showApiError();
    yield put(tickerInfoActions.getInfoFailed(error));
  }
}

function* handleGetInfoSuccess({ payload }: any) {
  yield put(tickerInfoActions.setTickerInfo(payload));
}

function* handleGetInfoFailed(action: {}) {}

function* handleSetTickerInfo({ payload }: any) {
  yield put(tickerChartActions.getPrices({ ticker: payload.ticker }));
}

export default function* tickerInfoSaga() {
  yield takeLatest(tickerInfoActions.getInfo.type, handleGetInfo);
  yield takeLatest(tickerInfoActions.getInfoSuccess.type, handleGetInfoSuccess);
  yield takeLatest(tickerInfoActions.getInfoFailed.type, handleGetInfoFailed);
  yield takeLatest(tickerInfoActions.setTickerInfo.type, handleSetTickerInfo);
}
