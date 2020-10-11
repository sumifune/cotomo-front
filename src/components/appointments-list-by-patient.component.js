import React, { Component } from "react";
import AppointmentDataService from "../services/appointment.service";
import moment from "moment";
import 'moment/locale/es';
import Card from 'react-bootstrap/Card';
import SearchModal from "./search.component";

moment.locale("es");

export default class AddAppointment extends Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.retrieveAppointments = this.retrieveAppointments.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.cancelAppointment = this.cancelAppointment.bind(this);
    this.fulfillAppointment = this.fulfillAppointment.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleState = this.handleState.bind(this);

    this.state = {
      id: this.props.match.params.id,
      // selectedDate: moment("01-01-2020", "DD-MM-YYYY"),
      filter: "pending",
      selectedDate: moment(),
      appointments: [],
      service: "Acupuntura",
      show: false
    };
  }

  componentDidMount() {
    // console.log(moment("01-01-2020", "DD-MM-YYYY").format('DD-MM-YYYY'));
    console.log('kkkkkkkkkkkkkkk');
    this.retrieveAppointments();
  }
  componentDidUpdate(prevProps, prevState) {
    // https://medium.com/better-programming/when-to-use-callback-function-of-setstate-in-react-37fff67e5a6c
    // if (this.state.currentMonth !== prevState.currentMonth) {
    //   this.props.getCalendarData(this.state.currentMonth);
    // }
  }
  retrieveAppointments() {
    const { id } = this.state;

    AppointmentDataService.findByPatientId(id)
      .then((response) => {
        // console.log(response);
        const { appointments } = response.data;

        this.setState({
          appointments: appointments,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleDateChange(date) {
    // console.log(date);
    this.setState({
      selectedDate: date,
    }, () => {
     this.retrieveAppointments()
    })
  }

  cancelAppointment(e) {

  	const id = e.target.getAttribute('aid');
  	const arrIndx = e.target.getAttribute('arrindx');

    const data = {
      estate: "cancelled",
    };

    AppointmentDataService.update(id, data)
      .then((response) => {

        console.log(response.data);
        this.setState(state => {

        	// console.log(response.data);
			    // 1. Make a shallow copy of the items
			    let appointments = [...state.appointments];
			    // 2. Make a shallow copy of the item you want to mutate
			    // let item = {...appointments[arrIndx]};
			    // 3. Replace the property you're intested in
			    // item.name = 'newName';
			    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
			    appointments[arrIndx] = response.data;

        	// sustituir el appo. por el que llega del backend en vez de concat
          // const appointments = state.appointments.concat(response.data);

          return {
            appointments,
          };

        });
      })
      .catch((e) => {
        console.log(e);
      });

  }

  fulfillAppointment(e) {

    const id = e.target.getAttribute('aid');
    const arrIndx = e.target.getAttribute('arrindx');

    const data = {
      estate: "fulfilled",
    };

    AppointmentDataService.update(id, data)
      .then((response) => {

        console.log(response.data);
        this.setState(state => {

          let appointments = [...state.appointments];
          appointments[arrIndx] = response.data;

          console.log(appointments);
          return {
            appointments,
          };

        });
      })
      .catch((e) => {
        console.log(e);
      });

  }
  setFilter(e) {
    // console.log(e.target.getAttribute('filter'));
    this.setState({
      filter: e.target.getAttribute('filter'),
    });
  }

  handleState(filter) {
    // console.log(filter);
    this.setState({
      show: false,
      filter: filter,
    });
  }
  handleCloseModal() {
    this.setState({
      show: false,
    });
  }

  handleShowModal() {
    this.setState({
      show: true,
    });
  }

  render() {

    const {
      appointments,
      filter,
      show,
    } = this.state;

    return (
      <>
      <div className="row">
        <div className="col-md-12">

          { appointments && appointments.filter(appointment => filter === 'all' ? true : appointment.estate === filter).map((appointment, index) => {

            return <Card style={{ marginBottom: '10px', marginTop: '10px' }} key={index}>
              <Card.Body>
                <Card.Title>{appointment.service}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {moment(appointment.date).format("DD-MM-YYYY")}
                  &nbsp;a las {appointment.hour}
                  </Card.Subtitle>
                <Card.Text>
                  {/*{this.props.match.params.id}*/}
                  {appointment.madeBy.name}&nbsp;{appointment.madeBy.surname}<br/>
                  <small>creada {moment(appointment.createdAt).fromNow()}</small><br/>
                  <small>{appointment.id}</small><br/>
                </Card.Text>
                { appointment.estate === "pending" ? <div>
                <Card.Link href="" aid={appointment.id} arrindx={index} onClick={this.cancelAppointment}>Cancelar</Card.Link>
                <Card.Link href="" aid={appointment.id} arrindx={index} onClick={this.fulfillAppointment}>Cumplir</Card.Link>
                </div>
                : appointment.estate === "fulfilled" ? <span className="badge badge-success">Cumplida</span> :
                <span className="badge badge-warning">Cancelada</span>
                }
              </Card.Body>
            </Card>

            }
          )}
          <p>&nbsp;</p>
        </div>
      </div>
      <div className="row">
        <div style={{ /*width: '18rem'*/ }} className="col-12">
          <div className="d-flex justify-content-center">
            <SearchModal show={show} handleClose={this.handleCloseModal} handleShow={this.handleShowModal} handleState={this.handleState}/>
          </div>
          <p>&nbsp;</p>
        </div>
      </div>
      </>
    );
  }
}
