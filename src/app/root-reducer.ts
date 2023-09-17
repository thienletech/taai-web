import { combineReducers } from 'redux';

import tickerSelectReducer from '@/views/ticker-select/ticker-select.slice';
import userReducer from '@/views/user/user.slice';
import tickerInfoReducer from '@/views/ticker-info/ticker-info.slice';
import tickerChartReducer from '@/views/ticker-chart/ticker-chart.slice';

const rootReducer = combineReducers({
  tickerSelectReducer,
  tickerInfoReducer,
  tickerChartReducer,
  userReducer,
});

export default rootReducer;
