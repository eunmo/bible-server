import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';

import Books from '../Books';

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

const renderBooks = () => {
  render(
    <MemoryRouter>
      <Books />
    </MemoryRouter>,
    container
  );
};

test('renders without crashing', () => {
  renderBooks();
});

test('renders all links', () => {
  renderBooks();
  expect(document.querySelectorAll('a').length).toBe(66 + 2);
});
