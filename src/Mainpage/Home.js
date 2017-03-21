import React from 'react'
import '../App.css'
import AuthService from '../Utils/Authservice'
import Homecontent from './homecontent'
// This is an encapsulating component for getting the user id from profile

export default class Home extends React.Component{
static propTypes = {
    auth: React.PropTypes.instanceOf(AuthService),
    profile: React.PropTypes.object
}

constructor(props,context)
{
  super(props,context)
  this.state= {
      profile: props.auth.getProfile()
  }
}

componentDidMount()
{
    var that=this;
       this.props.auth.on('prof_upd', (newProfile) => {
        console.log("state set for profile");
          that.setState({profile: newProfile});
          })
}

render(){
  if(this.state.profile.user_id===undefined)
  {
    return null;
  }
  else{
    //console.log("loaded",this.state.profile);
    return  <Homecontent profile={this.state.profile} />
}

}
}
