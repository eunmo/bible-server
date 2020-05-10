import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Header from './header';
import Context from './context';
import { langs } from './data';

export default ({ match }) => {
  const { mainLang, setMainLang, subLang, setSubLang } = useContext(Context);

  const { book: bookname, chapter } = match.params;
  const backUrl = `/${bookname}/${chapter}`;
  const backName = `${bookname} ${chapter}장으로 돌아가기`;

  return (
    <div>
      <Header title="언어설정" />
      <div className="vertical-buffer" />
      {langs.map((lang) => (
        <div key={lang.abbr} className="lang-grid">
          <div>{lang.name}</div>
          <div
            className={`lang ${mainLang === lang.abbr ? 'lang-selected' : ''}`}
            onClick={() => setMainLang(lang.abbr)}
            data-testid={`mainLang-${lang.abbr}`}
          >
            주언어
          </div>
          <div
            className={`lang ${subLang === lang.abbr ? 'lang-selected' : ''}`}
            onClick={() => setSubLang(lang.abbr)}
            data-testid={`subLang-${lang.abbr}`}
          >
            부언어
          </div>
        </div>
      ))}
      <div className="vertical-buffer" />
      <div className="header">
        <Link to={backUrl}>{backName}</Link>
      </div>
    </div>
  );
};
