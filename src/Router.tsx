import * as React from 'react';
import {Route, Router} from "react-router";
import IndexPage from './component/IndexPage';

export default ({ history }) => {
  return (
    <Router history={ history }>
      <Route path="/" render={props => <IndexPage {...props} />}/>
    </Router>
  );
};
