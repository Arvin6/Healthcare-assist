import React from 'react'
import logo from './logo.svg'
import {Image, MenuItem, Glyphicon, Navbar, NavItem, Nav, NavDropdown } from 'react-bootstrap'

const Header = (props) => (
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
            </Nav>
          </Navbar.Collapse>
  </Navbar>
  <div id="content-wrapper">{props.children}</div>
</div>
)

export default Header
