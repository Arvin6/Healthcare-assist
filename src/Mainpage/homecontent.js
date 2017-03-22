import React from 'react'
import Topcontent from './topcontent'
import Dash from './dash'
import placeholder from '../avatar_placeholder.png'
import Appointment from './appointment'
import '../App.css'
import Info from './info'
import AuthService from '../Utils/Authservice'

class Homecontent extends React.Component{

  static propTypes = {
    auth: React.PropTypes.instanceOf(AuthService),
    profile: React.PropTypes.object.isRequired
  }
  constructor(){
    super();
    this.state={
      user : "",
      isReady: false,
      avatar: placeholder,
      family: [],
      nextappt: "0",
      diagnosis: [],
      medication:[],
      advise:[],
      tests:[],
      mainchartdata:[],
      piechartdata:[],
      filtertext: "",
      filtersource:"",
    }
    this.filtercallback= this.filtercallback.bind(this);
    //listening for the profile update from auth0
  }

  componentWillMount()
  {
    //console.log("HC Localstorage-->",localStorage);

  }

  componentDidMount(){
    console.log("Did mount");
    var that = this;
    var userid=this.props.profile.user_id;
    var url = '/api/'+userid+'/trends';
    console.log(url);
    // This is where we get all the data.
      fetch(url,{accept: 'application/json',method:'get'})
            .then(response => response.json())
                .then( (data) => {
                      that.setState(
                        {
                          user : this.props.profile.nickname||data.username,
                          family: [],//data.fam_members,
                          nextappt: new Date(data.appointment),
                          diagnosis: data.diagnosis,
                          medication: data.medication,
                          advise: data.advise,
                          tests: data.tests,
                          mainchartdata: data.linedata ,
                          piechartdata: data.pieCdata,
                          isReady: true,
                          avatar: this.props.profile.picture||placeholder
                        }
                      )
                      })
                          .catch((error) => console.log("fetch error -> ",error));
  }


  componentDidUpdate(prevProps,prevState){
    // Any logic based on updation of components is to be implemented here. This is called right after setState is set.
  // console.log("Did Update");
  }



  filtercallback(c,k){
  //    console.log("In callback",c,k);
      this.setState({ filtertext: c,filtersource:k },function(){
  //      console.log("state of mainchart",c,k)
      });
  }

  render(){
  //  console.debug("render parent",this.state);
    if(!this.state.isReady)
    {
      console.log("fetching data to render");
      return null;
    }
    else{
          let mainchartsource=[];
          if(this.state.filtertext&&this.state.filtertext.length!==0)
          {
                mainchartsource=this.state.mainchartdata.filter( (member) => (member.category===this.state.filtertext));
          }else{
              mainchartsource=this.state.mainchartdata;}
  //  console.log(mainchartsource);
    return (
      <div className="App">
        <Topcontent user={this.state.user} filterSource={this.state.filtersource} mainCdata={mainchartsource} avatar={this.state.avatar} family={this.state.family}/>
        <Dash pieCdata={this.state.piechartdata} onslice={this.filtercallback} />

        <Appointment date={this.state.nextappt} />
        <Info diagnosis={this.state.diagnosis} medication={this.state.medication}
              advise={this.state.advise} tests={this.state.tests}/>
      </div>
    );
  }}
}

export default Homecontent
