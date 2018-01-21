import * as React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './component/IndexPage';

export default ({ history }) => {
  return (
    <Router history={ history }>
      <Route path="/" render={props => <IndexPage {...props} />}/>
    </Router>
  );
};
