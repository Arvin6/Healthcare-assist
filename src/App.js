import React from 'react'
import './App.css'
import Home from'./Mainpage/Home'

class App extends React.Component{
  componentWillMount(){
    console.debug("Components mounted");
  }

  render(){
    return (
      <div className="App">
          <Home/>
      </div>
    );
  }
}


export default App
