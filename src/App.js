import React from 'react'
import './App.css'
import Header from './Maindash/header'
import Homecontent from './Maindash/home'

import placeholder from '../avatar_placeholder.png'
// This is for the chart rendering

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
}


// ^ The sample json
var piedata = {
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
           //"color":(calcval===high)?"#ff3823":(calcval===low)?"#a8c6fa":"#72bb53",
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
