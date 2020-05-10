import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Books from './books';
import Chapters from './chapters';
import Verses from './verses';
import Langs from './langs';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/:book/:chapter/lang" component={Langs} />
      <Route path="/:book/:chapter" component={Verses} exact />
      <Route path="/:book" component={Chapters} exact />
      <Route path="/" component={Books} exact />
    </Switch>
  </BrowserRouter>
);

export default Routes;
