import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import Context from './context';
import { books, langs } from './data';

const get = (url, callback) => {
  fetch(url)
    .then((response) => response.json())
    .then(callback);
};

export default ({ match }) => {
  const { mainLang, subLang } = useContext(Context);
  const [verses, setVerses] = useState([]);
  const [trans, setTrans] = useState([]);
  const [selected, setSelected] = useState(-1);

  const { params, url } = match;
  const { book: bookname, chapter } = params;
  const book = books[bookname];

  useEffect(() => {
    get(`/${mainLang}/${book.index}.${chapter}`, setVerses);
    get(`/${subLang}/${book.index}.${chapter}`, setTrans);
  }, [book, chapter, mainLang, subLang]);

  const title = `${book.name} ${chapter}장`;
  const version = langs[0];
  const toggle = (index) => {
    setSelected(index === selected ? -1 : index);
  };

  return (
    <div>
      <div className="flex-container flex-container-space-between">
        <div className="header">{title}</div>
        <div>
          <Link to={`${url}/lang`}>{version.name}</Link>
        </div>
      </div>
      <div className="vertical-buffer" />
      {verses.map((verse, index) => (
        <div key={verse} className="verse-grid" onClick={() => toggle(index)}>
          <div className="index">{index + 1}</div>
          <div className="text">
            <div>{verse}</div>
            <div className="sub">{selected === index && trans[index]}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
