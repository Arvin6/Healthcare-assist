import React from 'react'
import Topcontent from './topcontent'
import Dash from './dash'
import Appointment from './appointment'
import Info from './info'
class Homecontent extends React.Component{
  constructor(){
    super();
    this.state={
    //  main_chartdata:[]
    filtertext: "",
    filtersource:""
    }
    this.filtercallback=this.filtercallback.bind(this);
  }

  componentWillMount()
  {
    //console.log("Content will mount");
  }

  filtercallback(c,k){
    //  console.log("In callback",c,k);
      this.setState({ filtertext: c,filtersource:k },function(){
        console.log("state of mainchart",c,k)
      });
  }

  componentWillReceiveProps(nextProps,nextState){
    console.log("Receives props");
  //  console.log(this.state.filtertext);
  }

  componentDidUpdate(){
    //console.log("Did update");
    //console.log(this.state.filtertext,"--")
  }

  render(){
    //console.log("is called");
    let mainchartsource=[];
    if(this.state.filtertext&&this.state.filtertext.length!==0)
    { //console.log("happening");
      mainchartsource=this.props.mainCdata.filter(
        (member) => (member.category===this.state.filtertext)
    );
  }else{
      mainchartsource=this.props.mainCdata//this.state.main_chartdata;
  }
    //console.log(mainchartsource);
    return (
      <div>
        <Topcontent user={this.props.user} filterSource={this.state.filtersource} mainCdata={mainchartsource} avatar={this.props.avatar} family={this.props.family}/>
        <Dash pieCdata={this.props.pieCdata} onslice={this.filtercallback} />
        <Appointment date={this.props.apptdate} />
        <Info medinfo={this.props.medinfo} />
      </div>
    );
  }
}

export default Homecontent
