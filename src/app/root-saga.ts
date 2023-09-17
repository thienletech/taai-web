import { all } from 'redux-saga/effects';

import tickerSelectSaga from '@/views/ticker-select/ticker-select.saga';
import tickerInfoSaga from '@/views/ticker-info/ticker-info.saga';
import tickerChartSaga from '@/views/ticker-chart/ticker-chart.saga';

export default function* rootSaga() {
  yield all([tickerSelectSaga(), tickerInfoSaga(), tickerChartSaga()]);
}
