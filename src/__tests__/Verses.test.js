import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Verses from '../Verses';
import Context from '../context';

let container = null;
let calledUrls = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  calledUrls = [];
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    calledUrls.push(url);
    return Promise.resolve({
      ok: true,
      json: () => (url.startsWith('/E') ? ['A', 'B'] : ['a', 'b']),
    });
  });
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const langContext = { mainLang: 'E', subLang: 'K' };

const renderChapters = async (book) => {
  await act(async () => {
    render(
      <Context.Provider value={langContext}>
        <MemoryRouter initialEntries={[`/${book}/1`]}>
          <Routes>
            <Route path=":book/:chapter" element={<Verses />} />
          </Routes>
        </MemoryRouter>
      </Context.Provider>,
      container
    );
  });
};

test('renders without crashing', async () => {
  await renderChapters('창세기');
});

test('renders verses', async () => {
  await renderChapters('창세기');

  const verses = document.querySelectorAll('.verse-grid');
  expect(verses.length).toBe(2);
  const expected = ['1A', '2B'];
  verses.forEach((v, i) => {
    expect(v.textContent).toBe(expected[i]);
  });
});

test('renders trans', async () => {
  await renderChapters('창세기');

  const verses = document.querySelectorAll('.verse-grid');
  act(() => {
    verses[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  let expected = ['1Aa', '2B'];
  verses.forEach((v, i) => {
    expect(v.textContent).toBe(expected[i]);
  });

  act(() => {
    verses[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expected = ['1A', '2Bb'];
  verses.forEach((v, i) => {
    expect(v.textContent).toBe(expected[i]);
  });
});
