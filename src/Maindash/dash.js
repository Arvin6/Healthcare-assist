import React from 'react'
import { Grid, Row, Col, Glyphicon, Button } from 'react-bootstrap'
// This is for fusioncharts
import Fusioncharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
charts(Fusioncharts)

class Dash extends React.Component{
  render(){
    var that = this;    //This thing took me a day to figure out, stupid JS.

    let piechart_config = {
      "id":"dashpie",
      "type":"pie3d",
      "dataFormat":"json",
      "enableMultiSlicing":"0",
      "width":"100%",
      "dataSource": this.props.pieCdata,
      "events":{
        "slicingStart": function(evts,sliceprop){
             if(sliceprop.slicedState===false){
                //console.log(sliceprop.data.categoryLabel, evts.sender.id);
                that.props.onslice(sliceprop.data.categoryLabel,evts.sender.id);
              }else{
                //console.log("y",evts.sender.id)
                that.props.onslice("",evts.sender.id)
              }}
            }};

          return (
          <Grid>
          <Row>
            <Col lgOffset={4} mdOffset={0} smOffset={0} lg={4} md={5} sm={6} xs={12}>
              <div className="dash">
                <ul>
                <li>  <Button className="btn btn-default btn-circle" bsSize="large" bsStyle="primary"> <Glyphicon glyph="user" /></Button>  </li>
                <li>  <Button className="btn btn-default btn-circle" bsSize="large" bsStyle="primary"> <Glyphicon glyph="cloud-download" /> </Button>  </li>
                <li>  <Button className="btn btn-default btn-circle" bsSize="large" bsStyle="primary"><Glyphicon glyph="plus-sign"/> </Button>  </li>
                <li>  <Button className="btn btn-default btn-circle" bsSize="large" bsStyle="primary"><Glyphicon glyph="heart"/></Button>  </li>
                </ul>
              </div>
            </Col>
            <Col lg={4} md={6} sm={6} xs={12} >
              <div className="aux-chart">
                  <ReactFC
                    {...piechart_config}/>
            </div>
            </Col>
            </Row>
          </Grid>
                  )
        }
}

export default Dash
