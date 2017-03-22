import React from 'react'
import {TableHeaderColumn, BootstrapTable} from 'react-bootstrap-table'


class Feed extends React.Component{
  constructor(){
    super();
    this.state ={
        tabledata: [],
        isReady: false
      }
  }
  componentWillMount(){
    var userid=this.props.auth.getProfile().user_id
    console.log(userid);
    //Fetching from API server
    fetch('/api/'+userid+'/feeddata')
      .then(
        (response) => response.json()
        )
        .then( ( key ) =>{
          console.log(key);
            this.setState(
              {
                 tabledata : key,
                 isReady:true
              })
            })
    //Fetching...
  }
  componentDidUpdate(prevProps,prevState){
  //  console.log("Did update");
  }
  render(){
    if(!this.state.isReady){
      console.log("not ready");
      return null;
    }
    else{
      var alldata=this.state.tabledata;
  //  console.log("--",this.state.tabledata);
    return (
      <div>
      {
    alldata.map( (member) =>  <Dyntable key={member.label} table={member.tabledata} keys={member.keys}/> )
      }
      </div>
    )}
  }

}
// This is the dynamic table generation component, let's export it just in case we need dynamic tables someother time.
export class Dyntable extends React.Component{

  render(){
    console.log(this.props.table,this.props.keys);
    const options={
      noDataText: "NA / Loading",
      defaultSortName: "date"
    };
      return (
        <div className="container">
        <BootstrapTable data={this.props.table} options={options} keyField="sno" insertRow deleteRow hover striped responsive pagination ignoreSinglePage bordered search>
          {
            this.props.keys.map( (key) =>  <TableHeaderColumn key={key} width={key==="sno"?"50px":"150px"} dataField={key}> {key.toUpperCase()} </TableHeaderColumn> )
          }
          </BootstrapTable>
        </div>
      );
  }
}


export default Feed;
