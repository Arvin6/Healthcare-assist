import React from 'react'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'

function todatestring(dtstr){
  //console.log("Date type: ",typeof(dtstr));
  return dtstr.toDateString();
}

function datesbetween(date2){
  let today = new Date();
  let diff = date2.getTime() - today.getTime();
  return (diff<0)? 0 : (Math.ceil( diff / (1000*3600*24) ));
}


const Appointment = (props) => (
  <Grid>
    <Row>
      <div className="remainder">
      <Col lg={11} md={11} sm={11} xs={11}>
          {
            (props.date==='0')?
            <p>No appointments :)</p>
            :
            <p>Next appointment is on {todatestring(props.date)} (in {datesbetween(props.date)} days) </p>
          }
      </Col>
      <Col id="apt" lg={1} md={1} sm={1} xs={1}>
          <Glyphicon glyph="chevron-right"/>
      </Col>
      </div>
    </Row>
  </Grid>
)

export default Appointment
