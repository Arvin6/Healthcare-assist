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
    <h4>You have Successfully Logged out</h4>
    <Link to='/login'>Login again</Link>
    </div>
  )
}
}
export default Logout;
