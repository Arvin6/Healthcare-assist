import React from 'react';
//import App from './App';
import AuthService from './Utils/Authservice'
import LoginPage from './login'
import Header from './Mainpage/header';
import Homecontent from './Mainpage/homecontent';
import Notfound from './notfound';
import Feed from './feed/feedlayout'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

const auth = new AuthService('6Hg9fwEx8Xiad8zTuIiO0Z5rptJM2e5b', 'arvind95.auth0.com')

const requireAuth = (nextstate,replace) => {
  if(!auth.loggedIn()){
    console.log("Not logged in.");
    replace({pathname: '/login'})
  }
}

const MyRouter = (props) => (
  <Router history={browserHistory}>
          <Route path="/" component={Header} auth={auth}>
              <IndexRoute component={Homecontent} />
              <Route path="login" component={LoginPage}/>
              <Route path="home" component={Homecontent} onEnter={requireAuth}/>
              <Route path="test" component={Feed} onEnter={requireAuth}/>
          </Route>
        <Route path="*" component={Notfound} onEnter={requireAuth}/>
  </Router>
);

export default MyRouter;
