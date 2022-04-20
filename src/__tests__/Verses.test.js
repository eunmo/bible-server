import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Verses from '../Verses';
import Context from '../context';

let calledUrls = null;

beforeEach(() => {
  calledUrls = [];
  jest.spyOn(global, 'fetch').mockImplementation((url) => {
    calledUrls.push(url);
    return Promise.resolve({
      ok: true,
      json: () => (url.startsWith('/E') ? ['A', 'B'] : ['a', 'b']),
    });
  });
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
      </Context.Provider>
    );
  });
};

test('renders without crashing', async () => {
  await renderChapters('창세기');
});

test('renders verses', async () => {
  await renderChapters('창세기');

  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('B')).toBeInTheDocument();
});

test('renders trans', async () => {
  await renderChapters('창세기');

  expect(screen.queryByText('a')).not.toBeInTheDocument();
  expect(screen.queryByText('b')).not.toBeInTheDocument();

  fireEvent.click(screen.getByText('A'));
  expect(screen.getByText('a')).toBeInTheDocument();
  expect(screen.queryByText('b')).not.toBeInTheDocument();

  fireEvent.click(screen.getByText('B'));
  expect(screen.queryByText('a')).not.toBeInTheDocument();
  expect(screen.getByText('b')).toBeInTheDocument();
});
