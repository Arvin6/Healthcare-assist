import React from 'react'
import AuthService from './Utils/Authservice'
import LoginPage from './login'
import Logout from './logout'
import Header from './Mainpage/header'
import Home from './Mainpage/Home'
import Notfound from './notfound'
import Feed from './feed/feedlayout'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

const auth = new AuthService('6Hg9fwEx8Xiad8zTuIiO0Z5rptJM2e5b', 'arvind95.auth0.com')

const requireAuth = (nextstate,replace) => {
  if(!auth.loggedIn()){
    console.log("Not logged in.");
    replace({pathname: '/login'})
  }
}

// If not logged out
const checkLogin = (nextstate, replace) => {
  if(!!auth.loggedIn()){
    console.log("Logged in");
    replace({pathname: '/home'})
  }
}


class Container extends React.Component{
  render(){
    let children = null;
   if (this.props.children) {
        children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance from route to children
     })}
      return(
          <div id="content-wrapper">{children}</div>
      )
  }
}

class App extends React.Component{
  render(){
  return (
  <Router history={browserHistory}>
          <Route path="/" component={Container} auth={auth}>
              <IndexRoute component={LoginPage} onEnter={checkLogin}/>
              <Route component={Header} onEnter={requireAuth}>
                    <Route path="home" component={Home}/>
                    <Route path="feed" component={Feed}/>
              </Route>
              <Route path="login" component={LoginPage} onEnter={checkLogin} />
              <Route path="logout" component={Logout} onEnter={requireAuth}/>
          </Route>
        <Route path="*" component={Notfound} onEnter={requireAuth}/>
  </Router>
)
}
}

export default App;
