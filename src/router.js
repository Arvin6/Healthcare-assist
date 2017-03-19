import React from 'react';
//import App from './App';
import LoginPage from './login'
import Header from './Mainpage/header';
import Homecontent from './Mainpage/homecontent';
import Notfound from './notfound';
import Feed from './feed/feedlayout'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

const MyRouter = (props) => (
  <Router history={browserHistory}>

  <Route path="login" component={LoginPage}/>
          <Route path="/" component={Header}>
              <IndexRoute component={Homecontent} />
              <Route path="test" component={Feed} />
          </Route>
        <Route path="*" component={Notfound}/>
  </Router>
);

export default MyRouter;
