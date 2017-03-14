import React from 'react'
import {TableHeaderColumn, BootstrapTable} from 'react-bootstrap-table'

var dat ={
 tabledata: [
    {"sno": 1 ,"date": "27-02-2017", "complaint": "Severe Headache","diagnosis": "High BP","meds":["Envas"]},
    {"sno": 2 ,"date": "07-03-2017", "complaint": "Cold and cough","diagnosis": "severe cold","meds":["Some Antibiotic","Coldact"]},
    {"sno": 3 ,"date": "29-03-2017", "complaint": "Diarrohea","diagnosis": "Food allergy","meds":["Pentaloc"]},
    {"sno": 4 ,"date": "02-04-2017", "complaint": "Fever","diagnosis": "Infection","meds":["Paracetamol","Dolo"]}
  ],
  keys: ["sno" , "date" , "complaint" , "diagnosis" , "meds"]
}

class Feed extends React.Component{
  constructor(){
    super();
    this.state ={
      table: [],
      keys:[]
    }
  }
  render(){
    return <Dyntable table={dat.tabledata} keys={dat.keys} editable={""}/>
  }

}

class Dyntable extends React.Component{
  render(){
    const options={
      noDataText: "NA",
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
