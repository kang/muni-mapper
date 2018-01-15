import React from 'react';
import ReactDOM from 'react-dom';
import VehicleMapper from './VehicleMapper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VehicleMapper />, div);
});
