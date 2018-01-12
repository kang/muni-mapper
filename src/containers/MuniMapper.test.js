import React from 'react';
import ReactDOM from 'react-dom';
import MuniMapper from './MuniMapper';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuniMapper />, div);
});
