import React from 'react'
import './App.css'
import Homecontent from'./Mainpage/homecontent'

class App extends React.Component{
  componentWillMount(){
    console.debug("Components mounted");
  }

  render(){
    return (
      <div className="App">
          <Homecontent/>
      </div>
    );
  }
}


export default App
