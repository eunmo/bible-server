import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import data from './data';

export default class Langs extends Component {
  constructor(props) {
    super(props);

    const bookname = this.props.match.params.book;
    const chapter = this.props.match.params.chapter;

    const backUrl = ['', bookname, chapter].join('/');
    const backName = bookname + ' ' + chapter + '장으로 돌아가기';

    var langs = window.bibleLang;

    if (langs === undefined || langs === '') {
      langs = ['K', 'E'];
      window.bibleLang = 'K_E';
    } else {
      langs = langs.split('_');
    }

    this.state = { langs: langs, backUrl: backUrl, backName: backName };

    this.setLang = this.setLang.bind(this);
  }

  render() {
    const style = {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr',
      gridColumnGap: '3px',
      marginBottom: '5px'
    };

    return (
      <div>
        <div className="header">언어설정</div>
        {data.langs.map(lang => (
          <div key={lang.abbr} style={style}>
            <div>{lang.name}</div>
            <div
              onClick={() => this.setLang(0, lang.abbr)}
              style={this.getStyle(0, lang.abbr)}
            >
              주언어
            </div>
            <div
              onClick={() => this.setLang(1, lang.abbr)}
              style={this.getStyle(1, lang.abbr)}
            >
              부언어
            </div>
          </div>
        ))}
        <div className="header" style={{ marginTop: '5px' }}>
          <Link to={this.state.backUrl}>{this.state.backName}</Link>
        </div>
      </div>
    );
  }

  getStyle(index, abbr) {
    var style = {
      color: 'rgb(76, 217, 0)',
      textAlign: 'center'
    };

    if (this.state.langs[index] === abbr) {
      style.color = 'black';
    }

    return style;
  }

  setLang(index, abbr) {
    const langs = this.state.langs;
    var newLangArray = [langs[0], langs[1]];
    newLangArray[index] = abbr;

    window.bibleLang = newLangArray.join('_');
    this.setState({ langs: newLangArray });
  }
}
