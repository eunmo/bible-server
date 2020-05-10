import React from 'react';
import { Link } from 'react-router-dom';

import { books } from './data';

export default ({ match }) => {
  const { book: bookname } = match.params;
  const book = books[bookname];
  const chapters = Array.from(Array(book.chapters), (_, i) => i + 1);

  return (
    <div>
      <div className="header">{book.name}</div>
      <div className="vertical-buffer" />
      <div className="flex-container flex-container-wrap">
        {chapters.map((chapter) => (
          <Link
            to={`/${book.name}/${chapter}`}
            key={chapter}
            className="selector"
          >
            {chapter}
          </Link>
        ))}
      </div>
    </div>
  );
};
