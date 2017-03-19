import React from 'react'
import logo from './logo.svg'
import {Image, MenuItem, Glyphicon, Navbar, NavItem, Nav, NavDropdown,Button } from 'react-bootstrap'
//import {AuthService} from '../Utils/Authservice'
//import {Link} from 'react-router'

class Header extends React.Component{
render(){
  let children = null;
 if (this.props.children) {
   children = React.cloneElement(this.props.children, {
     auth: this.props.route.auth //sends auth instance from route to children
   })}
   console.log("-->",this.props.route.auth);
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
                <NavItem><Button> Logout </Button></NavItem>
            </Nav>
          </Navbar.Collapse>
  </Navbar>
  <div id="content-wrapper">{children}</div>
</div>
)
}
}

export default Header
