import Auth0Lock from 'auth0-lock'
import { browserHistory } from 'react-router'
import logo from '../Mainpage/logo.svg'
import {isTokenExpired} from './jwtHelper'
import {EventEmitter} from 'events'

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super()
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
        autoclose:true,
      theme: {
        logo: logo,
        primaryColor: "#337ab7"
      },
      languageDictionary: {
        title: "PHA"
      },
      auth: {
        redirect:false,
        responseType: 'token'
      }
    })
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)

  }

  _doAuthentication(authResult) {
    var that = this;
    // Saves the user token
    this.setToken(authResult.idToken)
    // navigate to the home route
    browserHistory.replace('/home')
    this.lock.getUserInfo(authResult.accessToken, function(error, profile) {
      if (error) {
        console.log('Error loading the Profile - AuthService', error)
      } else {
        //  console.log("got ",profile.nickname);

          localStorage.setItem('profile', JSON.stringify(profile))
          that.emit('prof_upd',profile);
      }
    })
  }

  setProfile(profile){
  }

  getProfile() {
    // Retrieves the profile data from local storage
    const profile = localStorage.getItem('profile')
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  logout() {
    // Clear user token and profile data from local storage
      if(localStorage.length>10)
          {localStorage.clear();}
        else{
          localStorage.removeItem('id_token');
          localStorage.removeItem('profile');
        }
  }


  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    let token=this.getToken();
    return !!token && !isTokenExpired(token)
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

}
