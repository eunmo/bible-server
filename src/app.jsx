import React, { useState, useEffect } from 'react';

import Context from './context';
import Routes from './routes';
import './style.css';

export default () => {
  const [mainLang, setMainLang] = useState(localStorage.mainLang ?? 'K');
  const [subLang, setSubLang] = useState(localStorage.subLang ?? 'E');
  const value = { mainLang, setMainLang, subLang, setSubLang };

  useEffect(() => {
    localStorage.mainLang = mainLang;
    localStorage.subLang = subLang;
  }, [mainLang, subLang]);

  return (
    <Context.Provider value={value}>
      <div className="flex-container">
        <div className="flex-1 hide-mobile" />
        <div className="flex-1">
          <Routes />
        </div>
        <div className="flex-1 hide-mobile" />
      </div>
    </Context.Provider>
  );
};
