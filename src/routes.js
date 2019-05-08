import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Books from './books';
import Chapters from './chapters';
import Verses from './verses';
import Langs from './langs';

const Routes = (props) => (
  <BrowserRouter>
    <div className="flex-container">
			<div className="flex-1 hide-mobile" />
			<div className="flex-1">
  	    <Switch>
	        <Route path="/:book/:chapter/lang" component={Langs} />
	        <Route path="/:book/:chapter" component={Verses} exact={true}/>
	        <Route path="/:book" component={Chapters} exact={true}/>
  	      <Route path="/" component={Books} exact={true}/>
	      </Switch>
			</div>
			<div className="flex-1 hide-mobile" />
    </div>
  </BrowserRouter>
);

export default Routes;

