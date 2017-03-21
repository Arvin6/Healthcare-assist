import React,{PropTypes as T} from 'react'
import logo from './Mainpage/logo.svg'
import {Button,Image} from 'react-bootstrap'
import AuthService from './Utils/Authservice'

class LoginPage extends React.Component{

  static propTypes = {
   location: T.object,
   auth: T.instanceOf(AuthService)
 }
  render(){
    const {auth} = this.props;
    return(
      <div className="container">
          <div className="panels">
                    <div className="panel-elements">
                        <Image src={logo} responsive />
                        <blockquote>   <i>    What gets measured, gets managed  </i>  </blockquote>
                        </div>
                    <div className="panel-elements">
                        <Button bsStyle="success" bsSize="lg" onClick={auth.login.bind(this)}>Login</Button>
                   </div>
          </div>
      </div>
    )
  }
}


export default LoginPage;
