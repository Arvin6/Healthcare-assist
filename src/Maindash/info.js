import React from 'react'
import {Grid, Row, Col} from 'react-bootstrap'
const InfoItems = (props) => (
          <div className="infoitem">
          <ul>
          {
          (props.data&&props.data.length===1)?    <p>{props.data[0]}</p>
                                :props.data.map( (member) => <li key={member.toString()}>{member} </li> )
          }
          </ul>
          </div>
)


const Info = (props) => (
            <Grid>
                <div className="infocomp">
                  <Row>
                    <InfoItems data={props.medinfo.diagnosis} />
                  </Row>
                  <Row>
                    <InfoItems data={props.medinfo.medication}/>
                  </Row>
                  <Row>
                    <InfoItems data={props.medinfo.advise}/>
                  </Row>
                  <Row>
                    <InfoItems data={props.medinfo.tests}/>
                  </Row>
                </div>
            </Grid>
      )

  export default Info
