import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxStore from '@redux';
import init from '@config/init';
import App from './app-local';
import './style/main.less';

init();
ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
