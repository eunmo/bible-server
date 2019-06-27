import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import data from './data';

export default class Chapters extends Component {
  render() {
    const bookname = this.props.match.params.book;
    const book = data.books.find(a => a.name === bookname);
    const chapters = Array.from(Array(book.chapters), (_, index) => index + 1);

    return (
      <div>
        <div className="header">{book.name}</div>
        <div className="vertical-buffer" />
        <div className="flex-container flex-container-wrap">
          {chapters.map(chapter => (
            <Link
              to={'/' + book.name + '/' + chapter}
              key={chapter}
              className="selector"
            >
              {chapter}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
