import React from 'react';
import { Link } from 'react-router-dom';

export default ({ title }) => (
  <div className="Header">
    <Link to="/">{'✝️ '}</Link>
    {title}
  </div>
);
