import React from 'react';
import { AppThemeProvider } from './themes/AppThemeProvider';
import ReactDOM from 'react-dom/';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import './main.css';

ReactDOM.render(
  <Provider store={store}>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </Provider>,
  document.getElementById('root')
);
