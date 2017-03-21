import React from 'react'
import {Link} from 'react-router'
import AuthService from './Utils/Authservice'

class Logout extends React.Component {
  static propTypes = {
   auth: React.PropTypes.instanceOf(AuthService)
 }
render(){
  const auth=this.props.auth;
  //console.log("---",localStorage);
  auth.logout();
  return(
    <div className="container">
    <div className="panels">
    <p className="panel-elements">Logged out</p>
    <Link to='/login'>Login again</Link>
    </div>
    </div>
  )
}
}
export default Logout;
