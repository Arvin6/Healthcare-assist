import React from 'react'
import {Grid, Row} from 'react-bootstrap'

const InfoItems = (props) => (
          <div className="infoitem">
          <ul>
          {
          (props.data&&props.data.length===1)?  <div className="singleitem">{props.data[0]}</div>
                                :props.data.map( (member) => <li key={member.toString()}>{member} </li> )
          }
          </ul>
          </div>
)


class Info extends React.Component{
render(){
  return(
            <Grid>
                <div className="infocomp">
                  <Row>
                    <InfoItems key="diagnosis" data={this.props.diagnosis} />
                  </Row>
                  <Row>
                    <InfoItems key="medication" data={this.props.medication}/>
                  </Row>
                  <Row>
                    <InfoItems key="advise" data={this.props.advise}/>
                  </Row>
                  <Row>
                    <InfoItems key="tests" data={this.props.tests}/>
                  </Row>
                </div>
            </Grid>
      )}
}

Info.defaultProps = {
  diagnosis: ["Diagnosis"],
  medication: ["Medication"],
  advise: ["Advise"],
  tests: ["Tests"]
}

Info.propTypes = {
  medinfo : React.PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.string))
}

  export default Info
