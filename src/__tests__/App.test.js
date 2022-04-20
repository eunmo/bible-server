import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from '../App';

beforeEach(() => {
  global.localStorage.clear();
});

afterEach(() => {
  global.localStorage.clear();
});

test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});

test.each([
  ['mainLang-F', 'F', 'E'],
  ['subLang-F', 'K', 'F'],
])('updates local storage by %s', (testid, main, sub) => {
  render(
    <MemoryRouter initialEntries={['/창세기/1/lang']}>
      <App />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByTestId(testid));

  expect(global.localStorage.mainLang).toBe(main);
  expect(global.localStorage.subLang).toBe(sub);
});
