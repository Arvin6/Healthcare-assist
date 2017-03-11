import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Notfound from './notfound'
import {Router, Route, Link, browserHistory} from 'react-router'

ReactDOM.render(
  <Router history={browserHistory}>
      <Route path="/" component={App} />
      <Route path="test" component={Test} />
      <Route path="*" component={Notfound}/>
  </Router>  ,
  document.getElementById('root')

);
