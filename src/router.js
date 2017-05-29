import React from 'react';
import { Router, Route,IndexRoute } from 'dva/router';
import IndexPage from './routes/IndexPage';
import SignIn from "./routes/SignIn.js";


import LogIn from "./routes/LogIn.js";


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {/*<IndexRoute component={IndexPage}/>*/}
      <Route path="/" component={IndexPage} />
      <Route path="/SignIn" component={SignIn} />
      <Route path="/LogIn" component={LogIn} />
    </Router>
  );
}

export default RouterConfig;
