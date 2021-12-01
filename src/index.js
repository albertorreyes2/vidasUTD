import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConfigProvider } from 'antd';

import { StateProvider } from './providers/StateProvider';
import reducer from './providers/reducer';

import esES from 'antd/es/locale/es_ES';

ReactDOM.render(
  <StateProvider reducer={reducer}>
    <ConfigProvider locale={esES}>
      <App />
    </ConfigProvider>
  </StateProvider>,
  document.getElementById('root')
);