import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Books from '../Books';

const renderBooks = () => {
  render(
    <MemoryRouter>
      <Books />
    </MemoryRouter>
  );
};

test('renders without crashing', () => {
  renderBooks();
});

test('renders all links', () => {
  renderBooks();
  expect(screen.getAllByRole('link').length).toBe(66 + 2);
});
