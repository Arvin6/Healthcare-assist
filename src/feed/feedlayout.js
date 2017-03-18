import React from 'react'
import {TableHeaderColumn, BootstrapTable} from 'react-bootstrap-table'


class Feed extends React.Component{
  constructor(){
    super();
    this.state ={
      table: [],
      keys:[]
    }
  }
  componentWillMount(){
    //Fetching from API server
    fetch('/api/feeddata')
      .then(
        (response) => response.json()
        )
        .then( ( key ) => {console.log("will mount");this.setState(
          {
          table: key.tabledata ,
          keys: key.keys }
            )} )
    //Fetching...
  }
  componentDidUpdate(prevProps,prevState){
    console.log("Did update");
  }
  render(){
    return (
      <div>
      <Dyntable table={this.state.table} keys={this.state.keys}/>

      </div>
    )
  }

}
// This is the dynamic table generation component, let's export it just in case we need dynamic tables someother time.
export class Dyntable extends React.Component{
  render(){
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
