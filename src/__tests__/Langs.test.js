import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Langs from '../Langs';
import Context from '../context';

let value;

beforeEach(() => {
  value = {
    mainLang: 'K',
    subLang: 'E',
    setMainLang: jest.fn(),
    setSubLang: jest.fn(),
  };
});

const renderLangs = () => {
  render(
    <MemoryRouter initialEntries={['/창세기/1/lang']}>
      <Context.Provider value={value}>
        <Routes>
          <Route path=":book/:chapter/lang" element={<Langs />} />
        </Routes>
      </Context.Provider>
    </MemoryRouter>
  );
};

test('renders without crashing', () => {
  renderLangs();
});

test.each([
  ['mainLang-F', [['F']], []],
  ['subLang-F', [], [['F']]],
])('updates %s', (testid, main, sub) => {
  renderLangs();

  fireEvent.click(screen.getByTestId(testid));

  expect(value.setMainLang.mock.calls).toEqual(main);
  expect(value.setSubLang.mock.calls).toEqual(sub);
});
