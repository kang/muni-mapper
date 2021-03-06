import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import VehicleMapper from './containers/VehicleMapper';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <VehicleMapper />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
