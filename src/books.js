import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import data from './data';

export default class Books extends Component {

	render() {
		const testaments = this.divideTestaments();

		return (
			<div>
				{testaments.map(testament =>
					<div key={testament.name}>
						<div className="header">
							{testament.name}
						</div>
						<div className="vertical-buffer" />
						<div className="flex-container flex-container-wrap">
							{testament.books.map(book =>
								<Link to={'/' + book.name} key={book.abbr} className="selector">
									{book.abbr}
								</Link>
							)}
						</div>
						<div className="vertical-buffer" />
					</div>
				)}
			</div>
		);
	}

	divideTestaments() {
		return [
			{ name: '구약', books: data.books.slice(0, 39) },
			{ name: '신약', books: data.books.slice(39) }
		];
	}
}
