import React, { useEffect, useMemo, useState } from 'react';

import Context from './context';
import Routes from './Routes';
import './style.css';

export default function App() {
  const [mainLang, setMainLang] = useState(localStorage.mainLang ?? 'K');
  const [subLang, setSubLang] = useState(localStorage.subLang ?? 'E');

  useEffect(() => {
    localStorage.mainLang = mainLang;
    localStorage.subLang = subLang;
  }, [mainLang, subLang]);

  const value = useMemo(
    () => ({
      mainLang,
      setMainLang,
      subLang,
      setSubLang,
    }),
    [mainLang, subLang]
  );

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
}
