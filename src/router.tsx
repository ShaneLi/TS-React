import * as React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './component/indexPage';

export default ({ history }) => {
  return (
    <Router history={ history }>
      <Route path="/" components={ IndexPage }/>
    </Router>
  );
};
