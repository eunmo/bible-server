import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import data from './data';

export default class Verses extends Component {
  constructor(props) {
    super(props);

    const bookname = this.props.match.params.book;
    const chapter = this.props.match.params.chapter;
    const book = data.books.find(a => a.name === bookname);
    const bookIndex = data.books.indexOf(book) + 1;

    var langs = window.bibleLang;

    if (langs === undefined || langs === '') {
      langs = ['K', 'E'];
      window.bibleLang = 'K_E';
    } else {
      langs = langs.split('_');
    }

    this.state = {
      book: book,
      bookIndex: bookIndex,
      chapter: chapter,
      verses: [],
      trans: [],
      mainVersion: langs[0],
      subVersion: langs[1],
      selectedChapter: null
    };

    this.showTrans = this.showTrans.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  render() {
    const title = this.state.book.name + ' ' + this.state.chapter + '장';
    const version = data.langs.find(a => a.abbr === this.state.mainVersion);

    const style = {
      display: 'grid',
      gridTemplateColumns: '30px 1fr',
      gridColumnGap: '3px'
    };

    return (
      <div>
        <div className="flex-container flex-container-space-between">
          <div className="header">{title}</div>
          <div>
            <Link to={this.props.match.url + '/lang'}>{version.name}</Link>
          </div>
        </div>
        <div className="vertical-buffer" />
        {this.state.verses.map((verse, index) => (
          <div key={index} style={style}>
            <div className="index">{index + 1}</div>
            <div className="text" onClick={() => this.showTrans(index)}>
              <div>{verse}</div>
              <div className="sub">
                {this.state.selectedChapter === index &&
                  this.state.trans[index]}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  showTrans(index) {
    const i = this.state.selectedChapter === index ? null : index;
    this.setState({ selectedChapter: i });
  }

  fetch() {
    const that = this;
    const url = [
      '',
      'read',
      this.state.mainVersion,
      this.state.subVersion,
      this.state.bookIndex,
      this.state.chapter
    ].join('/');

    fetch(url)
      .then(response => response.json())
      .then(data => {
        that.setState({ verses: data.main, trans: data.sub });
      });
  }
}
