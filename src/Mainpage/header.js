import React from 'react'
import logo from './logo.svg'
import {Image, MenuItem, Glyphicon, Navbar, NavItem, Nav, NavDropdown } from 'react-bootstrap'
import AuthService from '../Utils/Authservice'


class Header extends React.Component{
  static contextTypes = {
  router: React.PropTypes.object
}

  static propTypes = {
    auth : React.PropTypes.instanceOf(AuthService)
  }
logout(){
//  console.log("profile: ",localStorage.profile);
  this.props.auth.logout();
  this.context.router.push('/login');
}
render(){
  let children = null;
  if (this.props.children) {
    children = React.cloneElement(this.props.children, {
      auth: this.props.auth //sends auth instance from route to children
    })}
return (
<div>
  <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Image src={logo} responsive />
          <h5>Personal Healthcare Assist</h5>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
                <NavItem><Glyphicon glyph="envelope"/></NavItem>
                    <NavDropdown id="notifs" eventKey={3} title="Notifications">
                        <MenuItem eventKey={3.1}>No new notifications</MenuItem>

                    </NavDropdown>
                <NavItem eventKey={0} onClick={this.logout.bind(this)}> Logout </NavItem>
            </Nav>
          </Navbar.Collapse>
  </Navbar>
  <div id="content-wrapper">{children}</div>
</div>
)
}
}

export default Header
