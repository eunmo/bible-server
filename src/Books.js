import { Link } from 'react-router-dom';

import Header from './Header';
import { testaments } from './data';

export default function Books() {
  return (
    <div>
      {testaments.map((testament) => (
        <div key={testament.name}>
          <Header title={testament.name} />
          <div className="vertical-buffer" />
          <div className="flex-container flex-container-wrap">
            {testament.books.map((book) => (
              <Link to={`/${book.name}`} key={book.abbr} className="selector">
                {book.abbr}
              </Link>
            ))}
          </div>
          <div className="vertical-buffer" />
        </div>
      ))}
    </div>
  );
}
