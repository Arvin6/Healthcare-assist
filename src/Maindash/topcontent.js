import React from 'react'
//import './App.css'
import { Grid, Row, Col, MenuItem, ButtonGroup, DropdownButton, Image } from 'react-bootstrap'
// This is for fusioncharts
import Fusioncharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
charts(Fusioncharts)


class Topcontent extends React.Component{
  render(){
    let chartData  = {
      chart:    {
                "caption": "Health trend",
                 "subcaption": "Blood Pressure",
                 "xAxisName": "Days",
                 "yAxisName": "Reading",
                 "usePlotGradientColor":"0",
                 "theme": "ocean",
                 "enablemultislicing":"0",
                 "showyaxisvalues":"0",
                 "showtooltip":"1"
                 },
      data:      this.props.mainCdata
                }
    let mainchart_config = {
                  type: "column3d",
                  width: "100%",
                  dataFormat:"json",
                  dataSource:chartData,
                  eventSource: this.props.filtersource,
                  impactedBy:['dashpie']
                }
    return (
    <div>
      <Grid>
        <Row>
            <Col lg={2} md={2} sm={3} xs={5} xsOffset={1} mdOffset={0} smOffset={0} lgOffset={0}>

              <div className="avatardiv">
                <Image src={this.props.avatar} alt={this.props.user} responsive />
                <ButtonGroup justified>
                  <DropdownButton id="familydropdown" bsStyle="primary" title={this.props.user}>
                    {
                      this.props.family.map( (member) =>
                              <MenuItem key={member.Name.toString()}> {member.Name} </MenuItem> )
                    }
                  </DropdownButton>
                </ButtonGroup>
              </div>

            </Col>
            <Col xsHidden md={7} sm={8} lg={8} smOffset={1} mdOffset={2} lgOffset={2}>

            <div className="main-trend">
                              <ReactFC id="main-trend"
                               {...mainchart_config}
                               />
            </div>

                </Col>
        </Row>
        </Grid>
    </div>
    )
  }
}

export default Topcontent
