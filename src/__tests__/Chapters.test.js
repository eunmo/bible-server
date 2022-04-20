import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Chapters from '../Chapters';

const renderChapters = (book) => {
  render(
    <MemoryRouter initialEntries={[`/${book}`]}>
      <Routes>
        <Route path=":book" element={<Chapters />} />
      </Routes>
    </MemoryRouter>
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
  expect(screen.getAllByRole('link').length).toBe(count + 1);
  expect(screen.getByText(book)).toBeInTheDocument();
});
