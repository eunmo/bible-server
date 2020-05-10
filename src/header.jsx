import React from 'react';
import { Link } from 'react-router-dom';

export default ({ title }) => (
  <div className="Header flex-container">
    <Link to="/">
      <div>✝️</div>
    </Link>
    <div className="text-center">{title}</div>
  </div>
);
