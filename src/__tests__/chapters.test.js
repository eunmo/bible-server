import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import Chapters from '../chapters';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const renderChapters = (book) => {
  render(
    <MemoryRouter initialEntries={[`/${book}`]}>
      <Switch>
        <Route path="/:book" component={Chapters} />
      </Switch>
    </MemoryRouter>,
    container
  );
};

test('renders without crashing', () => {
  renderChapters('창세기');
});

test.each([
  ['창세기', 50],
  ['출애굽기', 40],
  ['레위기', 27],
])('renders %s', (book, count) => {
  renderChapters(book);
  expect(document.querySelector('.header').textContent).toBe(book);
  expect(document.querySelectorAll('a').length).toBe(count);
});
