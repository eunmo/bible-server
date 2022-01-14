import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ title }) {
  return (
    <div className="Header">
      <Link to="/">{'✝️ '}</Link>
      {title}
    </div>
  );
}
