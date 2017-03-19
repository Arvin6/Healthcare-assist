import React from 'react'
import logo from './Mainpage/logo.svg'
import {Grid,Row,Col,Checkbox,Form,FormGroup,ControlLabel,FormControl,Button,Image} from 'react-bootstrap'

class LoginPage extends React.Component{
  render(){
    return(
    <div className="panel">
      <Grid>
        <Row>
        <Col lg={6}>
              <Col xs={8} xsOffset={2}>
                  <Image src={logo} responsive />
              </Col>
              <Col xsHidden lgOffset={2} lg={10}>
                  <blockquote>
                  <i>
                  What gets measured, gets managed
                  </i>
                  </blockquote>
              </Col>
        </Col>
          <Col lg={6} md={6} sm={6} xs={12}>

              <div className="panel-elements">
                <Login />
             </div>
          </Col>
        </Row>
      </Grid>
    </div>
    )
  }
}


const Login = (props) => (
  <Form horizontal>
    <FormGroup controlId="formHorizontalEmail">
        <Col componentClass={ControlLabel} sm={2}> ID </Col>
        <Col sm={10}> <FormControl type="email" placeholder="Email/ Phone" /></Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
     <Col componentClass={ControlLabel} sm={2}>
       Password
     </Col>
     <Col sm={10}>
       <FormControl type="password" placeholder="Password" />
     </Col>
   </FormGroup>

   <FormGroup>
     <Col smOffset={2} sm={10}>
       <Checkbox>Remember me</Checkbox>
     </Col>
   </FormGroup>

   <FormGroup>
     <Col smOffset={2} sm={10}>
       <Button type="submit" bsStyle="success">
         Sign in
       </Button>
     </Col>
     </FormGroup>
  </Form>
)

export default LoginPage;
