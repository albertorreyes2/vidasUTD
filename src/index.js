import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConfigProvider } from 'antd';

import esES from 'antd/es/locale/es_ES';

ReactDOM.render(
  <ConfigProvider locale={esES}>
    <App />
  </ConfigProvider>,
  document.getElementById('root')
);