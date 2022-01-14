import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import App from '../App';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  global.localStorage.clear();
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
    container
  );
});

test.each([
  ['mainLang-F', 'F', 'E'],
  ['subLang-F', 'K', 'F'],
])('updates local storage by %s', (testid, main, sub) => {
  render(
    <MemoryRouter initialEntries={['/창세기/1/lang']}>
      <App />
    </MemoryRouter>,
    container
  );

  expect(global.localStorage.mainLang).toBe(undefined);
  expect(global.localStorage.subLang).toBe(undefined);

  act(() => {
    const button = document.querySelector(`[data-testid=${testid}]`);
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(global.localStorage.mainLang).toBe(main);
  expect(global.localStorage.subLang).toBe(sub);
});
