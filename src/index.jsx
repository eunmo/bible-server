import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';
import './style.css';

ReactDOM.render(
  <div className="flex-container">
    <div className="flex-1 hide-mobile" />
    <div className="flex-1">
      <Routes />
    </div>
    <div className="flex-1 hide-mobile" />
  </div>,
  document.getElementById('root')
);
