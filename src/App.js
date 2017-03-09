import React from 'react'
import './App.css'
import logo from './logo.svg'
import placeholder from './avatar_placeholder.png'
// This is for the chart rendering
import Fusioncharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
//
import { Button, ButtonGroup, DropdownButton, Image, MenuItem, Grid, Row, Col, Glyphicon, Navbar, NavItem, Nav, NavDropdown } from 'react-bootstrap'
charts(Fusioncharts)

var userdata = {
  username: "user_name",

  fam_members: [{Name:"User1"},{Name:"User2"},{Name:"User3"}],

  appointment: ["2017","03","21"],

  med_info:{
      "diagnosis":["High blood pressure leading to cardiac issues (initial stage)"],
      "medication":["Envas6", "Beplex forte", "dolovin", "Nukast", "Pentaloc"],
      "advise":["Avoid oily food", "decrease carbohydrate intake"],
      "tests":["Renal function test", "Heart function test"]
    },

    Bp:[
           {date:"21-02-17",sys:100,dia:80},
           {date:"23-02-17",sys:110,dia:70},
           {date:"25-02-17",sys:120,dia:90},
           {date:"27-02-17",sys:140,dia:95},
           {date:"01-03-17",sys:80, dia:90},
           {date:"03-03-17",sys:100,dia:95}
    ],

  chart:  {  "caption": "Health trend",
             "subcaption": "Blood Pressure",
             "xAxisName": "Days",
             "yAxisName": "Reading",
             "usePlotGradientColor":"0",
             "theme": "ocean",
             "enablemultislicing":"1",
             "showyaxisvalues":"0",
             "showtooltip":"1"
             }
}

var piedata = {
  chart:{},
  data:[
    {
      label: "Low",
      value: 0,
      color: "#a8c6fa"
    },
    {
      label: "Normal",
      value: 0,
      color: "#72bb53"
    },
    {
      label: "High",
      value: 0,
      color: "#ff3823"
    }
  ]
}

var chartData  =    {
               chart:{},
               data: [],
            }

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      user : "",
      avatar: placeholder,
      family: [],
      nextappt: new Date(),
      medinfo: [],
      medrec:[],
      chart:{},
    };
  }
  componentWillMount(){
    // This is where we get the family members names.
    this.setState( {
      user: userdata.username,
      family: userdata.fam_members,
      nextappt: new Date(userdata.appointment),
      medinfo: userdata.med_info,
      medrec: userdata.Bp,
      chart: userdata.chart
    } );
    console.log("medinfo:",userdata.med_info.medication);
    console.log("In Will Mount");
  }

  render(){
    console.log("family",this.state.family.length);
    console.log("Next appointment",this.state.nextappt);
    return (
      <div className="App">
      <Header/>
      <Content user={this.state.user} family={this.state.family}
               avatar={this.state.avatar} apptdate={this.state.nextappt}
               medinfo={this.state.medinfo} medrec={this.state.medrec}
               chart={this.state.chart}
               />
      </div>
    );
  }
}

// Stateless function component for Navbar

const Header = (props) => (
  <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
        <div>
          <Image src={logo} responsive />
          <div className="brandname">Personal Healthcare Assist</div>
        </div>
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
  )

// Stateful component

class Content extends React.Component{
  componentWillMount(){
    const high=100;
    const normal=80;
    const low=60;
    let graphdata =  this.props.medrec.map(
      function(member){
         let obj={"label":0,"value":0,"color":"#72bb53","category":"Normal","sys":0,"dia":0,"displayValue":0,"tooltext":0};
         obj.label = member.date;
         obj.value = (member.sys<90||member.dia<60)? low:(member.sys>120||member.dia>90)?high:normal;
         obj.color = (obj.value===high)?"#ff3823":(obj.value===low)?"#a8c6fa":"#72bb53"
         obj.category = (obj.value===high)?"High":(obj.value===low)?"Low":"Normal"
         obj.displayValue=obj.category;
         obj.tooltext = "BP: "+(member.sys)+"/"+(member.dia);
         obj.dia = member.dia;
         obj.sys = member.sys;
         return obj;
       });
    chartData.chart=this.props.chart;
    chartData.data=graphdata;
    piedata.chart=this.props.chart;
    graphdata.forEach(
      function(member)
      {
        console.log(member.label,member.value);
        (member.category==="Low")?piedata.data[0].value+=1:(member.category==="High")?piedata.data[2].value+=1:piedata.data[1].value+=1;
      }
    );
  //  console.log("(Topcontent)",graphdata[0].label,graphdata[0].value);
  }

  /**/
  render(){
    console.log("diagnosis: ",this.props.medinfo);
    return (
      <div>
        <Topcontent user={this.props.user} chart={this.props.chart} medrec={this.props.medrec} avatar={this.props.avatar} family={this.props.family}/>
        <Dash pieData={piedata} />
        <Remainder date={this.props.apptdate} />
        <Info medinfo={this.props.medinfo} />
      </div>
    );
  }
}


function todatestring(dtstr){
  console.log("Date type: ",typeof(dtstr));
  return dtstr.toDateString();
}

function datesbetween(date2){
  let today = new Date();
  let diff = Math.abs(date2.getTime() - today.getTime());
  return (Math.ceil( diff / (1000*3600*24) ))-1;
}



class Topcontent extends React.Component{
  render(){
    return (
    <div>
      <Grid>
        <Row>
            <Col lg={2} md={2} sm={3} xs={5} xsOffset={3} mdOffset={0} smOffset={0} lgOffset={0}>
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
                               type="column2d"
                               className="graph"
                               width="100%"
                               impactedby="[dashpie]"
                               dataFormat="json"
                               renderAt="chart-container"
                               dataSource={chartData}

                               />
            </div>
                </Col>
        </Row>
        </Grid>
    </div>
    )
  }
}


class Dash extends React.Component{
  showcategory(cat, sender) {
    console.log("yes");
  }
  componentWillMount(){

  }
  render(){

    var piechart_obj = {
      id:"dashpie",
      type:"pie3d",
      dataFormat:"json",
      enablemultislicing:"1",
      width:"100%",
      dataSource:piedata,//{this.props.pieData},
      events:{
        "slicingStart": function(evts,sliceprop){
              if(sliceprop.slicingState===false){
                console.log("dd",evts.sender.id);
                this.showcategory(sliceprop.data.categoryLabel,evts.sender.id);
              }
              else{
                console.log("tr",evts.sender.id)
                this.showcategory("",evts.sender.id);
              }
        }

      }
    };
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
                  {...piechart_obj}/>
            </div>
            </Col>
            </Row>
          </Grid>
                  )
        }
}
const Remainder = (props) => (
  <Grid>
    <Row>
      <div className="remainder">
      <Col lg={11} md={11} sm={11} xs={11}>
          {
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

const InfoItems = (props) => (
          <div className="infoitem">
          <ul>
          {
          (props.data.length<2)?
              <p>{props.data[0]}</p>
              :props.data.map(
                (member) => <li key={member.toString()}>{member} </li>
            )
          }
          </ul>
          </div>
)


const Info = (props) => (
            <Grid>
                <div className="infocomp">
                  <Row>
                    <InfoItems data={props.medinfo.diagnosis} />
                  </Row>
                  <Row>
                    <InfoItems data={props.medinfo.medication}/>
                  </Row>
                  <Row>
                    <InfoItems data={props.medinfo.advise}/>
                  </Row>
                  <Row>
                    <InfoItems data={props.medinfo.tests}/>
                  </Row>
                </div>
            </Grid>
      )


export default App
