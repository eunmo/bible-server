import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import Langs from '../langs';
import Context from '../context';

let container;
let value;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);

  value = {
    mainLang: 'K',
    subLang: 'E',
    setMainLang: jest.fn(),
    setSubLang: jest.fn(),
  };
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const renderLangs = () => {
  render(
    <MemoryRouter initialEntries={['/창세기/1/lang']}>
      <Context.Provider value={value}>
        <Switch>
          <Route path="/:book/:chapter/lang" component={Langs} />
        </Switch>
      </Context.Provider>
    </MemoryRouter>,
    container
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

  act(() => {
    const button = document.querySelector(`[data-testid=${testid}]`);
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(value.setMainLang.mock.calls).toEqual(main);
  expect(value.setSubLang.mock.calls).toEqual(sub);
});
