import React from 'react'
import { Grid, Row, Col, MenuItem, ButtonGroup, DropdownButton, Image } from 'react-bootstrap'
// This is for fusioncharts
import Fusioncharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
// init charts
charts(Fusioncharts)


class Topcontent extends React.Component{
componentDidUpdate(){
  console.log("did update topcontent", this.props.mainCdata);
}
shouldComponentUpdate(){
  console.log("Should Component Update - topcontent");
  return true;
}
componentWillMount()
{
  console.log("Will mount of topcontent",this.props.mainCdata);
}

render(){
    let chartData  = {
      chart:    {
                 "caption": "Health trend",
                 "bgColor": "#ffffff",
                 "canvasBgColor": "#ffffff",
                 "showBorder": "0",
                 "showCanvasBorder": "0",
                 "toolTipBgColor" : "#000000",
                 "toolTipColor": "#ffffff",
                 "toolTipPadding": "10",
                 "toolTipBgAlpha": "80",
                 "subcaption": "Blood Pressure",
                 "xAxisName": "Days",
                 "yAxisName": "Reading",
                 "lineThickness":"10",
                 "anchorRadius":"5",
                 "showyaxisvalues":"0",
                 "showtooltip":"1",
                 "showAlternateHGridColor": "0",
                 },
     "dataset":[{
       "seriesName": "Health data",
       "renderAs"  : "line",
        "data"     :  this.props.mainCdata
     }],
                }
    let mainchart_config = {
                  type: "line",
                  width: "100%",
                  dataFormat:"json",
                  dataSource: chartData,
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
