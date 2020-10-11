import React, { Component } from "react";
import PatientDataService from "../services/patient.service";
import moment from "moment";
import 'moment/locale/es';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

moment.locale("es");

export default class ObservationsList extends Component {
  constructor(props) {
    super(props);
    this.retrieveObservations = this.retrieveObservations.bind(this);
    this.deleteObservation = this.deleteObservation.bind(this);
    this.sortObs = this.sortObs.bind(this);
    this.sortObsInv = this.sortObsInv.bind(this);

    this.state = {
      id: this.props.match.params.id,
      observations: [],
    };
  }

  componentDidMount() {
    this.retrieveObservations();
  }
  componentDidUpdate(prevProps, prevState) {
  }
  retrieveObservations() {
    const { id } = this.state;

    console.log("ID del param es: " + id);

    PatientDataService.findObservations(id)
      .then((response) => {
        console.log(response);

        let sortedArray = response.data.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        this.setState({
          observations: sortedArray,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

// array.sort(function(a,b){
//   // Turn your strings into dates, and then subtract them
//   // to get a value that is either negative, positive, or zero.
//   return new Date(b.date) - new Date(a.date);
// });
  deleteObservation(e) {

  	const observationID = e.target.getAttribute('aid');
  	// const arrIndx = e.target.getAttribute('arrindx');

    PatientDataService.deleteObservation(this.state.id, observationID)
      .then((response) => {

        const newObservations = this.state.observations;

        const newArray = newObservations.filter(o => o.id !== response.data.observation);

        console.log(newArray);

        this.setState({
          observations: newArray
        });

      })
      .catch((e) => {
        console.log(e);
      });

  }

  sortObs() {
    // console.log("--------------------");
    // console.log(this.state.observations);
    // console.log("--------------------");
    // console.log(this.state.observations.sort(function(a,b){
    //   // Turn your strings into dates, and then subtract them
    //   // to get a value that is either negative, positive, or zero.
    //   return new Date(b.createdAt) - new Date(a.createdAt);
    // }));

    let sortedArray = this.state.observations.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    this.setState({
      observations: sortedArray
    });


  }

  sortObsInv() {
    // console.log("--------------------");
    // console.log(this.state.observations);
    // console.log("--------------------");
    // console.log(this.state.observations.sort(function(a,b){
    //   // Turn your strings into dates, and then subtract them
    //   // to get a value that is either negative, positive, or zero.
    //   return new Date(b.createdAt) - new Date(a.createdAt);
    // }));


    let sortedArray = this.state.observations.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

    this.setState({
      observations: sortedArray
    });


  }

  render() {

    const {
      id,
      observations
    } = this.state;

    return (
      <>
      <div className="row" style={{ marginTop: '10px' }}>
        <div className="col-6" style={{ marginBottom: '10px'/*width: '18rem'*/ }}>
          <Button href={`/patients/${id}/obs/new`} variant="secondary">Nueva</Button>
        </div>
        <div className="col-6" style={{ marginBottom: '10px',display: 'flex',justifyContent: 'flex-end'/*width: '18rem'*/ }}>
          <div>
            {[DropdownButton].map((DropdownType, idx) => (
              <DropdownType
                as={ButtonGroup}
                key={idx}
                id={`dropdown-button-drop-${idx}`}
                variant="secondary"
                title="Ordernar"
              >
                <Dropdown.Item eventKey="1" onClick={this.sortObs}>Recientes</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="2" onClick={this.sortObsInv}>Antiguos</Dropdown.Item>
              </DropdownType>
            ))}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          { observations && observations.map((observation, index) => {

            return <Card style={{ marginBottom: '10px'/*width: '18rem'*/ }} key={index}>
              <Card.Body>
                <Card.Title>{moment(observation.createdAt).format("DD/MM/YYYY - hh:mm:ss")}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                <Card.Text>
                	{observation.note}<br/>
                </Card.Text>
                <Card.Link href="#" aid={observation.id} arrindx={index} onClick={this.deleteObservation}>Borrar</Card.Link>
              </Card.Body>
            </Card>

            }
          )}
          <p>&nbsp;</p>
        </div>
      </div>

      </>
    );
  }
}
