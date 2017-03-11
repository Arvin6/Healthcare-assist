import React from 'react'
import './App.css'
import Header from './Maindash/header'
import Homecontent from './Maindash/home'
import placeholder from '../avatar_placeholder.png'
// JSON
import userdata from '../data.json'
// ^ The sample json
var piedata = {
  chart:{
    "enableMultiSlicing":"0",
    "showValues":"0"
  },
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
    // This is where we get all the data.

    // Above space is reserved for the fetch method

    // We clean up  the BP data to something useable by the main bar chart.
    let graphdata =  userdata.Bp.map( function(member){
        const high=120;
        const normal=80;
        const low=40;
         let calcval=(member.sys<90||member.dia<60)? low:(member.sys>120||member.dia>90)?high:normal;
         let obj ={
           "label":member.date,
           "value":calcval,
           "color":(calcval===high)?"#ff3823":(calcval===low)?"#a8c6fa":"#72bb53",
           "category": (calcval===high)?"High":(calcval===low)?"Low":"Normal",
           "tooltext": "BP: "+(member.sys)+"/"+(member.dia),
           "displayValue": (calcval===high)?"High":(calcval===low)?"Low":"Normal"
         };
         // Pie data calculation inline
        if(obj.category==="Low")
              {  piedata.data[0].value+=1;}
                    else if(obj.category==="High")
                            { piedata.data[2].value+=1;}
                                else { piedata.data[1].value+=1;}
         return obj;
       });

    // Cleaned up
    this.setState( {
      user: userdata.username,
      family: userdata.fam_members,
      nextappt: new Date(userdata.appointment),
      medinfo: userdata.med_info,
      mainchartdata: graphdata,
      piechartdata: piedata
    } );
  }

  render(){
    return (
      <div className="App">
              <Header />
              <Homecontent user={this.state.user}
                           family={this.state.family}
                           avatar={this.state.avatar}
                           apptdate={this.state.nextappt}
                           medinfo={this.state.medinfo}
                           mainCdata={this.state.mainchartdata}
                           pieCdata={this.state.piechartdata}
                           />
      </div>
    );
  }
}


export default App
